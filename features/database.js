import mongoose from "mongoose";

export const connectDb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI,{
    dbName:"AJDB",
}).then((c)=>{
    console.log(`Connected to MongoDB ${c.connection.host}`);
}).catch((e)=>{
    console.log(e);
});
};
