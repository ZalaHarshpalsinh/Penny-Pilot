import express from "express";
import { userRouter, transactionRouter, analysisRouter, customizationRouter } from "./routes/index.js"

export function App() {
    const app = express();
    app.use(express.json());
    // app.use(routes);
    app.use('/api/users', userRouter)
    app.use('/api/transactions', transactionRouter)
    app.use('/api/customizations', customizationRouter)
    app.use('/api/analysis',analysisRouter)
    app.use((req, res) => {
        res.status(404).json({ message: 'Route not found' });
      });
    return app;
}

// import express from "express"
// import cookieParser from "cookie-parser"

// const app = express()

// app.use( express.static( "public" ) )

// app.use( express.json( {
//     limit: "10kb",
// } ) )

// app.use( express.urlencoded( {
//     extended: true,
//     limit: "10kb",
// } ) )

// app.use( cookieParser() )

// import
// {
//     userRouter,
//     transactionRouter,
//     analysisRouter,
//     customizationRouter,
// } from "./routes/index.js"
// app.use((req, res) => {
//             res.status(404).json({ message: 'Route not found' });
//     });
// app.use( "api/v1/users", userRouter )
// app.use( "api/v1/transactions", transactionRouter )
// app.use( "api/v1/customizations", customizationRouter )
// app.use( "/api/v1/analysis", analysisRouter )

// export default app