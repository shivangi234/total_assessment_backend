const sessionAuth = async (req, res, next) => {
    try {
        console.log("session auth");
        const session = req.session;
        if(session.userCode)
            next(); 
        else
            return res.status(200).json({status: 440, "message": "Session Expired"});
    } catch (error) {
        return res.status(200).json({status: 500, "message": "Something went wrong", "error": error.message});
    }
}

module.exports = { sessionAuth }