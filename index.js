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

    if (msg.content.toLowerCase().includes('kebap') && !msg.author.bot) {
        msg.channel.send(`Herr Lehrer, das zählt nicht, <@${msg.author.id}> hat Kebap gesagt.`);
    }
});

client.login(token);