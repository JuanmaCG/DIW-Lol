const riotUrl = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const ApiKey = "RGAPI-5920c955-9c44-453c-973d-9d3fe81964af";

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
        data: []
    },
    mounted() {
        this.getUser(this.usuario);
    },
    methods: {
        getUser(username) {
            let url = buildUrl(username);
            axios.get(url).then((response) => {
                this.data = response;
            }).catch(error => { console.log(error); });



        }
    }

});