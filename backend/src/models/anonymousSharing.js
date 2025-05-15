import mongoose from 'mongoose';

const anonymousSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    options: {
        type: String,
        enum: ['happy', 'sad', 'depression', 'adhd', 'other'],
    },
    tags: [
        {
            type: String
        }
    ]
},
{ timestamps: true });

const Anonymous = mongoose.model('Anonymous', anonymousSchema);
export default Anonymous;
