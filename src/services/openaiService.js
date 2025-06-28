const OpenAI = require('openai');
const { OPENAI_CONFIG } = require('../config/constants');

class OpenAIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async getChatResponse(messages, question, chat, participants) {
        try {
            const systemPrompt = {
                role: "system",
                content: `Eres un asistente que analiza chats de WhatsApp. 
                Tienes acceso a:
                - Mensajes recientes del chat
                - Lista de participantes
                - Información del grupo
                Responde de manera concisa y objetiva.
                
                Si necesitas mencionar a alguien, usa el formato @número (ejemplo: @123456789).
                Solo menciona a personas que estén realmente en el grupo.`
            };

            const context = {
                role: "system",
                content: `Contexto actual:
                - Grupo: ${chat.name || 'Chat'}
                - Total participantes: ${participants.length}
                - Mensaje analizado: "${question}"`
            };

            const chatHistory = messages.map(msg => ({
                role: "user",
                content: `[${msg.timestamp}] ${msg.phoneNumber}: ${msg.body}`
            })).slice(-10);

            const response = await this.openai.chat.completions.create({
                model: OPENAI_CONFIG.model,
                messages: [
                    systemPrompt,
                    context,
                    ...chatHistory,
                    {
                        role: "user",
                        content: question
                    }
                ],
                max_tokens: OPENAI_CONFIG.maxTokens,
                temperature: OPENAI_CONFIG.temperature,
            });

            return this.processResponse(response.choices[0].message.content, participants);
        } catch (error) {
            console.error('Error getting GPT response:', error);
            throw new Error('Diablo, hubo un error con esta vaina. Trata más tarde.');
        }
    }

    processResponse(response, participants) {
        let processedResponse = response;
        const mentions = [];

        // Buscar números con formato @número y validar que sean participantes reales
        const numberMatches = processedResponse.match(/@(\d+)/g);
        if (numberMatches) {
            numberMatches.forEach(match => {
                const number = match.replace('@', '');
                // Verificar que el número corresponda a un participante real
                const isParticipant = participants.some(participant => 
                    participant.id.user === number
                );
                
                if (isParticipant) {
                    const mention = `${number}@c.us`;
                    mentions.push(mention);
                } else {
                    // Si no es un participante, remover la mención del texto
                    processedResponse = processedResponse.replace(match, number);
                }
            });
        }

        return {
            text: processedResponse,
            mentions: mentions
        };
    }
}

module.exports = OpenAIService; 