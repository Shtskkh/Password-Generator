const url = 'https://www.random.org/strings/';
function getSettings () {
    return {
        len: document.querySelector('.len').value,
        useDigits: document.querySelector('.digits').checked,
        useUpperCase: document.querySelector('.upperCase').checked,
        useLowerCase: document.querySelector('.lowerCase').checked,
    }
}

function useValidation (settings) {
    if (settings.len < 1){
        alert ('Число симоловом не может быть меньше 1.')
        return 0;
    }
    if (settings.len > 20){
        alert ('Число симоловом не может быть больше 20.')
        return 0;
    }
    if (!settings.useDigits && !settings.useLowerCase && !settings.useUpperCase){
        alert ('С выбранными настройками строка будет пустой, выберете хотя бы 1 настройку.')
        return 0;
    }
    return 1;

}

async function getPassword (settings) {
    if(settings.useDigits) {
        settings.useDigits = 'on'
    }
    if(settings.useUpperCase) {
        settings.useUpperCase = 'on'
    }
    if(settings.useLowerCase) {
        settings.useLowerCase = 'on'
    }
    if(!settings.useDigits) {
        settings.useDigits = 'off'
    }
    if(!settings.useUpperCase) {
        settings.useUpperCase = 'off'
    }
    if(!settings.useLowerCase) {
        settings.useLowerCase = 'off'
    }
    const urlGet = url+`?num=1&len=${settings.len}&digits=${settings.useDigits}&upperalpha=${settings.useUpperCase}&loweralpha=${settings.useLowerCase}&unique=on&format=plain&rnd=new`
    const response = await fetch(urlGet);
    document.querySelector('.password').textContent = await response.text();
}


const button = document.querySelector('.gen-pass');

button.onclick = () => {
    const settings = getSettings();
    const validation = useValidation(settings);
    if (validation) {
        getPassword(settings);
    }
}