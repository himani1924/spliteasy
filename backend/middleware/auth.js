export const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}