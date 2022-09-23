//#region Declarations

// Filemanager 
var fs = require('fs');

// RSS Feed
const RssFeedEmitter = require('rss-feed-emitter');
const feeder = new RssFeedEmitter(
    { skipFirstLoad: true }
);

// queued episodes json
let queuedEpisodes = require('./queuedEpisodes.json');

// array de URLs dos programas
const RSSfeedURLs = [
    'https://showrss.info/show/1586.rss',   //hotd
    'https://showrss.info/show/44.rss',     //rick and morty
    'https://showrss.info/show/1593.rss'    //rings of power
]

/*
// Ids da TVDB
const tvdbIds = {
    'House of the Dragon' : 371572,
    'Rick and Morty' : 275274,
    'The Lord of the Rings: The Rings of Power' : 367506
}

// Ids do servarr
const servarrIds = {
    'House of the Dragon' : 760,
    'Rick and Morty' : 17,
    'The Lord of the Rings: The Rings of Power' : 761
}

//env
require('dotenv').config();

//Sonarr
var SonarrAPI = require('sonarr-api'); 
var sonarr = new SonarrAPI({
    hostname: 'sonarr.xqsme.xyz',
    apiKey: process.env.sonarrToken,
    port: 443,
    // urlBase: '/sonarr'
    ssl: true
});
*/
//#endregion

class EpisodeChecker{
    constructor(discordClient, refreshTimerMinutes) {
        this.client = discordClient;
        this.refreshRate = refreshTimerMinutes * 60000; // to miliseconds
        this.setupRSSChecker(this.refreshRate)

        this.jsonUpdateCounter = 0;
        // o contexto muda no setTimeout daí a necessidade do arrow function
        // this.checkQueueIntervalId = setTimeout( () => {this.checkQueuedEpisodes(this)}, 3000);
        setTimeout( () => {
            this.checkQueueInterval = setInterval(() => {this.checkQueuedEpisodes()}, this.refreshRate);
            this.checkQueuedEpisodes();
        }, 20000);
        

        console.log('EpisodeChecker built');
    }

    

    setupRSSChecker(refreshRate){   
        console.log('setting up RSS Checker...', refreshRate)
        feeder.add({
            url: RSSfeedURLs,
            refresh: refreshRate,
            eventName: 'newEpisode'
        });
    
        feeder.on('newEpisode', (item) => {
            // console.log(item.title)
            let showName = null;
            try {
                showName = item['tv:show_name']['#'];
                
                const regExS00E00 = /s(\d+)e(\d+)/i;
                const regExArray = regExS00E00.exec(item['tv:raw_title']['#']);
                // console.log(regExArray)
                item.episode = regExArray[0]
                
                item.sentMessage = false;
            } catch (error) {
                console.log('error accessing TV show name');
                return 0;
            }
            this.queueEpisode(showName, item)
        })
        console.log('RSS Checker setup')
    }
    
    queueEpisode(showName, episodeObject){
        console.log(`new = ${episodeObject.episode}, old = ${queuedEpisodes[showName]?.episode}`);

        // let shouldUpdate = !queuedEpisodes[showName] || queuedEpisodes[showName].episode < episodeObject.episode
        // queuedEpisodes[showName] || queuedEpisodes[showName].episode < episodeObject.episode;
        // let shouldUpdate2 = queuedEpisodes[showName]?.episode < episodeObject.episode;
        // console.log('shouldUpdate?', shouldUpdate, shouldUpdate)
        // let updateJson = (queuedEpisodes[showName] == null ? true : (queuedEpisodes[showName].episode < episodeObject.episode ? true : false)); 

        let updateJson = false;
        if(queuedEpisodes[showName] == null) updateJson = true;
        else{
            console.log(queuedEpisodes[showName].episode, episodeObject.episode, queuedEpisodes[showName].episode < episodeObject.episode);
            if (queuedEpisodes[showName].episode < episodeObject.episode) updateJson = true;
        }
        console.log('updateJson?', updateJson);
        // console.log('shouldUpdate == updateJson?', updateJson == shouldUpdate);

        if(updateJson){
            queuedEpisodes[showName] = episodeObject;
            fs.writeFileSync('queuedEpisodes.json', JSON.stringify(queuedEpisodes, null, 4));
            console.log(`updating queued episodes, ${++this.jsonUpdateCounter} episodes updated`);
        }else{
            console.log('not updating episode')
        }
    }   

    checkQueuedEpisodes(){
        console.log('checking Queued Episodes...')
        let currentDate = new Date();

        if (
            // currentDate.getHours() >= 9 &&
            Object.keys(queuedEpisodes).length > 0
        ){
            console.log('sending Discord Message')
            this.sendDiscordMessage();
        }
        else{
            console.log('queue empty')
        }
        // console.log('clearing interval: ', this.checkQueueIntervalId);
        // clearInterval(this.checkQueueIntervalId);
    }
    
    sendDiscordMessage(){
        let processedResult = this.processEpisodeQueue();
        // console.log(processedResult.stringArray)

        //test channel
        // const channel = this.client.channels.cache.get('634432612794105866');
        //movies channel
        const channel = this.client.channels.cache.get('459097744083124225');
        
        // no ping xqsme
        // const xqsme = '@xqsme'
        // ping xqsme
        // const xqsme = '<@218742629918048256>'

    
        channel.send('*O Harambe desce dos céus e transmite uma mensagem de grande importância*')
        .then(() => {
            if(processedResult.hotD){
                channel.send('https://cdn.discordapp.com/attachments/634432612794105866/1022978632848789584/6uhfub.jpg')
            }
        }).then(() => {
            channel.send('Acabou de sair o próximo episódio ' + processedResult.stringArray[0] + processedResult.stringArray[1] + '\n*O Harambe despede-se e retorna aos céus*')
        }).then(() => {
            // queuedEpisodes = {};
            processedResult.newEpisodesArray.forEach(episode => {
                console.log(episode, episode[Object.keys(episode)[0]])
                queuedEpisodes[Object.keys(episode)[0]].sentMessage = true
                // episode.sentMessage = true;
            });
            fs.writeFileSync('queuedEpisodes.json', JSON.stringify(queuedEpisodes, null, 4));
            console.log('episode queue cleared');
        }).catch((err) => console.log('ca burro', err) );
    }

    processEpisodeQueue(){
        let showNameArray = []
        let newEpisodesArray = []
        
        for (const [key, value] of Object.entries(queuedEpisodes)) {
            // console.log(`${key}: ${value}`);
            console.log(value.sentMessage);
            if (!value.sentMessage) {
                let aux = {};
                aux[key] = value
                showNameArray.push(`${key}** (${value.episode})`)
                newEpisodesArray.push(aux)
            }
        }
        let hotD = false;
        let string1 = (showNameArray.length === 1 ? 'do seriado:\n' : 'dos seriados:\n'); //;

        let string2 = '';        
        for (let i = 0; i < showNameArray.length; i++) {
            // console.log(i)
            const showName = showNameArray[i];
            
            if (showName.includes("House of the Dragon")) hotD = true;

            string2 = ( (i == showNameArray.length - 1) ? //último elemento?
                string2.concat('-**' + showName + '.') :
                string2.concat('-**' + showName + ';\n')
            )
        }

        console.log(string1, string2)
        return {"stringArray" : [string1, string2], "hotD": hotD, "newEpisodesArray": newEpisodesArray};
    }
    
}

//#region Servarr setup
/*
function getServarrIdsbasedOnTvdbIdsArray(){
    sonarr.get("series").then(function (response) {
        
        for (const [showTitle, showtvdbId] of Object.entries(tvdbIds)) {
            // console.log('searching for: ', showTitle,  showtvdbId)
            const result = response.filter(serie => serie.tvdbId == showtvdbId);
            // console.log(result)
            servarrIds[showTitle] = result[0].id;
        }
        console.log(servarrIds)
    }).catch(function (err) {
        throw new Error("There was a error processing the request: " + err);
    });
}

function getServarrQueue (){
    sonarr.get(`queue`).then(function (result) {
            console.log(result);
        }, function (err) {
            throw new Error("There was a error processing the request: " + err);
    });
}

function removeEpisodeFromServarrQueue (commandId){
    sonarr.delete(`queue`, { "id": commandId}).then(function (result) {
            console.log(result);
        }, function (err) {
            throw new Error("There was a error processing the request: " + err);
    });
}

function getSeriesByServarrSeriesId (servarrSeriesId){
    sonarr.get(`series/${servarrSeriesId}`).then(function (result) {
            console.log(result);
        }, function (err) {
            throw new Error("There was a error processing the request: " + err);
    });
}

function getEpisodeByServarrEpisodeId (servarrEpisodeId){
    sonarr.get("episode", { "seriesId": 1 }).then(function (result) {
        console.log(result);
    }, function (err) {
        throw new Error("There was a error processing the request: " + err);
    });
}

function getEpisodesFilesByServarrSeriesId (servarrSeriesId){
    sonarr.get("episodefile", { "seriesId": servarrSeriesId }).then(function (result) {
        console.log(result);
    }, function (err) {
        throw new Error("There was a error processing the request: " + err);
    });
}
// getEpisodesFilesByServarrSeriesId(servarrIds['Rick and Morty']);

function getEpisodesFilesByServarrSeriesIdAndEpisodeId (servarrSeriesId, servarrEpisodeId){
    sonarr.get(`episodefile/${servarrEpisodeId}`, { "seriesId": servarrSeriesId }).then(function (result) {
        console.log(result);
    }, function (err) {
        throw new Error("There was a error processing the request: " + err);
    });
}

function getReleaseByServarrEpisodeId(servarrEpisodeId){
    sonarr.get("release", { "episodeId": servarrEpisodeId }).then(function (result) {
        console.log(result);
    }, function (err) {
        throw new Error("There was a error processing the request: " + err);
    });
}
// 61833 = Id do episodio mais recente do rick and morty
// getReleaseByServarrEpisodeId(61833) 
//  TO DO: vem vazio

function getServarrWanted(){
    sonarr.get("wanted/missing", { "page": 1, "pageSize": 20, "sortkey": "series.title", "sortDir": "desc" }).then(function (result) {
        console.log(result);
    }, function (err) {
        throw new Error("There was a error processing the request: " + err);
    });
}

function getServarrWantedByServarrSeriesId(servarrSeriesId){
    sonarr.get("wanted/missing", { "page": 1, "pageSize": 20, "sortkey": "airDateUtc", "sortDir": "desc" }).then(function (result) {
        // const result = response.filter(serie => serie.tvdbId == showtvdbId);
            // console.log(result)
        // servarrIds[showTitle] = result[0].id;
        console.log(result);
    }, function (err) {
        throw new Error("There was a error processing the request: " + err);
    });
}

function downloadEpisode(guid, indexerId){
    sonarr.post("release", { "guid" : guid , "indexerId" : indexerId}).then(function (result) {
        console.log(result);
    }, function (err) {
        throw new Error("There was a error processing the request: " + err);
    });

}



// getServarrWanted();
// getServarrWantedByServarrSeriesId()
// getEpisodesFilesByServarrSeriesIdAndEpisodeId(754, 51564)
// getServarrQueue()
// downloadEpisode('https://www.torrentdownload.info/307B7A6FB5DB421F690632D3A2648959250435F2/When-Will-Ayumu-Make-His-Move-S01E07-1080p-WEB-H264-SUGOI', 18)
// getServarrQueue()
// removeEpisodeFromServarrQueue(979747580);
// setTimeout(getServarrQueue, 50000)


// getReleaseByServarrEpisodeId(51564)
*/
//#endregion Servarr setup

module.exports = EpisodeChecker;