require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

const PREFIX = '!';

let servers = {};

client.on('ready', () => {
    console.log('Yo imma dead!');

});

client.on('message', msg => {
    
    if(msg.content.toLowerCase() === 'simba' ||
       msg.mentions.has(client.user.id)){
          summon_the_pug(msg);
    }

    if(msg.content.toLowerCase() === '!ping'){
        tt(msg);
    }

    if(msg.content.toLowerCase() === '!toss'){
        toss(msg);
    }

    if(msg.content.toLowerCase() === '!die-roll'){
        rollDice(msg);
    }

    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0])
    {
        case 'play':
            function play(connection, msg){
       
                var server = servers[msg.guild.id];
        
                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));
                server.queue.shift();
        
                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                      play(connection, msg);  
                    }
                    else{
                        connection.disconnect();
                    }
                });
            }
            
            if(!args[1])
                    {
                        msg.reply('play what, dummkopf? 🙄');
                        return;
                    }
        
                    if (!isValidHttpUrl(args[1]))
                    {
                        msg.reply('invalid link :expressionless: ');
                        return;
                    }
        
                    if(!msg.member.voice.channel){
        
                        msg.channel.send('frickin\' join a voice channel first :neutral_face:');
                        return;
                    }
                    
                    if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                        queue: []
                    }
        
                    var server = servers[msg.guild.id];
                    server.queue.push(args[1]);
        
                    if(!msg.guild.voiceConnection) 
                        msg.member.voice.channel.join().then(function(connection){
                            play(connection, msg);
                        })

                        return;
    }


});



function summon_the_pug(msg){
    msg.react('😤');
    msg.channel.send("All hail the Pug Lord!\nKneel before me, will ya?\n＼(◎o◎)／");
    return;
}

function tt(msg){
    msg.react('🤠');
    msg.channel.send("pong 🏓 ");
    return;
}

function toss (msg){
    let val = Math.random();
    if(val <= 0.5){
        msg.channel.send('Heads! 🪙');
    }
    else{
        msg.channel.send('Tails! 🪙');
    }
    return;
}

function rollDice(msg){
    let face = Math.ceil(Math.random()*6);
    msg.react('🎲');
    msg.channel.send(face);
    return;
}

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

client.login(process.env.Simba_token); 


