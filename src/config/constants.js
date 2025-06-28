// Connection states
const STATE = {
    STARTING: 'STARTING',
    LOADING_SCREEN: 'LOADING_SCREEN',
    AUTHENTICATING: 'AUTHENTICATING',
    READY: 'READY'
};

// Command prefixes
const COMMANDS = {
    AI: '@ai',
    HELP: '@help',
    EVERYONE: '@everyone'
};

// OpenAI configuration
const OPENAI_CONFIG = {
    model: 'gpt-3.5-turbo',
    maxTokens: 300,
    temperature: 0.3
};

// Chat history configuration
const CHAT_CONFIG = {
    defaultMessageLimit: 200,
    aiMessageLimit: 800
};

module.exports = {
    STATE,
    COMMANDS,
    OPENAI_CONFIG,
    CHAT_CONFIG
}; 