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
});

client.login(token);