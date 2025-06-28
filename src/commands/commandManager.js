const AICommand = require('./aiCommand');
const HelpCommand = require('./helpCommand');
const EveryoneCommand = require('./everyoneCommand');
const { COMMANDS } = require('../config/constants');

class CommandManager {
    constructor() {
        this.commands = new Map();
        this.initializeCommands();
    }

    initializeCommands() {
        this.commands.set(COMMANDS.AI, new AICommand());
        this.commands.set(COMMANDS.HELP, new HelpCommand());
        this.commands.set(COMMANDS.EVERYONE, new EveryoneCommand());
        // Add more commands here as needed
    }

    async handleMessage(msg, client) {
        const messageBody = msg.body;
        
        // Check if message is from the bot itself
        if (!msg.id.fromMe) {
            return;
        }

        // Find and execute matching command
        for (const [commandPrefix, commandHandler] of this.commands) {
            if (messageBody.startsWith(commandPrefix)) {
                console.log(`Executing command: ${commandPrefix}`);
                await commandHandler.execute(msg, client);
                return;
            }
        }
    }

    addCommand(prefix, commandHandler) {
        this.commands.set(prefix, commandHandler);
    }

    removeCommand(prefix) {
        this.commands.delete(prefix);
    }
}

module.exports = CommandManager; 