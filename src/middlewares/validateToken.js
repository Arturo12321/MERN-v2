import jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config-secret.js";
export const authRequired = (req, res, next) => {

    const { token } = req.cookies
    if (!token) 
        return res.status(401).json({ message: 'Invalid token' });

        jwt.verify(token, TOKEN_SECRET, (err, user) =>  {
            if (err) return res.status(403).json({ message: "Invalid token" });

            req.user = user;
            console.log(req.user);
            next();
        });
};
