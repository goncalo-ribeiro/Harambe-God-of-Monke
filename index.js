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

    /*
    client.api.applications(client.user.id).guilds(guildId).commands.get().then(data => {
        console.log(data)
    });*/
    //client.api.applications(client.user.id).guilds(guildId).commands('866051584492699659').delete()
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
                return('NA CAAAAAASA DO TOOOOOOOOOOOOOOOOOOOOOOOOOY!!!');
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
                const dispatcher = connection.play('audio/lixo.mp3', { volume: 1.0 });
        
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
        return('QUE LIXO!\nhttps://cdn.discordapp.com/attachments/634432612794105866/874603240522657812/lixo.mp4');
    } catch (error) {
        console.log('catch error');
        return('QUE LIXO!\nhttps://cdn.discordapp.com/attachments/634432612794105866/874603240522657812/lixo.mp4');
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


//processa slash commands
client.ws.on('INTERACTION_CREATE', async interaction => {
    console.log('on INTERACTION_CREATE');
    console.log(interaction)
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
