import 'dotenv/config'

import connectDB from "./db/mongodb.js"
import app from "./app.js"

connectDB()
    .then( () =>
    {
        app.listen( process.env.PORT || 8000, () =>
        {
            console.log( `Server is running at port : ${process.env.APPLICATION_PORT}` );
        } )
    } )
    .catch( ( err ) =>
    {
        console.log( "Application error: Database connection failed !!! \n" );
        process.exit( 1 );
    } )



