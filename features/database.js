import mongoose from "mongoose";

export const connectDb = async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"AJDB",
}).then((c)=>{
    console.log(`Connected to MongoDB ${c.connection.host}`);
}).catch((e)=>{
    console.log(e);
});
};