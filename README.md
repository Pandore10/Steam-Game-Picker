# Steam-Game-Picker

Uma **página web** que escolhe **aleatoriamente** um jogo da sua biblioteca Steam.

- **Idiomas**: Português (Brasil) e Inglês
- **Tema**: Dark / Light mode com toggle
- **Tecnologias**: HTML5 + CSS3 + Vanilla JS
- **Backend** [Steam-Game-Picker-API](https://github.com/Pandore10/Steam-Game-Picker-API)

---

## Como funciona

1. Insira sua **SteamID64** (17 digitos).
2. Clique em **Buscar**
3. Receba:
    - Capa do jogo
    - Nome
    - Tempo jogado
    - Botão **Jogar** ('steam://run/\<appid\>')

---

## Como rodar localmente

### 1. Backend (API)

```bash
git clone https://github.com/Pandore10/Steam-Game-Picker-API
cd Steam-Game-Picker-API
npm install
cp .env.example .env # coloque sua Steam API Key
node index.js #Porta padrão 3000
```

### 2. Frontend

```bash
git clone https://github.com/Pandore10/Steam-Game-Picker
cd Steam-Game-Picker
# Abra o index.html no navegador (ou use Live Server)
```

## Funcionalidades

|Recurso        |Descrição                                      |
|---------------|-----------------------------------------------|
|i18n           |Troca entre PT-BR e EN-US com JSONs e data-i18n|
|Dark/Light Mode|Toggle com ícone de sol/lua                    |
|Responsivo     |Layout ajusta em mobile, tablet e desktop      |
|Persistencia   |Idioma salvo em localStorage                   |

### Deploy

- **Frontend**: [Netlify](steam-game-picker.netlify.app)
- **Backend**: [Render](https://steam-game-picker-api.onrender.com)