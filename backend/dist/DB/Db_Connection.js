import mongoose from "mongoose";
export const databaseconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    }
    catch (err) {
        throw new Error("Cannot connect to database");
    }
};
export const databasedisconnect = async () => {
    try {
        await mongoose.disconnect();
    }
    catch (err) {
        console.log(err);
        throw new Error("Could not Disconnect from mongo db");
    }
};
