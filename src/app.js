import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use( express.static( "public" ) )

app.use( express.json( {
    limit: "10kb",
} ) )

app.use( express.urlencoded( {
    extended: true,
    limit: "10kb",
} ) )

app.use( cookieParser() )



import
{
    userRouter,
    transactionRouter,
    analysisRouter,
    customizationRouter,
} from "./routes"

app.use( "api/v1/users", userRouter )
app.use( "api/v1/transactions", transactionRouter )
app.use( "api/v1/customizations", customizationRouter )
app.use( "api/v1/analysis", analysisRouter )

export default app