import { ApiError } from "./index.js";

const asyncHandler = ( fn ) => async ( req, res, next ) =>
{
    try
    {
        await fn( req, res, next )
    } catch ( error )
    {
        if ( error instanceof ApiError )
        {
            res.status( error.statusCode ).json( {
                success: false,
                message: error.message
            } )
        }
        else
        {
            console.log( error )
            res.status( 500 ).json( {
                success: false,
                message: "Something went wrong!",
            } )
        }
        next( error );
    }
}

export default asyncHandler