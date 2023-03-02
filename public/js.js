
const form = document.getElementsByTagName('form')[0]
// const sbmBtn = document.getElementById('sbmBtn')
const messageTag = document.getElementById('message')
form.onsubmit = async (e) => {
    console.dir(form)
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
            "Authorization": "Bearer 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"
        },
    }).then(response => response.json())
        .then(data => {
            console.log(data)
           messageTag.innerText=data.choices[0].text.slice(2)
        })
    return false
}
