import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    answers: [
        {
            questionId: Number,
            question: String,
            answer: String
        }
    ],
    moodResult: {
        category: {
            type: String,
            enum: ['happy', 'content', 'neutral', 'anxious', 'depressed', 'stressed', 'other']
        },
        score: {
            type: Number,
            min: 0,
            max: 100
        },
        analysis: String
    }
}, { timestamps: true });

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
export default QuizResult;
