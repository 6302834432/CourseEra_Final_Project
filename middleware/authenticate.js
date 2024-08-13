
import { decodeToken } from "../utils/tokens.js";


const authenticate= (req, res, next) => {
 const token = req.headers.authorization;
 console.log(token)
 if (!token) return res.status(UNAUTHORIZED).send();

 try {
  const decoded=decodeToken(token)
   req.user = decoded;
   console.log(req.user)
 } catch (error) {
   return res.status(UNAUTHORIZED).send();
 }

 return next();
};
export default authenticate;
