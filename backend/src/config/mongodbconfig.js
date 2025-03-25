import mongoose from "mongoose"

export const Connection= async () => {
    const URL =process.env.MONGO_URI;

    try{
        await mongoose.connect(URL,{
        });
        console.log('Database connected sucessfully!!');

    }catch(error){
        console.log('Error while connecting with the database',error.message);
    }
}
export default Connection