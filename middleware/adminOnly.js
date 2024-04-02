async function adminOnly(req, res, next) {
    try {
        if (req.user.role === "admin") {
            next();
        } else {
            throw { name: "Unauthorized" };
        }
    } catch (error) {
        next(error);
    }
}
module.exports = adminOnly;
