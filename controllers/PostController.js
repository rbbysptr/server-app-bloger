const { User, Category, Post } = require("../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

class PostController {
    static async showPost(req, res, next) {
        try {
            let data = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["email", "password"],
                    },
                    {
                        model: Category,
                        attributes: ["name"],
                    },
                ],
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
    static async createPost(req, res, next) {
        try {
            let { title, content, imgUrl, CategoryId } = req.body;
            let data = await Post.create({
                title,
                content,
                imgUrl,
                CategoryId,
                AuthorId: req.user.id,
            });
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    }
    static async getPostById(req, res, next) {
        try {
            let data = await Post.findByPk(+req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ["email", "password"],
                    },
                    {
                        model: Category,
                        attributes: ["name"],
                    },
                ],
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
    static async updatePost(req, res, next) {
        try {
            let { title, content, imgUrl, CategoryId } = req.body;
            let post = await Post.findByPk(req.params.id);
            if (!post) {
                next();
            }
            if (req.user.role === 'admin' || (req.user.role === 'staff' && post.AuthorId !== req.user.id)) {
                await post.update({
                    title,
                    content,
                    imgUrl,
                    CategoryId,
                    AuthorId: req.user.id
                });
                res.status(200).json(post);
            } else {
                next();
            }
        } catch (err) {
            next(err);
        }
    }

    static async deleteById(req, res, next) {
        try {
            let data = await Post.findByPk(req.params.id);
            if (!data) {
                next();
            }
            if (req.user.role === 'admin' || (req.user.role === 'staff' && data.AuthorId === req.user.id)) {
                await Post.destroy({ where: { id: req.params.id } });
                return res.status(200).json({
                    message: "Post has been deleted successfully",
                    data: data
                });
            } else {
                next();
            }
        } catch (err) {
            next(err);
        }
    }
    static async uploadImgUrl(req, res,next) {
        try {
            const postId = req.params.id;
            const post = await Post.findByPk(postId); 
            if (!post) {
                throw { name: 'NotFound', message: `Post id ${postId} not found` };
            }
            if (req.user.role === 'admin' || (req.user.role === 'staff' && post.AuthorId === req.user.id)){
                if (!req.file) {
                    throw { name: 'FileRequired' };
                }
                const base64String = req.file.buffer.toString("base64");
                const dataUrl = `data:${req.file.mimetype};base64,${base64String}`;
                const result = await cloudinary.uploader.upload(dataUrl, {
                    public_id: req.file.originalname,
                    folder: "phase2-rbby"
                });
                await Post.update({ imgUrl: result.secure_url }, { where: { id: postId } });
                res.status(200).json({
                    message: `Image ${postId} success to update`
                });
            } else {
                next();
            }
        } catch (err) {
            next(err);
        }
    }

}


module.exports = PostController;