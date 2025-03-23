import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    article:{
        type: String,
        required: true,
    },
    coverPicture:{
        type: String, // again path of the picture
        default: ''
    },
    tags:[{
        type: String
    }]
},{
    timestamps: true
});

const Journal = mongoose.model('Journal',journalSchema);
export default Journal;
