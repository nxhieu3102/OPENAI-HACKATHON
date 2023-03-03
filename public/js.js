function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const formList = document.getElementsByTagName('form')
// const sbmBtn = document.getElementById('sbmBtn')

let constraintPlaceholderText = "Food: low calories\nShopping: clothes, shoes";
const demandsElem = document.getElementById('demands2');
const constraintElem = document.getElementById('constraint2');
constraintElem.placeholder = constraintPlaceholderText;
demandsElem.oninput = (e) => {
	if (demandsElem.value === "") {
		constraintElem.placeholder = constraintPlaceholderText;
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
		form[form.length - 1].disabled = true
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
		let model = "";
		let key = "";
		let mid, head, tail;
		if (feature == 1) {
			model = "davinci:ft-personal:plot-generator-2023-03-03-08-08-19";
			key = "Bearer ";
			mid = "b5ZLy79ZT3BlbkFJgBOC"
			head = "sk-0wr53Czjzzpt"
			tail = "DVA774ftK8tZI0RR"
		} else if (feature == 2) {
			model = "davinci:ft-personal:plot-generator-2023-03-03-01-40-42";
			key = "Bearer ";
			mid = "seMXWhhT3BlbkF"
			head = "sk-wLiPJt0jduDpl"
			tail = "JnRRlow9p95APu1Ga9vMK"
		}
		console.log(Text)
		e.preventDefault()
		await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			body: `{"model": ${model}, "prompt": "${Text}", "temperature": 1,
			"max_tokens":${tokens},
			"top_p":${top_p},
			"frequency_penalty":${freq_pen},
			"presence_penalty":${pres_pen},
			"stop":"####"}`,
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${head}${mid}${tail}`
			},
		}).then(response => response.json())
			.then(data => {
				console.log(data)
			messageTag.innerText=data.choices[0].text
			})
		return false
	}
}

	
