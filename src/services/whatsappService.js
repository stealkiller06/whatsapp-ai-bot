const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { STATE } = require('../config/constants');

class WhatsAppService {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth()
        });
        this.connectionState = STATE.STARTING;
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.client.on('loading_screen', (percent, message) => {
            this.connectionState = STATE.LOADING_SCREEN;
            console.log(`Loading screen: ${percent}% - ${message}`);
        });

        this.client.on('authenticated', () => {
            this.connectionState = STATE.AUTHENTICATING;
            console.log('Authentication successful!');
        });

        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            this.connectionState = STATE.READY;
            console.log('WhatsApp Bot is ready!');
        });

        this.client.on('auth_failure', (msg) => {
            console.error('Authentication failure:', msg);
        });

        this.client.on('disconnected', (reason) => {
            console.log('Client was logged out', reason);
        });
    }

    async initialize() {
        try {
            await this.client.initialize();
            this.setupConnectionTimeout();
        } catch (error) {
            console.error('Error initializing WhatsApp client:', error);
            throw error;
        }
    }

    setupConnectionTimeout() {
        setTimeout(() => {
            if (this.connectionState !== STATE.READY) {
                console.log(`
Warning: Connection taking longer than expected.
Current state: ${this.connectionState}
This could be due to:
- Slow internet connection
- WhatsApp Web server issues
- High system resource usage
                `);
            }
        }, 30000);
    }

    getClient() {
        return this.client;
    }

    getConnectionState() {
        return this.connectionState;
    }
}

module.exports = WhatsAppService; 