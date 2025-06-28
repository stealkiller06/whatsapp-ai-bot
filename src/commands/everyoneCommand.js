const { COMMANDS } = require('../config/constants');

const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

class EveryoneCommand {
    async execute(msg, client) {
        try {
            const chat = await msg.getChat();
            if (!chat.isGroup) {
                await msg.reply('El comando @everyone solo funciona en grupos.');
                return;
            }

            // Get all participants
            const chatWithParticipants = await client.getChatById(chat.id._serialized);
            const mentions = (chatWithParticipants.participants || []).map(p => `${p.id.user}@c.us`);

            // Split mentions into chunks of 150
            const mentionChunks = chunkArray(mentions, 150);

            // Get the custom message
            const customMessage = msg.body.slice('@everyone'.length).trim() || '👋 Atención a todos!';

            for (const chunk of mentionChunks) {
                await chat.sendMessage(`${customMessage}`, {
                    mentions: chunk
                });
            }
        } catch (err) {
            console.error('Error in everyone command:', err);
            await msg.reply('Ocurrió un error al mencionar a todos.');
        }
    }
}

module.exports = EveryoneCommand; 