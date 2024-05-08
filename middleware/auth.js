const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodeData;
        if(token){
            decodeData = jwt.verify(token, 'key');
            req.userId = decodeData?.id;
        }
        next();    
    } catch (error) {
        res.status(200).json({status: 409, "message": "Unauthorized Access", "error": error.message});
    }
}

module.exports = { auth };