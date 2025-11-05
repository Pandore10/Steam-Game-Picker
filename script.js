const mock = {
    "response": {
        "game_count": 2,
        "games": [
            {
                "appid": 10,
                "name": "Counter-Strike",
                "playtime_forever": 17,
                "img_icon_url": "6b0312cda02f5f777efa2f3318c307ff9acafbb5",
                "playtime_windows_forever": 0,
                "playtime_mac_forever": 0,
                "playtime_linux_forever": 0,
                "playtime_deck_forever": 0,
                "rtime_last_played": 1558055417,
                "content_descriptorids": [2, 5],
                "playtime_disconnected": 0
            }
        ]
    }
}

function getGames() {
    const steamid = document.getElementById('steamid').value;

    if ((steamid.length != 17) || (!isInt(steamid))) {
        alert("Invalid SteamID64.");
    }
}

function isInt(valor) {
    return !isNaN(valor) && parseInt(Number(valor)) == valor && !isNaN(parseInt(valor, 10));
}