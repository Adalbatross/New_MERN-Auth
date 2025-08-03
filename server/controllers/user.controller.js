import userModel from "../models/user.models.js";

export const getUserData = async (req, res) => {
    try {
        const  userId  = req.userId;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            userData: {
                name: user.name,
                email: user.email,
                verified: user.isAccountVerified
            }    
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    
}