const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                errorMessage: "Unauthorized access",
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
         req.currentUserId = decoded.userId;
        next();
    }catch(error){
        return res.status(401).json({
            errorMessage: "Unauthorized access! Invalid Token",
        });
    }
}

module.exports = verifyToken;
