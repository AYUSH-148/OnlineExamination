const mongoose=require('mongoose');
const connectDB = async()=>{
    try{
        //mongodb connection string "process.env.MONGO_URI"
        const con = await mongoose.connect("mongodb+srv://ayushpro111:547579ayushnegi@cluster0.yexp9kg.mongodb.net/",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('MongoDB connected');
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectDB;
