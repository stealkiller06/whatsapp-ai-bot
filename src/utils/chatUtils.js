const { CHAT_CONFIG } = require('../config/constants');

class ChatUtils {
    static async getChatHistory(chat, limit = CHAT_CONFIG.defaultMessageLimit) {
        try {
            const messages = await chat.fetchMessages({ limit });

            return messages.map(msg => ({
                author: msg.author || 'system',
                body: msg.body,
                phoneNumber: msg.author ? msg.author.split('@')[0] : 'system',
                timestamp: msg.timestamp
            })).filter(msg => msg.body && msg.body.trim() !== '');
        } catch (error) {
            console.error('Error fetching chat history:', error);
            return [];
        }
    }

    static async getChatParticipants(client, chat) {
        try {
            const chatWithParticipants = await client.getChatById(chat.id._serialized);
            return chatWithParticipants.participants || [];
        } catch (error) {
            console.log('Could not get participants:', error);
            return [];
        }
    }

    static async sendMessageWithMentions(chat, text, mentions) {
        if (mentions && mentions.length > 0) {
            await chat.sendMessage(text, { mentions });
        } else {
            await chat.sendMessage(text);
        }
    }
}

module.exports = ChatUtils; 