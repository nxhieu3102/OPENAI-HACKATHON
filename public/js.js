const formList = document.getElementsByTagName('form')
// const sbmBtn = document.getElementById('sbmBtn')
const messageTag = document.getElementById('message')

for (let formElem of formList) {
	formElem.onsubmit = async (e) => {
		let form;
		for (i = 0; i < formList.length; i++) {
			if (formList[i].dataset.active === "true")
				form = formList[i];
		}
		console.dir(form);
		let top_p = 1.0, tokens = 1000, freq_pen = 0.0, pres_pen = 0.0
		let Text = ''
		for (let i = 0; i < form.length -1; i++)
			Text += form[i].name + ': ' + form[i].value + ' '
		console.log(Text)
		e.preventDefault()
		await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			body: `{"model": "text-davinci-003", "prompt": "${Text}", "temperature": 1,
			"max_tokens":${tokens},
			"top_p":${top_p},
			"frequency_penalty":${freq_pen},
			"presence_penalty":${pres_pen},
			"stop":"####"}`,
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${APIKEY}`
			},
		}).then(response => response.json())
			.then(data => {
				console.log(data)
			messageTag.innerText=data.choices[0].text.slice(1)
			})
		return false
	}
}

	
