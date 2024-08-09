import { decodeToken } from "../utils/tokens.js";

function authenticate(req, res, next) {
    try {
        let tokenHeader = req.headers.authorization;

        // Check if the Authorization header is present and properly formatted
        if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header is missing or invalid" });
        }

        // Extract the token from the header
        const token = tokenHeader.split(' ')[1];

        // Verify and decode the token
        const { user_id } = decodeToken(token);
        req.user = { user_id };

        next();
    } catch (error) {
        // Log error for debugging purposes (optional)
        console.error("Authentication error:", error.message);

        // Respond with unauthorized status
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authenticate;
