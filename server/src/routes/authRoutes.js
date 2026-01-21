const express =require('express')
const router = express.Router(); // no space after dot
const {login ,signup,logout,updateProfile,updateUser,getUserInfo}  =require('../controllers/authController');
const { protectRoute } = require('../middleware/protectRoute');
// Signup route
router.post("/signup",signup);

// Login route
router.post("/login",login );

// Logout route
router.post("/logout",logout);

router.put('/update-profile',protectRoute,updateProfile)
router.put('/update-user',protectRoute,updateUser)
router.get('/getUser',protectRoute,getUserInfo)


module.exports = router
