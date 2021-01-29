const Discord = require('discord.js');
const schedule = require('node-schedule');
const client = new Discord.Client();
const token = require('./auth').token;
const MemberRepository = require('./MemberRepository.js');
const repo = new MemberRepository();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async msg => {
    if (msg.channel.id === '714487263660343386') {
        if (msg.content.toLowerCase() === '!speaker') {
            const speakerRole = msg.guild.roles.cache.find(role => role.name === 'Speaker');
            const hasPlayerSpeakerRole = msg.member.roles.cache.find(role => role.name === 'Speaker') !== undefined;

            if (speakerRole) {
                hasPlayerSpeakerRole ? msg.member.roles.remove(speakerRole) : msg.member.roles.add(speakerRole);
                logSuccessMessage('toggle speaker role for', msg.author.username);
            }
        } else {
            msg.delete();
        }
    }

    if (msg.channel.id === '804732156042543155') {
        if (!msg.author.bot) {
            if (msg.content.startsWith('!insider change')) {
                const delay = parseInt(msg.content.replace('!insider change', '')) || 5;
                const voiceChannel = client.channels.cache.array()[0];
                const members = voiceChannel.guild.members.cache.array();
                const teacher = members.find(m => m.nickname.includes('Prof. '));
                const newName = teacher ? teacher.nickname : 'Test';

                await fillDatabase(members);
                changeAllUsernames(members, newName);

                setTimeout(async () => {
                    await resetUsernames(members);
                }, delay * 1000);
            } else {
                msg.channel.send('Unknown command!');
            }
        }

        setTimeout(() => {
            msg.delete();
        }, 5 * 1000);
    }
});

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

function logSuccessMessage(prefix, username) {
    console.log(`${prefix} ${username} at ${new Date().toLocaleDateString()}`);
}

async function fillDatabase(members) {
    await repo.deleteAll();

    for (const member of members) {
        await repo.add({
            username: member.nickname,
            id: member.id
        });
    }
}

function changeAllUsernames(members, newUsername) {
    for (const member of members) {
        member.setNickname(newUsername);
    }
}

async function resetUsernames(members) {
    for (const member of members) {
        const old = await repo.findById(member.id);

        if (old) {
            member.setNickname(old.username);
        }
    }
}

client.login(token);
