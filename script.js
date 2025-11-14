const DEFAULT_LANG = 'pt';
const LANGS = ['pt-BR', 'en-US'];
let linguagemAtual = DEFAULT_LANG;
let traducoes = {};

async function fetchGame() {
    const steamid = document.getElementById('steamid').value;

    if (!steamid) return alert('Informe a SteamID64.');
    if (!/^\d{17}$/.test(steamid)) return alert('SteamID64 deve ter exatamente 17 digitos.');

    try {
        const response = await fetch(`http://localhost:3000/jogo-aleatorio?steamid=${steamid}`);
        const data = await response.json();

        if (!response.ok) return alert(data.erro || 'Erro na API.');

        buildPage(data);
    } catch (error) {
        console.error('Erro de fetch: ', error);
        alert('Falha na conexão com o servidor.');
    }
}

function buildPage(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'flex';
    resultadoDiv.innerHTML = '';

    //Adicionando headerText
    const headerText = document.createElement('h2');
    headerText.setAttribute('data-i18n', 'selected-game');
    resultadoDiv.appendChild(headerText);

    //Adicionando jogo selecionado
    const selected = document.createElement('div');
    selected.className = 'flex flex-col align-center gap-sm';

    const icone = document.createElement('img');
    icone.id = 'game-icon';
    icone.src = `https://steamcdn-a.akamaihd.net/steam/apps/${data.appid}/header.jpg`;
    icone.alt = data.name;
    
    const gameName = document.createElement('h3');
    gameName.textContent = data.name;
   
    selected.append(icone, gameName);
    resultadoDiv.appendChild(selected);

    //Adicionando o tempo de jogo
    let tempoJogado = Math.round((data.playtime / 60) * 10) / 10;
    const playtime = document.createElement('p');

    let minuteToggle = true;
    if (data.playtime >= 60) minuteToggle = false;

    playtime.textContent = `${minuteToggle ? data.playtime : tempoJogado} ${minuteToggle ? 'minutos' : (tempoJogado === 1 ? 'hora' : 'horas')}`;
    playtime.setAttribute('data-i18n-playtime', minuteToggle ? 'minutes' : (tempoJogado === 1 ? 'hour' : 'hours'));
    resultadoDiv.appendChild(playtime);

    //Adicionando botão de jogar
    const playButton = document.createElement('a');

    playButton.id = 'play-button';
    playButton.className = 'button';
    playButton.href = `steam://run/${data.appid}`;
    playButton.setAttribute('data-i18n', 'play-button');
    resultadoDiv.appendChild(playButton);

    aplicarTraducao();
}

function lightModeToggle() {
    document.getElementsByTagName('body')[0].classList.toggle('light-mode');
    let lightModeIcon = document.getElementById('light-mode-img');
    lightModeIcon.src = /sunny/.test(lightModeIcon.src) ? './imgs/moon.svg' : './imgs/sunny-outline.svg';
}

async function carregarLinguagem(linguagem) {
    try {
        const response = await fetch(`./i18n/${linguagem}.json`);
        if (!response.ok) throw new Error ('Arquivo de linguagem não encontrado.');
        traducoes[linguagem] = await response.json();
        if (linguagemAtual === linguagem) aplicarTraducao();
    } catch (error) {
        console.error('Erro ao carregar linguagem: ', error);
    }
}

function aplicarTraducao() {
    const tradAtual = traducoes[linguagemAtual];
   
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const chave = element.getAttribute('data-i18n');
        if (tradAtual[chave]) element.textContent = tradAtual[chave];
    });

    document.querySelectorAll('[data-i18n-value]').forEach(element => {
        const chave = element.getAttribute('data-i18n-value');
        if (tradAtual[chave]) element.value = tradAtual[chave];
    });

    document.querySelectorAll('[data-i18n-playtime]').forEach(element => {
        const chave = element.getAttribute('data-i18n-playtime');
        if (tradAtual[chave]) {
            let [tempo, metrica] = element.textContent.split(' ');
            metrica = tradAtual[chave];

            if (linguagemAtual === 'pt-BR') {
                tempo = tempo.replace('.', ',');
            } else {
                tempo = tempo.replace(',', '.');
            }
            element.textContent = `${tempo} ${metrica}`;
        }
    })
}

function setLinguagem(linguagem) {
    if (!LANGS.includes(linguagem)) linguagemAtual = DEFAULT_LANG;
    linguagemAtual = linguagem;
    localStorage.setItem('linguagem', linguagem);
    aplicarTraducao();
}

document.addEventListener('DOMContentLoaded', () => {
    const salvo = localStorage.getItem('linguagem');
    const linguagem = LANGS.includes(salvo) ? salvo : DEFAULT_LANG;

    //carregar os dois idiomas pra troca rapida
    Promise.all([carregarLinguagem('pt-BR'), carregarLinguagem('en-US')]).then(() => {
        setLinguagem(linguagem);
    });
});

document.getElementById('getForm').addEventListener('submit', e => {
    e.preventDefault();
    fetchGame();
});

document.getElementById('checkbox').addEventListener('change', function () {
    if (this.checked) {
        setLinguagem('en-US');
    } else {
        setLinguagem('pt-BR');
    } 
});