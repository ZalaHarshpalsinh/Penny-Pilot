import { asyncHandler, ApiError, ApiResponse, uploadOnCloudinary } from "../utils/index.js"
import { User } from "../db/index.js"

const registerUser = asyncHandler( async ( req, res ) =>
{
    const { username, email, password } = req.body

    if (
        [ username, email, password ].some( ( field ) => field?.trim() === "" )
    )
    {
        throw new ApiError( 400, "All fields are required" )
    }

    const existedUser = await User.findOne( { email } )

    if ( existedUser )
    {
        throw new ApiError( 409, "User with email already exists" )
    }

    const profilePhotoLocalPath = req.file?.path;

    if ( !profilePhotoLocalPath )
    {
        throw new ApiError( 400, "Profile photo is required" )
    }

    const profilePhoto = uploadOnCloudinary( profilePhotoLocalPath )

    if ( !profilePhoto )
    {
        throw new ApiError( 400, "Profile photo is required" )
    }

    const user = await User.create( {
        username,
        email,
        password,
        profilePhoto: profilePhoto.url
    } )

    const createdUser = await User.findById( user._id ).select(
        "-password -refreshToken"
    )

    if ( !createdUser )
    {
        throw new ApiError( 500, "Something went wrong while registering the user" )
    }

    return res.status( 201 ).json(
        new ApiResponse( 201, createdUser, "User registered Successfully" )
    )

} )

const loginUser = asyncHandler( async ( req, res ) =>
{
    const { email, password } = req.body

    if ( !email?.trim() )
    {
        throw new ApiError( 400, "Email is required" )
    }

    const user = await User.findOne( { email } )

    if ( !user )
    {
        throw new ApiError( 404, "User does not exist" )
    }

    const isPasswordValid = await user.isPasswordCorrect( password )

    if ( !isPasswordValid )
    {
        throw new ApiError( 401, "Invalid user credentials" )
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save()

    const loggedInUser = await User.findById( user._id ).select( "-password -refreshToken" )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status( 200 )
        .cookie( "accessToken", accessToken, options )
        .cookie( "refreshToken", refreshToken, options )
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

} )

const logoutUser = asyncHandler( async ( req, res ) =>
{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status( 200 )
        .clearCookie( "accessToken", options )
        .clearCookie( "refreshToken", options )
        .json( new ApiResponse( 200, {}, "User logged Out" ) )
} )

const refreshAccessToken = asyncHandler( async ( req, res ) =>
{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken

    if ( !incomingRefreshToken )
    {
        throw new ApiError( 401, "Unauthorized request" )
    }

    try
    {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById( decodedToken?._id )

        if ( !user )
        {
            throw new ApiError( 401, "Invalid refresh token" )
        }

        if ( incomingRefreshToken !== user?.refreshToken )
        {
            throw new ApiError( 401, "Refresh token is expired or used" )

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const accessToken = user.generateAccessToken()
        const newRefreshToken = user.generateRefreshToken()

        user.refreshToken = newRefreshToken
        user.save()


        return res
            .status( 200 )
            .cookie( "accessToken", accessToken, options )
            .cookie( "refreshToken", newRefreshToken, options )
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch ( error )
    {
        throw new ApiError( 401, error?.message || "Invalid refresh token" )
    }

} )

const getUserProfile = asyncHandler( async ( req, res ) =>
{
    return res
        .status( 200 )
        .json( new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ) )
} )

const updateUserProfileDetails = asyncHandler( async ( req, res ) =>
{
    const { email, username } = req.body

    if ( !username || !email )
    {
        throw new ApiError( 400, "All fields are required" )
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username,
                email
            }
        },
        { new: true }

    ).select( "-password -refreshToken" )

    return res
        .status( 200 )
        .json( new ApiResponse( 200, user, "Account details updated successfully" ) )

} )

const updateUserProfilePhoto = asyncHandler( async ( req, res ) =>
{
    const profilePhotoLocalPath = req.file?.path

    if ( !profilePhotoLocalPath )
    {
        throw new ApiError( 400, "Avatar file is missing" )
    }

    const profilePhoto = await uploadOnCloudinary( profilePhotoLocalPath )

    if ( !profilePhoto )
    {
        throw new ApiError( 400, "Error while uploading profile photo" )

    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                profilePhoto: profilePhoto.url
            }
        },
        { new: true }
    ).select( "-password -refreshToken" )

    return res
        .status( 200 )
        .json(
            new ApiResponse( 200, user, "Avatar image updated successfully" )
        )
} )

const deleteUserAccount = asyncHandler( async ( req, res ) =>
{
    const deletedUser = await User.findByIdAndDelete( req.user._id )

    res.status( 200 ).json(
        new ApiResponse( 200, {}, "User account deleted successfully" )
    )
} )

export
{
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile,
    updateUserProfileDetails,
    updateUserProfilePhoto,
    deleteUserAccount,
}