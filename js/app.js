const vm = new Vue({
    el: '#app',
    data: {
        data: []
    },
    mounted() {
        axios({
                "method": "GET",
                "url": "https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-8cc372a9-5eb4-410c-b76a-9251f234394a",
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