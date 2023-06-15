import mongoose from 'mongoose';

const connectionDB = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGO_URI || '';
        if(!mongoUrl){
            throw new Error('MongoDB URL not defined');
        }
        await mongoose.connect(mongoUrl);
        console.log(`Connection to MongoDB ${process.env.SC}`);
    } catch (error) {
        console.log(`MongoDB connection Error ${error}`);
    }
}
export default connectionDB;
