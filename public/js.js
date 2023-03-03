function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const formList = document.getElementsByTagName('form')
// const sbmBtn = document.getElementById('sbmBtn')

const demandsElem = document.getElementById('demands2');
const constraintElem = document.getElementById('constraint2');
demandsElem.oninput = (e) => {
	if (demandsElem.value === "") {
		constraintElem.placeholder = "Constraints based on demands";
		return;
	}
	let demandsList = demandsElem.value.split(",");
	let ph = "";
	for (let i = 0; i < demandsList.length; i++) {
		demandsList[i] = demandsList[i].trim();
		if (demandsList[i] !== "") {
			ph += capitalizeFirstLetter(demandsList[i]) + ": ...\n";
		}
	}
	constraintElem.placeholder = ph;
}

for (let formElem of formList) {
	formElem.onsubmit = async (e) => {
		let form;
		let feature = 0;
		for (i = 0; i < formList.length; i++) {
			if (formList[i].dataset.active === "true") {
				form = formList[i];
				feature = i + 1;
			}
		}
		console.log(feature)
		const messageTag = form.getElementsByClassName('suggestionBox')[0];
		messageTag.innerText = "Loading suggestions"
		//console.dir(form);
		let top_p = 1.0, tokens = 1000, freq_pen = 0.0, pres_pen = 0.0
		let Text = ''
		for (let i = 0; i < form.length -1; i++) {
			if (form[i].name === "currency") {
				Text = Text.slice(0, -2);
				Text += ' ' + form[i].value + '\\n';
				continue;
			}
			Text += capitalizeFirstLetter(form[i].name) + ': ' + form[i].value.replaceAll(/\n/g, "\\n") + '\\n'
		}
		console.log(Text)
		e.preventDefault()
		let head=
		await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			body: `{"model": "davinci:ft-personal:plot-generator-2023-03-03-01-40-42", "prompt": "${Text}", "temperature": 1,
			"max_tokens":${tokens},
			"top_p":${top_p},
			"frequency_penalty":${freq_pen},
			"presence_penalty":${pres_pen},
			"stop":"####"}`,
			headers: {
				'Content-Type': 'application/json',
				"Authorization": "Bearer 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"
			},
		}).then(response => response.json())
			.then(data => {
				console.log(data)
			messageTag.innerText=data.choices[0].text
			})
		return false
	}
}

	
