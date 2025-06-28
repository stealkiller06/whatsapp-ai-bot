class HelpCommand {
    async execute(msg, client) {
        try {
            const chat = await msg.getChat();
            
            const helpMessage = `🤖 *WhatsApp Bot Commands*

*Available Commands:*
• \`@ai <question>\` - Ask the AI assistant a question about the chat context
• \`@everyone <message>\` - Mention all group members at once with an optional custom message
• \`@help\` - Show this help message

*Examples:*
• \`@ai What's the main topic of discussion?\`
• \`@ai Summarize the last 10 messages\`
• \`@ai Who has been most active today?\`
• \`@everyone Please read the pinned message!\`
• \`@everyone\`

*Note:* All commands must be sent by the bot itself (you need to type them in your own chat).`;

            await chat.sendMessage(helpMessage);
        } catch (err) {
            console.error('Error in help command:', err);
            await msg.reply('Error showing help message.');
        }
    }
}

module.exports = HelpCommand; 