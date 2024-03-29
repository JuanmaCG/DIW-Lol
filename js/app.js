const vm = new Vue({
    el: '#app',
    data: {
        data: []
    },
    mounted: function() {
        axios({
                "method": "GET",
                "url": "https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-b8887ca3-3300-4fc0-897f-81494ed795cc",
                "Origin": "https://developer.riotgames.com",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Riot-Token": "RGAPI-b8887ca3-3300-4fc0-897f-81494ed795cc",
                "Accept-Language": "es-ES,es;q=0.9",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"

            }).then((res) => {
                this.data = res.data.entries;
                this.data.sort(function(b, a) {
                    if (a.leaguePoints > b.leaguePoints) {
                        return 1;
                    }
                    if (a.leaguePoints < b.leaguePoints) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                })
            })
            .catch((error) => {
                console.log(error)
            })

    }

});