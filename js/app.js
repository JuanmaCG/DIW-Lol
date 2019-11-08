const vm = new Vue({
    el: '#app',
    data: {
        data: []
    },
    mounted() {
        axios({
                "method": "GET",
                "url": "https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-5920c955-9c44-453c-973d-9d3fe81964af",

            })
            .then((res) => {
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