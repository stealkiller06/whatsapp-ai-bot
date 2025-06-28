require('dotenv').config();
const WhatsAppService = require('./services/whatsappService');
const CommandManager = require('./commands/commandManager');

class WhatsAppBot {
    constructor() {
        this.whatsappService = new WhatsAppService();
        this.commandManager = new CommandManager();
        this.setupMessageHandler();
    }

    setupMessageHandler() {
        const client = this.whatsappService.getClient();
        
        client.on('message_create', async (msg) => {
            try {
                // Log message for debugging
                console.log('Message received:', {
                    from: msg.from,
                    body: msg.body,
                    fromMe: msg.id.fromMe
                });

                // Handle commands
                await this.commandManager.handleMessage(msg, client);

            } catch (error) {
                console.error('Error handling message:', error);
            }
        });
    }

    async start() {
        try {
            console.log('Starting WhatsApp Bot...');
            await this.whatsappService.initialize();
        } catch (error) {
            console.error('Failed to start WhatsApp Bot:', error);
            process.exit(1);
        }
    }
}

// Start the bot
const bot = new WhatsAppBot();
bot.start(); 