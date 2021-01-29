const fs = require('fs');
const { promisify } = require('util');

class MemberRepository {
    async add(member) {
        const currentFile = await this.getAll();

        currentFile.push(member);

        await promisify(fs.writeFile)('./member.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }
    async update(member) {
        const memberList = await this.getAll();

        memberList[memberList.findIndex(r => r.id === member.id)] = member;

        fs.writeFile('./member.json', JSON.stringify(memberList), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async findById(id) {
        const memberList = await this.getAll();

        return memberList.find(m => m.id === id);
    }

    async delete(member) {
        const currentFile = await this.getAll();

        fs.writeFile('./member.json', JSON.stringify(currentFile.filter(r => r.id !== member.id)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile('./member.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        const content = await promisify(fs.readFile)('./member.json', 'utf8');
        return !content ? [] : JSON.parse(content);
    }
}

module.exports = MemberRepository;