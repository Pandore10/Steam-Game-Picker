let form = document.getElementById('getForm').addEventListener('submit', e => e.preventDefault());

async function getGames() {
    const steamid = document.getElementById('steamid').value;

    if ((steamid.length != 17) || (!isInt(steamid))) {
        alert("Invalid SteamID64.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/jogo-aleatorio?steamid=${steamid}`);
        const data = await response.json();

        return buildPage(data);
    } catch (error) {
        console.error('Erro de fetch: ', error);
    }
}

function buildPage(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'flex';

    //Adicionando headerText
    const headerText = document.createElement('h2');
    headerText.innerHTML = `Jogo selecionado`;
    headerText.setAttribute('id', "gameHeaderText");

    //Adicionando jogo selecionado
    const selected = document.createElement('div');
    selected.setAttribute('class', 'flex flex-col align-center gap-sm');

    const icone = document.createElement('img');
    icone.setAttribute('id', "gameIcon");
    icone.setAttribute('src', `https://steamcdn-a.akamaihd.net/steam/apps/${data.appid}/header.jpg`);
    
    const gameName = document.createElement('h3');
    gameName.setAttribute('id', "gameName");
    gameName.innerHTML = `${data.name}`;

    selected.appendChild(icone);
    selected.appendChild(gameName);

    
    //Arredondando minutos para horas
    let tempoJogado = data.playtime;
    let minuteToggle = true;
    if (tempoJogado >= 60) {
        tempoJogado = Math.round((tempoJogado / 60) * 100) / 100;
        minuteToggle = false;
    }
    
    //Adicionando o tempo de jogo
    const playtime = document.createElement('p');
    playtime.innerHTML = `Tempo de jogo: ${tempoJogado} ${minuteToggle ? "Minutos" : "Horas"}`;
    playtime.setAttribute('id', 'gamePlaytime');

    //Adicionando botão de jogar
    const playButton = document.createElement('a');
    playButton.innerHTML = "Jogar";
    playButton.setAttribute('id', "gamePlayButton");
    playButton.setAttribute('href', `steam://run/${data.appid}`);
    
    //Fazendo append dos elementos ao div
    resultadoDiv.appendChild(headerText);
    resultadoDiv.appendChild(selected);
    resultadoDiv.appendChild(playtime);
    resultadoDiv.appendChild(playButton);
}

function isInt(valor) {
    return !isNaN(valor) && parseInt(Number(valor)) == valor && !isNaN(parseInt(valor, 10));
}