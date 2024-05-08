 const getSession = async (req,res) => {
    console.log("session");
    const session = req.session;
    return res.status(200).json({status: 200, message: "Session data fetched successsfully.", "result": session});
}
module.exports = { getSession }