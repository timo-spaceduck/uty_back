const crypto = require('crypto');
require('dotenv').config();

const paddleController = {
    handleWebhook: async (req, res) => {
        try {
            const signature = req.headers['paddle-signature'];
            const payload = JSON.stringify(req.body);

            if (!signature) {
                return res.status(400).json({ error: 'Missing Paddle signature' });
            }

            const isValid = verifyPaddleSignature(payload, signature);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid Paddle signature' });
            }

            const event = req.body;

            switch (event.event_type) {
                case 'subscription.created':
                    await handleSubscriptionCreated(event);
                    break;
                case 'subscription.updated':
                    await handleSubscriptionUpdated(event);
                    break;
                case 'subscription.canceled':
                    await handleSubscriptionCanceled(event);
                    break;
                case 'transaction.completed':
                    await handleTransactionCompleted(event);
                    break;
                case 'transaction.refunded':
                    await handleTransactionRefunded(event);
                    break;
                default:
                    console.log(`Unhandled Paddle event: ${event.event_type}`);
            }

            res.status(200).json({ message: 'Webhook processed successfully' });
        } catch (error) {
            console.error('Error processing Paddle webhook:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

function verifyPaddleSignature(payload, signature) {
    const paddlePublicKey = process.env.PADDLE_API_KEY;

    if (!paddlePublicKey) {
        console.error('PADDLE_PUBLIC_KEY environment variable is not set');
        return false;
    }

    try {
        const expectedSignature = crypto
            .createHmac('sha256', paddlePublicKey)
            .update(payload)
            .digest('hex');

        return crypto.timingSafeEqual(
            Buffer.from(signature, 'hex'),
            Buffer.from(expectedSignature, 'hex')
        );
    } catch (error) {
        console.error('Error verifying Paddle signature:', error);
        return false;
    }
}

async function handleSubscriptionCreated(event) {
    console.log('Subscription created:', event.data);
}

async function handleSubscriptionUpdated(event) {
    console.log('Subscription updated:', event.data);
}

async function handleSubscriptionCanceled(event) {
    console.log('Subscription canceled:', event.data);
}

async function handleTransactionCompleted(event) {
    console.log('Transaction completed:', event.data);
}

async function handleTransactionRefunded(event) {
    console.log('Transaction refunded:', event.data);
}

module.exports = paddleController;
