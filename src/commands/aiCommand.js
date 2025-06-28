const OpenAIService = require('../services/openaiService');
const ChatUtils = require('../utils/chatUtils');
const { CHAT_CONFIG } = require('../config/constants');

class AICommand {
    constructor() {
        this.openaiService = new OpenAIService();
    }

    async execute(msg, client) {
        try {
            const chat = await msg.getChat();
            const question = msg.body.slice('@ai'.length).trim();

            // Get chat history and participants
            const messages = await ChatUtils.getChatHistory(chat, CHAT_CONFIG.aiMessageLimit);
            const participants = await ChatUtils.getChatParticipants(client, chat);

            console.log(`Processing AI request with ${messages.length} messages`);

            // Get AI response
            const response = await this.openaiService.getChatResponse(
                messages, 
                question, 
                chat, 
                participants
            );

            // Send response with mentions if any
            await ChatUtils.sendMessageWithMentions(chat, response.text, response.mentions);

        } catch (err) {
            console.error('Error in AI command:', err);
            await msg.reply('Lo siento, ocurrió un error al procesar tu solicitud.');
        }
    }
}

module.exports = AICommand; 