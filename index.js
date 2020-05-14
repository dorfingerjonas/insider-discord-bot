const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;
const fs = require('fs');

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

    if (msg.author.id === '219585398618193920') {
        msg.react(getRandomEmoji()).then(() => {
            console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
        });
    }

    if (msg.author.id === '305083169831649280') {
        msg.react('689473770297098333').then(() => {
            console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
        });
    }

    if (msg.author.id === '382248696349327360') {
        msg.react('700594058749411358').then(() => {
            console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
        });
    }

    if (msg.author.id === '325002037932851212') {
        msg.react('🇪🇸').then(() => {
            msg.react('🇨').then(() => {
                msg.react('🇦').then(() => {
                    msg.react('🇷').then(() => {
                        msg.react('🇱').then(() => {
                            msg.react('🇴').then(() => {
                                msg.react('🇸').then(() => {
                                    console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    if (msg.content.includes('Searching') && msg.content.includes('🔎')) {
        msg.channel.send('guade scheibn 💿');
    }

    if (msg.content.startsWith('!playtop')) {
        msg.channel.send(`<@${msg.author.id}>, du hurensohn!`);
    }

    if (msg.author.id === '623557754853785626') {
        msg.react('🚙').then(() => {
            msg.react('🇦').then(() => {
                msg.react('🇺').then(() => {
                    msg.react('🇹').then(() => {
                        msg.react('🇴').then(() => {
                            console.log(`reacted to message from ${msg.author.username} at ${new Date().toLocaleDateString()}`);
                        });
                    });
                });
            });
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

client.on('messageReactionAdd', (msg, user) => {
    const emojis = require('./emojis').emojis;
    const {emoji} = msg;

    if (emoji.id === null || emoji.id === undefined) {
        if (!emojis.includes(emoji.name)) {
            emojis.push(emoji.name);
        }
    } else {
        if (!emojis.includes(emoji.id)) {
            emojis.push(emoji.id);
        }
    }

    fs.writeFile('emojis.json', `{\n "emojis": \n${JSON.stringify(emojis)}\n}`, err => {
        if (err) {
            console.error(err.message);
        }
    });
});

// client.on('voiceStateUpdate', (oldMember, newMember) => {
//     if (newMember.channel !== null && newMember.member !== null) {
//         if (newMember.member.user !== null) {
//             if (newMember.channel.id === '687627580295348235' && newMember.member.user.id === '221695439160737792') {
//                 newMember.guild.channels.cache
//                     .get('690485778337366060')
//                     .send('https://tenor.com/view/applausi-collettivi-standing-obation-clap-applause-gif-14346895');
//
//                 newMember.guild.channels.cache
//                     .get('690485778337366060')
//                     .send(`<@${221695439160737792}>`);
//             }
//         }
//     }
// });

function getRandomEmoji() {
    const emojis = require('./emojis').emojis;

    return emojis[Math.floor(Math.random() * emojis.length)];
}

client.login(token);
