const Discord = require('discord.js');
const client = new Discord.Client();
const { Slash } = require('discord-slash-commands');
const slash = new Slash(client);

var auth = require('./auth.json');
var guildId = auth.nvideaID;
//var guildId = auth.tarasManiasID;

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.token);

client.on('ready', function (evt) {
    client.user.setPresence({ activity: { name: 'over Monke Heaven', type:"WATCHING" }, status: 'online' })

    registerSlashCommands();
});

client.on('message', message => {
    //console.log(message.author)
	//console.log(`${message.author} in #${message.channel.name} sent: ${message.content}`);
    
    if(message.author.id != client.id)
    {
        if (message.content.substring(0, 1) == "'") {
            message.react('🐵');

            var args = message.content.substring(1).split(' ');
            var cmd = args[0];
            args = args.splice(1);
            console.log(cmd, args)
            
            switch(cmd) {
                case 'kekeres':
                    message.react('💥');
                    //console.log(message.member)
                    kekeres(message.member.id);
                break;
            }
        }
    }
});

async function kekeres(memberId){   
    console.log('kekeres start')
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
        console.log('catch error');
        return('NÃO ESTÁS NUM VOICE CHAT FILHO DA PUTA! TOMA LÁ\nhttps://cdn.discordapp.com/attachments/634432612794105866/865590171189772298/kekeres.mp4')
    }
}

async function dc(){   
    console.log('dc start')
    try {
        VoiceChannel.members.forEach(function(guildMember, guildMemberId) {
            var voiceStates =  client.guilds.cache.get(guildId).voiceStates.cache.get(guildMemberId);
            if (!(guildMemberId == '351728755061817347')){
                if(voiceStates){
                    console.log('muted?', voiceStates.serverMute)
                    if(voiceStates.serverMute){
                        await voiceStates.setMute(false);
                        return('Ameaça desneutralizada 😳')
                    }
                    await voiceStates.setMute(true);
                    kick();
                    return('Ameaça neutralizada 👌')
                }    
            }
            Channel.send("<@" + guildMemberId + ">");
         })

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

async function praisethelord(memberId){   
    console.log('praisethelord start')
    try {
        var voiceStates = client.guilds.cache.get(guildId).voiceStates.cache.get(memberId);
        if(voiceStates){
            var voiceChannel = voiceStates.channel
            if (voiceChannel) {
                const connection = await voiceChannel.join();
                // Create a dispatcher
                const dispatcher = connection.play('audio/angelvoice.mp3', { volume: 1.6 });
        
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

//processa slash commands
client.ws.on('INTERACTION_CREATE', async interaction => {
    console.log('on INTERACTION_CREATE');
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

    if (interaction.data.name === 'finishheroff'){
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

    if (interaction.data.name === 'praisethelord'){
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
        name: 'commando',
        description: 'witness the might of the ugandan commandos'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'dc',
        description: 'break in case of emergency'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'kekeres',
        description: 'kekeres crl?'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'passbanana',
        description: 'spread the love within your server'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'finishheroff',
        description: 'sponsored by Marcode'
    }})
    client.api.applications(client.user.id).guilds(guildId).commands.post({data: {
        name: 'praisethelord',
        description: 'for all thoose mans of culture'
    }})

    //package
    /*
    slash.command({
        guildOnly: true,
        guildID: guildId,
        data: {
            name: "ping",
            description: "Ping pong?",
            type: 4,
            content: `Pong! \`${client.ws.ping}ms\``
        }
    })
    slash.command({
        guildOnly: true,
        guildID: guildId,
        ephemeral: true,
        data: {
            name: "ephemeral",
            description: "Send an ephemeral message",
            type: 4,
            content: `Hey!`
        }
    })*/
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
