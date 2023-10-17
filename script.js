function getSettings () {
    return {
        num: '1',
        len: document.querySelector('.len').value,
        digits: document.querySelector('.digits').checked,
        upperalpha: document.querySelector('.upperCase').checked,
        loweralpha: document.querySelector('.lowerCase').checked,
        unique: 'on',
        format: 'plain',
        rnd: 'new'
    }
}

function isValid (settings) {
    if (settings.len < 1){
        alert ('Число симоловом не может быть меньше 1.')
        return 0;
    }
    if (settings.len > 20){
        alert ('Число симоловом не может быть больше 20.')
        return 0;
    }
    if (!settings.digits && !settings.upperalpha && !settings.loweralpha){
        alert ('С выбранными настройками строка будет пустой, выберете хотя бы 1 настройку.')
        return 0;
    }
    return 1;
}

const url = 'https://www.random.org/strings/';
async function getPassword (settings) {
    const params = new URLSearchParams(settings).toString().replaceAll('true', 'on').replaceAll('false','off');
    let response = (await fetch(url + '?' + params));
    document.querySelector('.password').textContent = await response.text();
}

const button = document.querySelector('.gen-pass');
button.onclick = () => {
    const settings = getSettings();
    if (isValid(settings)) {
        getPassword(settings).then(); // Заглушка
    }
}