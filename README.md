# WhatsApp Bot

A modular and extensible WhatsApp bot built with Node.js and whatsapp-web.js. This bot provides AI-powered chat assistance and is designed to be easily extensible with new commands.

## Features

- 🤖 **AI Chat Assistant**: Get AI-powered responses using the `@ai` command
- 👥 **@everyone Group Mention**: Mention all group members at once with the `@everyone` command
- 🔧 **Modular Architecture**: Easy to add new commands and features
- 📝 **Clean Code Structure**: Well-organized, maintainable codebase
- 🔐 **Secure Authentication**: Uses LocalAuth for persistent sessions

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WhatsApp account
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd whatsapp-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the bot:
```bash
npm start
```

5. Scan the QR code with your WhatsApp mobile app to authenticate.

## Usage

### Available Commands

- `@ai <question>` - Ask the AI assistant a question about the chat context
- `@everyone <message>` - Mention all group members at once with an optional custom message

### Example Usage

```
@ai What's the main topic of discussion in this group?
@ai Summarize the last 10 messages
@ai Who has been most active in the chat today?

@everyone Please read the pinned message!
@everyone
```

- When you use `@everyone`, the bot will mention all group members in a single message (or in batches for large groups), without showing their numbers in the message text. This is less spammy and notifies everyone cleanly.

## Project Structure

```
src/
├── commands/           # Command handlers
│   ├── aiCommand.js    # AI command implementation
│   ├── everyoneCommand.js # @everyone group mention command
│   └── commandManager.js # Command routing and management
├── services/           # Business logic services
│   ├── openaiService.js # OpenAI API integration
│   └── whatsappService.js # WhatsApp client management
├── utils/              # Utility functions
│   └── chatUtils.js    # Chat-related utilities
├── config/             # Configuration files
│   └── constants.js    # Application constants
└── index.js           # Main application entry point
```

## Adding New Commands

To add a new command, follow these steps:

1. Create a new command file in `src/commands/`:
```javascript
class MyNewCommand {
    async execute(msg, client) {
        // Your command logic here
        const chat = await msg.getChat();
        await chat.sendMessage('Hello from new command!');
    }
}

module.exports = MyNewCommand;
```

2. Add the command to the constants in `src/config/constants.js`:
```javascript
const COMMANDS = {
    AI: '@ai',
    EVERYONE: '@everyone',
    MY_NEW_COMMAND: '@mycommand'  // Add your new command
};
```

3. Register the command in `src/commands/commandManager.js`:
```javascript
const MyNewCommand = require('./myNewCommand');

initializeCommands() {
    this.commands.set(COMMANDS.AI, new AICommand());
    this.commands.set(COMMANDS.EVERYONE, new EveryoneCommand());
    this.commands.set(COMMANDS.MY_NEW_COMMAND, new MyNewCommand()); // Add this line
}
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Constants

You can modify the following constants in `src/config/constants.js`:

- `OPENAI_CONFIG`: OpenAI model and parameters
- `CHAT_CONFIG`: Chat history limits
- `COMMANDS`: Command prefixes

## Development

### Running in Development Mode

```bash
npm run dev
```

### Adding Dependencies

```bash
npm install <package-name>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-command`
3. Commit your changes: `git commit -am 'Add new command'`
4. Push to the branch: `git push origin feature/new-command`
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Security

- Never commit your `.env` file or API keys
- Keep your WhatsApp session secure
- Regularly update dependencies for security patches

---

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at [whatsapp.com](https://www.whatsapp.com/). "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners. Also it is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe. For any businesses looking to integrate with WhatsApp for critical applications, we highly recommend using officially supported methods, such as Twilio's solution or other alternatives. You might also consider the [official API](https://www.twilio.com/whatsapp) . 