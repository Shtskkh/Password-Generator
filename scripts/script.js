function getSettings () {
    return {
        length: document.querySelector('.length').value,
        int: Number(document.querySelector('.int').checked),
        upper: Number(document.querySelector('.upper').checked),
        lower: Number(document.querySelector('.lower').checked),
        special: Number(document.querySelector('.special').checked),
    }
}

function isValid (settings) {
    if (settings.length < 6){
        document.querySelector('.length').value = 6
        settings.length = 6
    }
    if (settings.length > 2048){
        document.querySelector('.length').value = 2048
        settings.length = 2048
    }
    return 1;
}

const url = 'https://www.psswrd.net/api/v1/password/';
async function getPassword (settings) {
    const params = new URLSearchParams(settings).toString();
    return await fetch(url + '?' + params)
        .then(res => res.json())
        .then(data => data.password);
}

const generateButton = document.querySelector('.generate-password');
generateButton.onclick = () => {
    const settings = getSettings();
    if (isValid(settings)) {
         getPassword(settings)
            .then(res => document.querySelector('.password').textContent = res)
             .then(() => document.querySelector('.copy-alert').hidden = true);
    }
}

const copyPassword = document.querySelector('.copy-password');
copyPassword.onclick = () => {
    const password = document.querySelector('.password').textContent;
    if(password !== ''){
        navigator.clipboard.writeText(password)
            .then(() =>document.querySelector('.copy-alert').hidden = false);
    }
}