const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;

client.on('ready', () => {
    console.log('Bot started...');
});

client.on('message', (msg) => {
    if (msg.author.id === '268837493187543040') {
        msg.react('👍').then(() => {
            console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
        });
    }

    if (msg.author.id === '382251389675372556') {
        msg.react('🇷🇺').then(() => {
            console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
        });
    }

    if (msg.author.id === '305083169831649280') {
        msg.react('689473770297098333').then(() => {
            console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
        });
    }

    if (msg.author.id === '304657201853628431') {
        msg.react('694126988096569416').then(() => {
            msg.react('694126988205752401').then(() => {
                console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
            });
        });
    }

    if (msg.content.toLowerCase().includes('kebap') && !msg.author.bot) {
        msg.channel.send(`Herr Lehrer, das zählt nicht, <@${msg.author.id}> hat Kebap gesagt.`);
    }

    if (msg.content.toLowerCase().includes('printf') && !msg.author.bot) {
        msg.channel.send(`Herr Lehrer, was ist printf?`);
    }
});


client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.channel.id === '687627580295348235' && newMember.member.user.id === '221695439160737792') {
        newMember.guild.channels.cache
            .get('690485778337366060')
            .send('https://tenor.com/view/applausi-collettivi-standing-obation-clap-applause-gif-14346895');

        newMember.guild.channels.cache
            .get('690485778337366060')
            .send(`<@${221695439160737792}>`);
    }
});

client.login(token);