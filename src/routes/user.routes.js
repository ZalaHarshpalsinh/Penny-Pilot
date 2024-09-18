import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
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
import
{
    registrationSchema,
} from "../middlewares/validations/user.validation.js"


const router = Router();


router.post( "/register", upload.single( "profilePhoto" ), registrationSchema, registerUser )
router.post( "/login", loginUser )
router.post( "/logout", verifyJwt, logoutUser )
router.post( "/refresh-token", refreshAccessToken )
router.get( "/profile-details", verifyJwt, getUserProfile )
router.patch( "/profile-details", verifyJwt, updateUserProfileDetails )
router.patch( "/profile-photo", verifyJwt, upload.single( "profilePhoto" ), updateUserProfilePhoto )
router.delete( "/account", verifyJwt, deleteUserAccount )


export default router