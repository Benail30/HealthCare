
const jwt = require('jsonwebtoken'); 
const { SECRET_KEY } = process.env; //
const verifyToken = (req, res, next) => {
    console.log('Request headers:', req.headers); // Log request headers
    const token = (req.headers['authorization'] || '').split(" ")[1]; // Ensure 'authorization' header exists
    console.log("token : ", token);
    if (!token) {
        console.log("inside not");
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;