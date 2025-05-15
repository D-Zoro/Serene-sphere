import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant', 'system'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatHistorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        default: function() {
            return `Conversation on ${new Date().toLocaleDateString()}`;
        }
    },
    messages: [messageSchema],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
export default ChatHistory;
