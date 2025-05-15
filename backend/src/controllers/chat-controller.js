import ChatHistory from '../models/chatHistory.js';

// Get all chat histories for a user
export const getUserChatHistories = async (req, res) => {
    try {
        const { username } = req.params;
        
        const chatHistories = await ChatHistory.find({ username })
            .sort({ lastUpdated: -1 })
            .select('_id title createdAt lastUpdated');
            
        return res.status(200).json(chatHistories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get specific chat history by ID
export const getChatHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const chatHistory = await ChatHistory.findById(id);
        
        if (!chatHistory) {
            return res.status(404).json({ error: 'Chat history not found' });
        }
        
        return res.status(200).json(chatHistory);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Create a new chat history
export const createChatHistory = async (req, res) => {
    try {
        const { username, title, messages } = req.body;
        
        const newChatHistory = new ChatHistory({
            username,
            title,
            messages
        });
        
        await newChatHistory.save();
        
        return res.status(201).json(newChatHistory);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update existing chat history
export const updateChatHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { messages, title } = req.body;
        
        const chatHistory = await ChatHistory.findById(id);
        
        if (!chatHistory) {
            return res.status(404).json({ error: 'Chat history not found' });
        }
        
        if (title) {
            chatHistory.title = title;
        }
        
        if (messages && messages.length > 0) {
            chatHistory.messages = messages;
        }
        
        chatHistory.lastUpdated = Date.now();
        
        await chatHistory.save();
        
        return res.status(200).json(chatHistory);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete chat history
export const deleteChatHistory = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await ChatHistory.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ error: 'Chat history not found' });
        }
        
        return res.status(200).json({ message: 'Chat history deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete multiple chat histories
export const deleteMultipleChatHistories = async (req, res) => {
    try {
        const { ids } = req.body;
        
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'Invalid request. Please provide an array of ids' });
        }
        
        await ChatHistory.deleteMany({ _id: { $in: ids } });
        
        return res.status(200).json({ message: `${ids.length} chat histories deleted successfully` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
