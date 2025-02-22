import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.token
        console.log(req.headers);
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token_decode.email, process.env.ADMIN_EMAIL);
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Access denied" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default adminAuth;