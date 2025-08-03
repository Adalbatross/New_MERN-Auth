import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(400).json({
            success: false,
            message:"Not Authorized! Please log in again"
        })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userId = tokenDecode.id
        } else {
            res.success(400).json({
                success: false,
                message:"Not Authorized! PLease log in again"
            })
        }
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export default userAuth;