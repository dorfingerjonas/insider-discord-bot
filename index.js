const Discord = require('discord.js');
const schedule = require('node-schedule');
const client = new Discord.Client();
const token = require('./auth').token;
const fs = require('fs');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
    if (msg.author.id === '268837493187543040') {
        msg.react('👍').then(() => {
            logSuccessMessage('reacted to message from', msg.author.username);
        });
    }

    if (msg.author.id === '382251389675372556') {
        msg.react('🇷🇺').then(() => {
            logSuccessMessage('reacted to message from', msg.author.username);
        });
    }

    if (msg.author.id === '219585398618193920') {
        msg.react(getRandomEmoji()).then(() => {
            logSuccessMessage('reacted to message from', msg.author.username);
        });
    }

    if (msg.author.id === '305083169831649280') {
        msg.react('689473770297098333').then(() => {
            logSuccessMessage('reacted to message from', msg.author.username);
        });
    }

    if (msg.author.id === '382248696349327360') {
        msg.react('700594058749411358').then(() => {
            logSuccessMessage('reacted to message from', msg.author.username);
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
                                    logSuccessMessage('reacted to message from', msg.author.username);
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

    if (msg.author.id === '623557754853785626') {
        msg.react('🦵').then(() => {
            msg.react('💻').then(() => {
                msg.react('💥').then(() => {
                    logSuccessMessage('reacted to message from', msg.author.username);
                });
            });
        });
    }

    if (msg.author.id === '304657201853628431') {
        msg.react('694126988096569416').then(() => {
            msg.react('694126988205752401').then(() => {
                logSuccessMessage('reacted to message from', msg.author.username);
            });
        });
    }

    if (msg.content.toLowerCase().includes('kebap') && !msg.author.bot) {
        msg.channel.send(`Herr Lehrer, das zählt nicht, <@${msg.author.id}> hat Kebap gesagt.`);
    }

    if (msg.content.toLowerCase().includes('printf') && !msg.author.bot) {
        msg.channel.send(`Herr Lehrer, was ist printf?`);
    }

    if (msg.channel.id === '714487263660343386') {
        if (msg.content.toLowerCase() === '!speaker') {
            const speakerRole = msg.guild.roles.cache.find(role => role.name === 'Speaker');
            const hasPlayerSpeakerRole = msg.member.roles.cache.find(role => role.name === 'Speaker') !== undefined;

            if (speakerRole !== undefined) {
                hasPlayerSpeakerRole ? msg.member.roles.remove(speakerRole) : msg.member.roles.add(speakerRole);
                logSuccessMessage('toggle speaker role for', msg.author.username);
            }
        } else {
            msg.delete().then(() => {
                console.log('message deleted');
            });
        }
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
//     if (newMember.channelID === '687627580295348235' && newMember.id === '221695439160737792') {
//         newMember.guild.channels.resolve('687257699972284437').send(getRandomGif);
//     }
// });

const rule = new schedule.RecurrenceRule();
rule.hour = 18;

schedule.scheduleJob(rule, () => {
    const role = client.guilds.cache.get('687252363446190080').roles.cache.find(role => role.name === 'Speaker');
    const members = client.guilds.cache.get('687252363446190080').roles.cache.get('700632233995796541').members.array();

    for (const member of members) {
        member.roles.remove(role).then(() => {
            logSuccessMessage('removed speaker role from', member.user.username);
        });
    }
});

function getRandomEmoji() {
    const emojis = require('./emojis').emojis;

    return emojis[Math.floor(Math.random() * emojis.length)];
}

function getRandomGif() {
    const gifs = require('./gifs').gifs;

    return gifs[Math.floor(Math.random() * gifs.length)];
}

function logSuccessMessage(prefix, username) {
    console.log(`${prefix} ${username} at ${new Date().toLocaleDateString()}`);
}

client.login(token);
