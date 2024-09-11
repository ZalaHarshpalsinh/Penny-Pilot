import { Router } from "express";
import 
{
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile,
    updateUserProfileDetails,
    updateUserProfilePhoto,
    deleteUserAccount,
} from "../controllers/user.controller.js"

import verifyJwt from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"

const router = Router();


router.post( "/register", upload.single( "profilePhoto" ), registerUser )
router.post( "/login", loginUser )
router.post( "/logout", verifyJwt, logoutUser )
router.post( "/refresh-token", refreshAccessToken )
router.get( "/profile-details", verifyJwt, getUserProfile )
router.patch( "/profile-details", verifyJwt, updateUserProfileDetails )
router.patch( "/profile-photo", verifyJwt, upload.single( "profilePhoto" ), updateUserProfilePhoto )
router.delete( "/account", verifyJwt, deleteUserAccount )


export default router