import { catchAsyncError } from "../middleware/catchAsyncError.js"


// get user profile
export const getUserProfile = catchAsyncError(async (req, res, next) => {

    res.status(200).json({
        success: true,
        message: req.user,
    })
});
