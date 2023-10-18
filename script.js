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
        return 1;
    }
    if (settings.length > 20){
        document.querySelector('.length').value = 2048
        return 1;
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

const button = document.querySelector('.generate-password');
button.onclick = () => {
    const settings = getSettings();
    if (isValid(settings)) {
         getPassword(settings)
            .then(res => document.querySelector('.password').textContent = res)
    }
}