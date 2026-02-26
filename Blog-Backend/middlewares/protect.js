const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    if (req?.headers && req?.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];
        console.log("line 6", req.headers.authorization.split(' '))
        console.log(req?.headers?.authorization)
        console.log('line 8', token);
        try{
            const isAuthenticated = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(isAuthenticated)
            if (isAuthenticated){
                req.userId = isAuthenticated.userId;
                console.log('Token is valid');
                next();
            } else {
                return res
                .status(401)
                .json({ message: 'Unauthorized! Invalid Token'})            
            }
        }catch (e) {
            return res.status(401).json({ message: " Unauthorized! Invalid token." });
        }
    } else {
        return res
      .status(401)
      .json({ message: " Unauthorized! No token provided." });
    }
}

module.exports = protect