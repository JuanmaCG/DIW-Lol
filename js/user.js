const riotUrl = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const ApiKey = "RGAPI-4a957cc8-fcab-4621-93f6-7871642ba5ad";

function buildUrl(username) {
    return riotUrl + username + "?api_key=" + ApiKey
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

const vm_user = new Vue({
    el: '#user',
    data: {
        usuario: findGetParameter('summonerName'),
        userInfo: [],
        leagueUserInfo: [],
        userIconId: null,
        iconUrl: null,
        champInfo: [],
        topFiveChamp: []
    },
    mounted: function() {
        this.getUser(this.usuario);
        
    },
    methods: {
        getUser(username) {
            let url = buildUrl(username);
            axios.get(url).then((response) => {
                this.userInfo = response.data;
                this.userIconId = response.data.profileIconId;
                this.iconUrl = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/profileicon/" + this.userIconId + ".png";
                this.getWinsLosses(this.userInfo.id);
                this.getChamps();
                this.getTopFiveChamps(this.userInfo.id);
                
            }).catch(error => { console.log(error); });
        },
        getWinsLosses(usernameId) {
            axios.get('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + usernameId + '?api_key=' + ApiKey)
            .then((response) =>{
                this.leagueUserInfo = response.data.find( leagueUserInfo => leagueUserInfo.queueType === "RANKED_SOLO_5x5");
            }).catch(error => { console.log(error); });
        },
        getTopFiveChamps(usernameId) {
            axios.get('https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + usernameId + '?api_key=' + ApiKey)
            .then((response) => {
                this.champInfo = response.data
                
            })
        },
        getChamps() {
            axios.get('http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json')
            .then((response) => {
                
            
                // for(let i = 0; i < 5; i++) {
                //     if(this.champInfo[i].championId == )
                //     this.topFiveChamp[i] = 
                    
                // }

                
            })
        }
    }

});