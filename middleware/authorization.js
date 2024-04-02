const { Post } = require("../models");

async function authorization(req, res, next) {
    try {
        if (req.user.role === "admin") {
            next();
        } else {
            const postId = Number(req.params.id);
            const userId = req.params.id;
            const post = await Post.findByPk(postId);
            if (!post) {
                throw { name: "NotFound" };
            }
            if (post.AuthorId !== userId) {
                throw { name: "Unauthorized" };
            }
            next();
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports = authorization;