import mongoose from "mongoose";

const connectDB = async () =>
{
    try
    {
        const connectionInstance = await mongoose.connect( `${process.env.MONGODB_URI}` )
        console.log( `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}` );
    }
    catch ( error )
    {
        console.log( "DB error: MONGODB connection FAILED !!\n", error );
        throw error
    }
}

export default connectDB