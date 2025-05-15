import QuizResult from '../models/quizResult.js';

export const submitQuiz = async (req, res) => {
    try {
        const { username, answers, moodResult } = req.body;
        
        if (!username || !answers || !moodResult) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newQuizResult = new QuizResult({
            username,
            answers,
            moodResult
        });

        await newQuizResult.save();
        return res.status(201).json(newQuizResult);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getUserMoodHistory = async (req, res) => {
    try {
        const { username } = req.params;
        
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // Get all quiz results for this user, sorted by date
        const moodHistory = await QuizResult.find({ username })
            .sort({ createdAt: -1 })
            .select('moodResult createdAt');
            
        return res.status(200).json(moodHistory);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
