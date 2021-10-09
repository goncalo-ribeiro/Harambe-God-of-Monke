const Discord = require('discord.js');
const client = new Discord.Client();
const { Slash } = require('discord-slash-commands');
const slash = new Slash(client);
const ytdl = require('ytdl-core');
var fs = require('fs');


var auth = require('./auth.json');
var guildId = auth.nvideaID;
//var guildId = auth.tarasManiasID;

var soundClips = require('./soundClips.json');

var credits = require('./credits.json');
const { isString } = require('util');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const { Stream } = require('stream');
console.log('credits.json loaded')
let bets = {};
let previousBets = null, previousCredits = null;
//checkIfGuildIsInCreditsList();
let odds = {
    seventyMinus: {yes: 8.0, no: 2.0},
    seventyPlus: {yes: 2.0, no: 4.0}
};

let AAAA = [
    'https://cdn.discordapp.com/attachments/634432612794105866/883400873819123712/AAAA.mp4',
    'https://cdn.discordapp.com/attachments/634432612794105866/883400947760525373/AAAA.mp4',
    'https://cdn.discordapp.com/attachments/634432612794105866/883400979142311956/AAAA.mp4'
];

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.token);

client.on('ready', function (evt) {
    client.user.setPresence({ activity: { name: 'over Monke Heaven', type:"WATCHING" }, status: 'online' })

    /*
    client.api.applications(client.user.id).guilds(guildId).commands.get().then(data => {
        console.log(data)
    });*/

 /*   client.api.applications(client.user.id).guilds(guildId).commands.resolve('877135653303898122').then(data => {
        console.log(data)
    });*/
    //client.api.applications(client.user.id).guilds(guildId).commands('881917234707066900').delete()
    registerSlashCommands();
});

client.on('message', message => {
    //console.log(message.author)
	//console.log(`${message.author} in #${message.channel.name} sent: ${message.content}`);
    
    if(message.author.id != client.id)
    {
        if(message.content.includes('9gag.com')){
            let rand = getRandomInt(0, 3)
            console.log('rand', rand)
            
            joying = client.emojis.cache.find(val => val.name === "joying");
            
            message.channel.send(`${joying} 9gag link detected ${joying}\n` + AAAA[rand]);
        }
        
        if (message.content.substring(0, 1) == "-") {
            message.react('🐵');

            var args = message.content.substring(1).split(' ');
            var cmd = args[0];
            args = args.splice(1);
            console.log(cmd, args)
            
            switch(cmd) {
                case 'kekeres':
                    message.react('💥');
                    console.log(message.member.id)
                    kekeres(message.member.id);
                break;
            }
        }
    }
});

async function kekeres(memberId){   
    console.log('kekeres start', memberId)
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/kekeres.mp3', { volume: 0.5 });
        
                dispatcher.on('start', () => {
                    console.log('kekeres.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('kekeres.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('KEKERES CRL? KEKERES PAH? FDC!');
            }
        }
        return('NÃO ESTÁS NUM VOICE CHAT FILHO DA PUTA! TOMA LÁ\nhttps://cdn.discordapp.com/attachments/634432612794105866/865590171189772298/kekeres.mp4')    
    } catch (error) {
        console.log(error);
        return('NÃO ESTÁS NUM VOICE CHAT FILHO DA PUTA! TOMA LÁ\nhttps://cdn.discordapp.com/attachments/634432612794105866/865590171189772298/kekeres.mp4')
    }
}

async function rift(interaction){   
    console.log('rift start')
    let teemo1 = client.emojis.cache.find(val => val.name === "Teemo1");
    let teemo2 = client.emojis.cache.find(val => val.name === "Teemo2");
    let teemo3 = client.emojis.cache.find(val => val.name === "Teemo3");
    let bernhand = client.emojis.cache.find(val => val.name === "bernhand");
            
    //await client.channels.cache.get(interaction.channel_id).send(`${teemo1}${teemo2}${teemo3}${bernhand}`)

    let toxicBrosID = '796025696353779752'
    let riftBrosID = '707697021573791876'
    let roleID = toxicBrosID;

    console.log(interaction.data.options)
    if (interaction.data.options != undefined){
        roleID = interaction.data.options[0].value ? riftBrosID : toxicBrosID;
        console.log(roleID)
    }
    
//    await client.channels.cache.get(interaction.channel_id).send(`${role} the Rift calls...`)
    let role = client.guilds.cache.get(guildId).roles.cache.get(roleID);

    client.channels.cache.get(interaction.channel_id).send(`${role} the Rift calls...`)
    return(`${teemo1}${teemo2}${teemo3}${bernhand}`)


}


async function dc(){   
    console.log('dc start')
    try {
        var voiceStates =  client.guilds.cache.get(guildId).voiceStates.cache.get('351728755061817347');
        //console.log(voiceStates)
        if(voiceStates){
            console.log('muted?', voiceStates.serverMute)
            if(voiceStates.serverMute){
                await voiceStates.setMute(false);
                return('Ameaça desneutralizada 😳')
            }
            await voiceStates.setMute(true);
            return('Ameaça neutralizada 👌')
        }
        return('O Harambe não detetou nenhum caso urgente')
    } catch (error) {
        //console.log(error)
        return('O Harambe não detetou nenhum caso urgente')
    }
}

async function bless(memberId){   
    console.log('bless start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/bless.mp3', { volume: 1.2 });
        
                dispatcher.on('start', () => {
                    console.log('bless.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('bless.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('Thou art drowned in holy light');
            }
        }
        return('Alas, thou must be in a voice chat to be blessed')    
    } catch (error) {
        console.log('catch error');
        return('Alas, thou must be in a voice chat to be blessed')    
    }
}

async function commando(memberId){   
    console.log('commando start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/commando.mp3', { volume: 0.6 });
        
                dispatcher.on('start', () => {
                    console.log('commando.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('commando.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('GWA GWA GWA');
            }
        }
        return('You must be in a voice chat to find Captain Alex');
    } catch (error) {
        console.log('catch error');
        return('You must be in a voice chat to find Captain Alex');
    }
}

async function caburro(memberId){   
    console.log('caburro start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/caburro.mp3', { volume: 1.6 });
        
                dispatcher.on('start', () => {
                    console.log('caburro.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('caburro.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('🐒💨');
            }
        }
        return('https://cdn.discordapp.com/attachments/434883051085103105/865593595548139550/caburro720p.mp4');
    } catch (error) {
        console.log('catch error');
        return('https://cdn.discordapp.com/attachments/434883051085103105/865593595548139550/caburro720p.mp4');
    }
}

async function coco(memberId){   
    console.log('coco start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/coco.mp3', { volume: 1.2 });
        
                dispatcher.on('start', () => {
                    console.log('coco.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('coco.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('calhou cocô 💩');
            }
        }
        return('https://cdn.discordapp.com/attachments/634432612794105866/870965316069511238/coco.mp4');
    } catch (error) {
        console.log('catch error');
        return('https://cdn.discordapp.com/attachments/634432612794105866/870965316069511238/coco.mp4');
    }
}

async function toy(memberId){   
    console.log('toy start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/toy.mp3', { volume: 1.0 });
        
                dispatcher.on('start', () => {
                    console.log('toy.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('toy.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('NA CAAAAAAAAAAAAAAAAAAAAASA DO TOOOOOOY!!!');
            }
        }
        return('https://cdn.discordapp.com/attachments/741306247222919218/871069156060069969/toy_jingle.mp4');
    } catch (error) {
        console.log('catch error');
        return('https://cdn.discordapp.com/attachments/741306247222919218/871069156060069969/toy_jingle.mp4');
    }
}

async function lixo(memberId){   
    console.log('lixo start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/lixo.mp3', { volume: 0.8 });
        
                dispatcher.on('start', () => {
                    console.log('lixo.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('lixo.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('QUE LIXO!');
            }
        }
        return('QUE LIXO!\nhttps://cdn.discordapp.com/attachments/634432612794105866/877133208527982612/lixo.mp4');
    } catch (error) {
        console.log('catch error');
        return('QUE LIXO!\nhttps://cdn.discordapp.com/attachments/634432612794105866/877133208527982612/lixo.mp4');
    }
}

async function wazzaa(memberId){   
    console.log('wazzaa start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/wazzaa.mp3', { volume: 0.8 });
        
                dispatcher.on('start', () => {
                    console.log('wazzaa.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('wazzaa.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('WAZZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!');
            }
        }
        return('https://tenor.com/view/whats-up-wazzup-scary-movie-scream-gif-16474707');
    } catch (error) {
        console.log('catch error');
        return('https://tenor.com/view/whats-up-wazzup-scary-movie-scream-gif-16474707');
    }
}

async function coffin(memberId){   
    console.log('coffin start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/coffin.mp3', { volume: 1.0 });
        
                dispatcher.on('start', () => {
                    console.log('coffin.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('coffin.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('🕺🏿🕺🏿⚰️🕺🏿🕺🏿');
            }
        }
        return('🕺🏿🕺🏿⚰️🕺🏿🕺🏿\nhttps://cdn.discordapp.com/attachments/634432612794105866/877133562921484308/coffin.mp4');
    } catch (error) {
        console.log('catch error');
        return('🕺🏿🕺🏿⚰️🕺🏿🕺🏿\nhttps://cdn.discordapp.com/attachments/634432612794105866/877133562921484308/coffin.mp4');
    }
}

async function herewego(memberId){   
    console.log('herewego start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/herewego.mp3', { volume: 1.0 });
        
                dispatcher.on('start', () => {
                    console.log('herewego.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('herewego.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('HERE WE GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!');
            }
        }
        return('HERE WE GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!\nhttps://cdn.discordapp.com/attachments/634432612794105866/877133255487418368/herewego.mp4');
    } catch (error) {
        console.log('catch error');
        return('HERE WE GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!\nhttps://cdn.discordapp.com/attachments/634432612794105866/877133255487418368/herewego.mp4');
    }
}

async function leona(memberId){   
    console.log('leona start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/leona.mp3', { volume: 0.5 });
        
                dispatcher.on('start', () => {
                    console.log('leona.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('leona.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('Leona Detected!');
            }
        }
        return('You gotta be in a voice channel1');
    } catch (error) {
        console.log('catch error');
        return('You gotta be in a voice channel');
    }
}

async function passbanana(){   
    console.log('passbanana start')
    try {
        return("https://cdn.discordapp.com/attachments/779756105797992449/846556581633851422/image0-3.gif")
    } catch (error) {
        //console.log(error)
        return('Couldn\'t pass banana')
    }
}

async function finishheroff(memberId){   
    console.log('finishheroff start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/finishheroff.mp3', { volume: 1.6 });
        
                dispatcher.on('start', () => {
                    console.log('finishheroff.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('finishheroff.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('OUUUHHH');
            }
        }
        return('THATS WHAT SHE SAID, NOW GET NO VOICE MA\'AM');
    } catch (error) {
        console.log('catch error');
        return('THATS WHAT SHE SAID, NOW GET NO VOICE MA\'AM');
    }
}

async function monke(memberId){   
    console.log('monke start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/monke.mp3', { volume: 0.8 });
        
                dispatcher.on('start', () => {
                    console.log('monke.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('monke.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('Harambe smiles at you, proud of your first step in the journey to embrace monke');
            }
        }
        return('Harambe smiles at you, proud of your first step in the journey to embrace monke\nhttps://cdn.discordapp.com/attachments/634432612794105866/865981971909574716/monke.mp4');
    } catch (error) {
        console.log('catch error');
        return('Harambe smiles at you, proud of your first step in the journey to embrace monke\nhttps://cdn.discordapp.com/attachments/634432612794105866/865981971909574716/monke.mp4');
    }
}

async function praisethelord(memberId){   
    console.log('praisethelord start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/angelvoice.mp3', { volume: 0.8 });

                dispatcher.on('start', () => {
                    console.log('angelvoice.mp3 is now playing!');
                });

                dispatcher.on('finish', () => {
                    console.log('angelvoice.mp3 has finished playing!');
                    connection.disconnect();
                });

                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('LET\'S ALL HEAR THE PREACH SPEAK');
            }
        }
        return('U ARE AN UNFAITHFUL ONE');
    } catch (error) {
        console.log('catch error');
        return('U ARE AN UNFAITHFUL ONE');
    }
}

async function emocionado(memberId){   
    console.log('emocionado start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/emocionado.mp3', { volume: 1.5 });
        
                dispatcher.on('start', () => {
                    console.log('emocionado.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('emocionado.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('Que emoção, pah caraças!');
            }
        }
        return('Que emoção, pah caraças!');
    } catch (error) {
        console.log('catch error');
        return('Que emoção, pah caraças!');
    }
}

async function hey(interaction){   

    let memberId = interaction.member.user.id;
    let memberName = interaction.member.user.username;
    let volume = 1.0;
    let link  = (Math.random() < 0.5) ? 'https://www.youtube.com/watch?v=u42au1R71yw' : 'https://www.youtube.com/watch?v=1JBMTcyp3hM' ;
    let regexResult = 0;

    let settingsChanged = false;

    console.log('hey start', memberId, memberName)

    if(soundClips[memberId] == null){
        soundClips[memberId] = {}
        soundClips[memberId].memberName = memberName
        soundClips[memberId].link = link
        soundClips[memberId].volume = volume
        await fs.writeFile('soundClips.json', JSON.stringify(soundClips, null, 4), (err) => {});
    }
    
    //console.log(interaction.data.options)
    if (interaction.data.options != undefined){
        for (let i = 0; i < interaction.data.options.length; i++) {
            const option = interaction.data.options[i];
            if(option.name === 'link'){
                console.log('link = ', link)
                let urlRegExp = /^(ftp|http|https):\/\/[^ "]+$/
                regexResult = option.value.match(urlRegExp);
                if(regexResult){
                    link = option.value;
                    soundClips[memberId].link = link
                    settingsChanged = true;
                }else{
                    return('please specify a valid url');
                }
            }if(option.name === 'volume'){
                console.log('volume = ', volume)
                if((option.value >= 10) && (option.value <= 200)){
                    volume = option.value / 100;
                    soundClips[memberId].volume = volume
                    settingsChanged = true;
                }else{
                    return('please specify a valid volume [10-200]');
                }
            }
        }
        console.log("write to file")
        await fs.writeFile('soundClips.json', JSON.stringify(soundClips, null, 4), (err) => {});
    }

    let youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    link = soundClips[memberId].link;
    volume = soundClips[memberId].volume;
    regexResult = link.match(youtubeRegex)
    console.log(regexResult)

    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                const streamOptions = { seek: 0, volume: volume };
                let stream;

                stream = (regexResult) ?  ytdl(link, { filter : 'audioonly' }) : link;
                console.log(stream)
                dispatcher = connection.play(stream, streamOptions);

                dispatcher.on('start', () => {
                    console.log('hey is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('hey has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return('now playing ' + memberName + '\'s custom clip at ' + volume*100 + '% volume');
            }
        }
        if (interaction.data.options != undefined){
            if(settingsChanged)
            return('settings changed successfully');    
        }
        return('you must be in a voice chat to play your sound clip');
    } catch (error) {
        console.log(error);
        return('chamem o rick crl, nao era suposto chegar aqui');
    }
}


//processa slash commands
client.ws.on('INTERACTION_CREATE', async interaction => {
    console.log('on INTERACTION_CREATE');
    //console.log(interaction)
    if (interaction.data.name === 'kekeres'){
        let interactionUserId = interaction.member.user.id;
        kekeres(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)
    
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'dc'){
        dc().then( (resposta) => {
            console.log('resposta', resposta)
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'bless'){
        let interactionUserId = interaction.member.user.id;
        bless(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'commando'){
        let interactionUserId = interaction.member.user.id;
        commando(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'passbanana'){
        passbanana().then( (resposta) => {
            console.log('resposta', resposta)
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'caburro'){
        let interactionUserId = interaction.member.user.id;
        caburro(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'coco'){
        let interactionUserId = interaction.member.user.id;
        coco(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'monke'){
        let interactionUserId = interaction.member.user.id;
        monke(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'marcode'){
        console.log(interaction.data.options[0])
        if(interaction.data.options[0].value === 'finishheroff'){
            let interactionUserId = interaction.member.user.id;
            finishheroff(interactionUserId).then( (resposta) => {
                console.log('resposta', resposta)
    
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                      content: resposta
                    }
                }})
            })
            return;
        }
        if (interaction.data.options[0].value === 'praisethelord'){
            let interactionUserId = interaction.member.user.id;
            praisethelord(interactionUserId).then( (resposta) => {
                console.log('resposta', resposta)
    
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                      content: resposta
                    }
                }})
            })
            return;
        }

    }

    if (interaction.data.name === 'toy'){
        let interactionUserId = interaction.member.user.id;
        toy(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'lixo'){
        let interactionUserId = interaction.member.user.id;
        lixo(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'coffin'){
        let interactionUserId = interaction.member.user.id;
        coffin(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'herewego'){
        let interactionUserId = interaction.member.user.id;
        herewego(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'wazzaa'){
        let interactionUserId = interaction.member.user.id;
        wazzaa(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'leona'){
        let interactionUserId = interaction.member.user.id;
        leona(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'rift'){
        console.log(interaction)
        //let interactionUserId = interaction.member.user.id;
        rift(interaction).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'emocionado'){
        console.log(interaction)
        let interactionUserId = interaction.member.user.id;
        emocionado(interactionUserId).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }

    if (interaction.data.name === 'hey'){
        //console.log(interaction)
        hey(interaction).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: resposta
                }
            }})
        })
        return;
    }


    if (interaction.data.name === 'bet'){
        //console.log(interaction.data.options[0])
        let interactionUserId = interaction.member.user.id;
        let interactionUserName = interaction.member.user.username;
        let interactionValue = null;
        let repplyFunction = null

        switch(interaction.data.options[0].name){
            case ('yes'):
                console.log('yes')
                interactionValue = interaction.data.options[0].options[0].value
                repplyFunction = betYes

                break;
            case ('no'):
                console.log('no')
                interactionValue = interaction.data.options[0].options[0].value
                repplyFunction = betNo
                break;
            case ('odds'):
                console.log('odds')
                repplyFunction = betOdds
                break;
            case ('cancel'):
                console.log('cancel')
                repplyFunction = betCancel
                break;
            case ('result'):
                console.log('result')
                interactionValue = interaction.data.options[0].options
                repplyFunction = betResult
                break;
            case ('status'):
                console.log('status')
                repplyFunction = betStatus
                break;
            case ('ranking'):
                console.log('ranking')
                repplyFunction = betRanking
                break;
            case ('end'):
                console.log('end')
                repplyFunction = betEnd
                break;       
        }  
        repplyFunction(interactionUserId, interactionUserName, interactionValue).then( (resposta) => {
            console.log('resposta', resposta)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: resposta
                }
            }})
        })
        return;

    }
})

//regista slash commands
function registerSlashCommands(){

    //manual
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'bless',
        description: 'surround thyself in holy light and transcend thy mortal state'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'caburro',
        description: 'para quando alguem está a ser burro'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'coco',
        description: 'para quando te apetece carapaus à espanhola'
    }})  
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'commando',
        description: 'witness the might of the ugandan commandos'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'dc',
        description: 'break in case of emergency'
    }})
    /*
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'finishheroff',
        description: 'sponsored by Marcode'
    }})
    */
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'kekeres',
        description: 'kekeres crl?'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'monke',
        description: 'reject humanity, embrace monke'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'passbanana',
        description: 'spread the love within your server'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'marcode',
        description: 'comandos sponsored pelo progamationer do server',
        options: [
            {
                "name": "comando",
                "description": "comando altes besta",
                "type": 3,
                "required": true,
                "choices": [
                    {
                        "name": "finishheroff",
                        "value": "finishheroff"
                    },
                    {
                        "name": "praisethelord",
                        "value": "praisethelord"
                    },
                ]
            }
        ]
    }})

    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'toy',
        description: 'um programa de culto...'
    }})

    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'lixo',
        description: 'TSF in a nutshell'
    }})

    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'coffin',
        description: '🕺🏿🕺🏿⚰️🕺🏿🕺🏿'
    }})

    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'herewego',
        description: '✌⭐'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'leona',
        description: 'Bust in case of Leona'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'wazzaa',
        description: 'wassup my ninja?'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'emocionado',
        description: 'ouvi as palavras sábias do nuno melo'
    }})

    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'hey',
        description: 'create your own customized sound clip',
        options: [
            {
                "name": "link",
                "description": "specify your custom sound clip",
                "type": 3,
            },
            {
                "name": "volume",
                "description": "specify your custom sound clip volume [10 - 200]% (default 100%)",
                "type": 4,
            },
        ],
    }})

    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'rift',
        description: 'The Rift yearns for its tribute',
        options: [
            {
                "name": "riftbros",
                "value": "riftbros",
                "description": "Summon all Rift Bros? (DEFAULT: FALSE)",
                "type": 5,
            },
        ],
    }})
    /*
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'bet',
        description: 'welcome to the Nvidea Highstakes Casino Extravaganza',
        options: [
            {
                "name": "yes",
                "value": "yes",
                "description": "bet that the desired unit will be pulled",
                "type": 1,
                "options": [
                    {
                        "name": "credits",
                        "description": "specify the ammount of credits to bet (type \"all in\" to bet all of your remaining credits)",
                        "type": 3, 
                        "required": true,
                    },
                ]
            },
            {
                "name": "no",
                "value": "no",
                "description": "bet that the desired unit will not be pulled",
                "type": 1,
                "options": [
                    {
                        "name": "credits",
                        "description": "specify the ammount of credits to bet (type \"all in\" to bet all of your remaining credits)",
                        "type": 3, 
                        "required": true,
                    },
                ]
            },
            {
                "name": "cancel",
                "value": "cancel",
                "description": "cancel your current bet",
                "type": 1
            },
            {
                "name": "odds",
                "value": "odds",
                "description": "check the bettings odds",
                "type": 1
            },
            {
                "name": "status",
                "value": "status",
                "description": "show the status of the current pull",
                "type": 1
            },
            {
                "name": "ranking",
                "value": "ranking",
                "description": "list the credits of all the users",
                "type": 1
            },
            {
                "name": "end",
                "value": "end",
                "description": "use this to crown the winner",
                "type": 1
            },
            {
                "name": "result",
                "description": "set whether or not the desired unit was pulled or not",
                "type": 1, 
                "options": [
                    {
                        "name": "pulled",
                        "description": "was the desired unit pulled?",
                        "type": 5, 
                        "required": true,
                    },
                    {
                        "name": "70pity",
                        "description": "was the pull made with 70+ pity (defaults to False)",
                        "type": 5,
                    },
                    {
                        "name": "pulltype",
                        "description": "10 pull or single pull (defaults to 10 pull)",
                        "type": 3,
                        "choices": [
                            {
                                "name": "10 pull",
                                "value": "10 pull"
                            },
                            {
                                "name": "single pull",
                                "value": "single pull"
                            },
                        ] 
                    },
                    {
                        "name": "undo",
                        "description": "use this to undo the latest \"/bet result\" command",
                        "type": 5,
                    },
                ],/*
                
                "choices": [
                    {
                        "name": "yes",
                        "value": "yes"
                    },
                    {
                        "name": "no",
                        "value": "no"
                    },
                ]
            }
        ]
    }})*/
}

function checkIfGuildIsInCreditsList(){
    if(credits.servers.some(obj => Object.keys(obj).includes(guildId))){
        console.log("credits.servers tem o serverid: " + guildId)
    }
    else{
        console.log("credits.servers não tem o serverid: " + guildId)
        let aux = {};
        aux[guildId] = {};
        
        credits.servers.push(aux)
        console.log(credits)
        fs.writeFile('credits.json', JSON.stringify(credits, null, 4), (err) => {});
        console.log('server adicionado à lista de creditos')
    }
    bets[guildId] = {};
    console.log('bets', bets)
}

async function kick(){
    shouldWeKickMe=Math.floor(Math.random() * (1 - 10 + 1)) + 1
    if (shouldWeKickMe < 0){
        var voiceStates =  client.guilds.cache.get(guildId).voiceStates.cache.get('351728755061817347');

        console.log("I got kicked")
    }else{
        praisethelord();
    }
}

const getApp =(guildId) => {
    const app = client.api.applications(client.user.id)
    if(this.guildId){
        app.guilds(guildId)
    }
    return app
}

async function betSignupUser(memberId, memberName, value){
    credits[memberId] = {memberName: memberName, credits: 5000}
    console.log(credits)
    await fs.writeFile('credits.json', JSON.stringify(credits, null, 4), (err) => {});
}

async function betYes (memberId, memberName, input){
    if (!credits.hasOwnProperty(memberId)){
        await betSignupUser(memberId, memberName)
    }
    let bet = -1;
    console.log(Number.isInteger(input), input > 0, input <= credits[memberId].credits)

    inputAux = parseInt(input);
    console.log(input)
    if(inputAux != NaN && inputAux > 0 && inputAux <= credits[memberId].credits){
        bet = inputAux;
    }else{
        let aux = input.trim().toLowerCase()
        console.log('aux', aux)
        //console.log(aux === "all in" , aux === "allin" , aux === "all-in")
        if(aux === "all in" || aux === "allin" || aux === "all-in" || aux === "all" || aux === "a"){
            bet = credits[memberId].credits
        }
    }

    console.log('bet', bet)
    
    if(bet > -1){
        bets[memberId] = {memberName: memberName, bet: bet, result: 'yes'}
        console.log(bets)
        if(bet == credits[memberId].credits){
            poggers = client.emojis.cache.find(val => val.name === "OOOO");
            oooo = 881978975168118784
            return(`${poggers}  Your all in bet of ` + bet + ` credit(s) has been registered! Good luck 🎲 (YES bet) ${poggers}`) 
        }
        return('Your bet of ' + bet + ' credit(s) has been registered! Good luck 🎲 (YES bet)') 
    }
    return('Please enter a valid amount (input: ' + input + ')')    
}

async function betNo (memberId, memberName, input){
    if (!credits.hasOwnProperty(memberId)){
        await betSignupUser(memberId, memberName)
    }
    let bet = -1;
    console.log(Number.isInteger(input), input > 0, input <= credits[memberId].credits)

    inputAux = parseInt(input);
    console.log(input)
    if(inputAux != NaN && inputAux > 0 && inputAux <= credits[memberId].credits){
        bet = inputAux;
    }else{
        let aux = input.trim().toLowerCase()
        console.log('aux', aux)
        //console.log(aux === "all in" , aux === "allin" , aux === "all-in")
        if(aux === "all in" || aux === "allin" || aux === "all-in" || aux === "all" || aux === "a"){
            bet = credits[memberId].credits
        }
    }

    console.log('bet', bet)
    
    if(bet > -1){
        bets[memberId] = {memberName: memberName, bet: bet, result: 'no'}
        console.log(bets)
        if(bet == credits[memberId].credits){
            poggers = client.emojis.cache.find(val => val.name === "OOOO");
            return(`${poggers}  Your all in bet of ` + bet + ` credit(s) has been registered! Good luck 🎲 (NO bet) ${poggers}`) 
        }
        return('Your bet of ' + bet + ' credit(s) has been registered! Good luck 🎲 (NO bet)') 
    }
    return('Please enter a valid amount (input: ' + input + ')')   
}

async function betOdds (memberId, memberName){
    return ("Odds in case of less than 70 pity:\n```yes bet: " + odds.seventyMinus.yes + "x\nno bet: " + odds.seventyMinus.no + "x```\nOdds in case of more than 70 pity:\n```yes bet: " + odds.seventyPlus.yes + "x\nno bet: " + odds.seventyPlus.no + "x```\nOdds are multiplied by 6 in single pulls")
}


async function betCancel (memberId, memberName){
    if (bets.hasOwnProperty(memberId)){
        delete bets[memberId]
        console.log(bets)
        return ("Your bet has been canceled")
    }
    return ("You had no bet to cancel")
}

async function betResult (memberId, memberName, options){
    //console.log(options)
    let seventyPity = false, singlepull = false, pulled, undo = false;
    options.forEach(option => {
        if(option.name === 'pulled'){
            pulled = option.value
        }
        if(option.name === '70pity'){
            seventyPity = option.value
        }
        if(option.name === 'pulltype'){
            singlepull = (option.value === 'single pull' ? true : false)
        }
        if(option.name === 'undo'){
            undo = option.value
        }
    });
    if(undo){
        if(previousBets === null || previousCredits === null){
            return("No previous bets recorded, impossible to undo previous ``/bet result`    ` command")
        }
        console.log('previousCredits', previousCredits)
        bets = previousBets;           //clone
        credits = previousCredits;    //clone
        await fs.writeFile('credits.json', JSON.stringify(credits, null, 4), (err) => {});
        previousBets = null;
        previousCredits = null;
        return("The last ``/bet result`` command was undone")
    }
    /*
    console.log('seventyPity', seventyPity)
    console.log('singlepull', singlepull)
    console.log('pulled', pulled)*/
    let yesOdd, noOdd

    if (seventyPity){
        yesOdd = odds.seventyPlus.yes
        noOdd = odds.seventyPlus.no
    }else{
        yesOdd = odds.seventyMinus.yes
        noOdd = odds.seventyMinus.no
    }
    if(singlepull){
        yesOdd = yesOdd * 6
        noOdd = noOdd * 6
    }

    //console.log("yesOdd", yesOdd)
    //console.log("noOdd", noOdd)

    stonks = client.emojis.cache.find(val => val.name === "Stonks");
    mindblown = client.emojis.cache.find(val => val.name === "mindblown");
    deadini = client.emojis.cache.find(val => val.name === "deadini");

    previousCredits={};
    for (let i in credits) {
        previousCredits[i] = {};
        for (let j in credits[i]) {
            previousCredits[i][j] = credits[i][j];
        }
    }
    previousBets={};
    for (let i in bets) {
        previousBets[i] = {};
        for (let j in bets[i]) {
            previousBets[i][j] = bets[i][j];
        }
    }
    console.log('previousCredits', previousCredits)

    outputStr = ""
    if(pulled){
        for (const bet in bets) {
            //console.log(bets[bet])
            if (bets[bet].result == 'yes'){ //winner, winner
                //console.log('won')
                if (((credits[bet].credits) - (bets[bet].bet)) === 0){ //all in
                    outputStr = outputStr.concat(`${mindblown} ` + bets[bet].memberName + ' won his All in bet, gaining ' + bets[bet].bet * yesOdd + ' credit(s) (total of credits: ' + ((credits[bet].credits) + (bets[bet].bet * yesOdd)) + `) ${mindblown}\n`)
                }else{
                    outputStr = outputStr.concat(`${stonks} ` + bets[bet].memberName + ' won his bet, gaining ' + bets[bet].bet * yesOdd + ' credit(s) (total of credits: ' + ((credits[bet].credits) + (bets[bet].bet * yesOdd)) + ')\n')
                }
                credits[bet].credits = ((credits[bet].credits) + (bets[bet].bet * yesOdd))
            }
            else{                           //loser
                //console.log('lost')
                if (((credits[bet].credits) - (bets[bet].bet)) === 0){ //all in
                    outputStr = outputStr.concat(`${deadini} ` + bets[bet].memberName + ' lost his All in bet, losing ' + bets[bet].bet + ' credit(s) (total of credits: ' + ((credits[bet].credits) - (bets[bet].bet) + 1) + `) ${deadini}\n`)
                    credits[bet].credits = 1
                }else{
                    outputStr = outputStr.concat('💩 ' + bets[bet].memberName + ' lost his bet, losing ' + bets[bet].bet + ' credit(s) (total of credits: ' + ((credits[bet].credits) - (bets[bet].bet)) + ')\n')
                    credits[bet].credits = ((credits[bet].credits) - (bets[bet].bet))
                }
            }
        }
    }else{
        for (const bet in bets) {
            //console.log(bets[bet])
            if (bets[bet].result == 'yes'){ //loser
                //console.log('lost')
                if (((credits[bet].credits) - (bets[bet].bet)) === 0){ //all in
                    outputStr = outputStr.concat(`${deadini} ` + bets[bet].memberName + ' lost his bet, losing ' + bets[bet].bet + ' credit(s) (total of credits: ' + ((credits[bet].credits) - (bets[bet].bet) + 1) + `) ${deadini}\n`)
                    credits[bet].credits = 1
                }else{
                    outputStr = outputStr.concat('💩 ' + bets[bet].memberName + ' lost his bet, losing ' + bets[bet].bet + ' credit(s) (total of credits: ' + ((credits[bet].credits) - (bets[bet].bet)) + ')\n')
                    credits[bet].credits = ((credits[bet].credits) - (bets[bet].bet))
                }
            }
            else{                           //winner, winner
                //console.log('won')
                if (((credits[bet].credits) - (bets[bet].bet)) === 0){ //all in
                    outputStr = outputStr.concat(`${mindblown} ` + bets[bet].memberName + ' won his All in bet, gaining ' + bets[bet].bet * noOdd + ' credit(s) (total of of credits: ' + ((credits[bet].credits) + (bets[bet].bet * noOdd)) + `) ${mindblown}\n`)
                }else{
                    outputStr = outputStr.concat(`${stonks} ` + bets[bet].memberName + ' won his bet, gaining ' + bets[bet].bet * noOdd + ' credit(s) (total of of credits: ' + ((credits[bet].credits) + (bets[bet].bet * noOdd)) + ')\n')
                }
                credits[bet].credits = ((credits[bet].credits) + (bets[bet].bet * noOdd))
            }
        }
    }
    bets = {};
    await fs.writeFile('credits.json', JSON.stringify(credits, null, 4), (err) => {});

    console.log('previousCredits', previousCredits)

    outputStr = outputStr.concat('\nHere are the server\'s new rankings:\n')
    outputStr = outputStr.concat(await betRanking(memberId, memberName));

    return(outputStr)
}

async function betStatus (memberId, memberName){
    let doubters = [], believers = []
    for (const bet in bets) {
        if (bets[bet].result == 'yes'){
            believers.push(bets[bet]);
        }
        else{
            doubters.push(bets[bet]);
        }
    }
    //console.log(believers)
    //console.log(doubters)
    let auxStr = 'Believers: ' + believers.length + '\n'
    believers.forEach(believer => {
        auxStr = auxStr.concat('    ' + believer.memberName + ': ' + believer.bet +' credit(s)\n')
    });
    auxStr = auxStr.concat('Doubters: ' + doubters.length + '\n')
    doubters.forEach(doubter => {
        auxStr = auxStr.concat('    ' + doubter.memberName + ': ' + doubter.bet +' credit(s)\n')
    });
    //console.log(auxStr);
    return auxStr
}

async function betRanking (memberId, memberName){
    let auxArray = [];
    for (let key in credits) {
        if (credits.hasOwnProperty(key))
        {
            auxArray.push(credits[key])
        }
    }
    auxArray.sort(compare)
    console.log(auxArray);
    let reply = "";
    let first = true
    
    kingEmote = client.emojis.cache.find(val => val.name === "borryKing");
    trashEmote = client.emojis.cache.find(val => val.name === "borryKMSwlaughter");

    for (let counter = 0; counter < auxArray.length; counter++) {
        let  creditsEntry = auxArray[counter];
        let userCredits = creditsEntry.credits;

        reply = reply.concat('#' + (counter + 1) + ' - ' + creditsEntry.memberName) // + ' with ' + userCredits + ' credit(s)')
        
        for (let i = counter + 1; i < auxArray.length; i++) {
            let nextCreditsEntry = auxArray[i];
            /*
            console.log('counter', counter)
            console.log('i', i)
            console.log('creditsEntry', creditsEntry)
            console.log('nextCreditsEntry', nextCreditsEntry)*/
            if(nextCreditsEntry.credits === userCredits){
                
                if(i+1 === auxArray.length){
                    reply = reply.concat(' and ' + nextCreditsEntry.memberName);
                }else{
                    if(nextCreditsEntry.credits != auxArray[i+1].credits){
                        reply = reply.concat(' and ' + nextCreditsEntry.memberName);
                    }
                    else{   
                        reply = reply.concat(', ' + nextCreditsEntry.memberName);
                    }
                }
                counter++;
            }else{
                i = auxArray.length + 1;
            }
        }
        reply = reply.concat(' with ' + userCredits + ' credit(s)')

        if(first == 1){
            reply = reply.concat(` ${kingEmote}`)
            first = false;
        }
        else{
            if(auxArray.length == counter + 1){
                reply = reply.concat(` ${trashEmote}`)
            }
        }
        reply = reply.concat('\n');
    }
    //console.log(reply)
    return(reply)
}

async function betEnd (memberId, memberName){
    if(memberId != 255093821598203914){
        return ("Sorry " + memberName + " you can't issue this command")
    }
    basedEmote = client.emojis.cache.find(val => val.name === "BasedKEK");
    let auxArray = [], finalArray = [];
    for (let key in credits) {
        if (credits.hasOwnProperty(key))
        {
            auxArray.push(credits[key])
            auxArray[auxArray.length-1].memberId = key
        }
    }
    auxArray.sort(compare)
    console.log('auxArray',auxArray)
    finalArray.push(auxArray[0])
    //console.log('finalArray',finalArray)
    for (let counter = 1; counter < auxArray.length; counter++) {
        if(auxArray[counter].credits == finalArray[0].credits){
            finalArray.push(auxArray[counter])
        }
    }
    console.log('finalArray', finalArray);

    let reply = "Congratulations"
    for (let i = 0; i < finalArray.length; i++) {
        let winner = finalArray[i];
        if(i===0){
            reply = reply.concat(" <@" + winner.memberId + ">")
        }
        else{
            if(i+1 === finalArray.length){
                reply = reply.concat(" and <@" + winner.memberId + ">")
            }
            else{
                reply = reply.concat(", <@" + winner.memberId + ">")
            }
        }
    }
    reply = (finalArray.length === 1) ? reply.concat(` you are the winner of tonight's Nvidea's Grand Casino Extravaganza ${basedEmote}`) : reply.concat(` you are the winners of tonight's Nvidea's Grand Casino Extravaganza ${basedEmote}`)
    console.log(reply)
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/rainha.mp3', { volume: 0.8 });
        
                dispatcher.on('start', () => {
                    console.log('rainha.mp3 is now playing!');
                });
        
                dispatcher.on('finish', () => {
                    console.log('rainha.mp3 has finished playing!');
                    connection.disconnect();
                });
        
                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
                return(reply)
            }
        }
        return(reply)
    } catch (error) {
        console.log('catch error');
        return(reply)
    }
    return ("Congratulations you are the winner")
}

function compare( a, b ) {
    if ( a.credits > b.credits ){
      return -1;
    }
    if ( a.credits < b.credits ){
      return 1;
    }
    return 0;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}