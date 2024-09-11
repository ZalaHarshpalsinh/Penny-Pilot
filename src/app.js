import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use( cors( {
    origin: process.env.CORS_ORIGIN,
    credentials: true
} ) )

app.use( express.static( "public" ) )

app.use( express.urlencoded( {
    extended: true,
    limit: "10kb",
} ) )

app.use( express.json( {
    limit: "10kb",
} ) )


app.use( cookieParser() )



import
{
    userRouter,
    transactionRouter,
    analysisRouter,
    customizationRouter,
} from "./routes/index.js"

app.use( "/api/v1/users", userRouter )
app.use( "/api/v1/transactions", transactionRouter )
app.use( "/api/v1/customizations", customizationRouter )
app.use( "/api/v1/analysis", analysisRouter )

app.use( ( req, res ) =>
{
    res.status( 404 ).json( { message: 'Route not found' } );
} );

export default app