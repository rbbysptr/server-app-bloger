const { Post, Category } = require("../models");

class PublicController {
    static async getAllPost(req, res,next) {
        let { search, filter, sort, page } = req.query;
        let options = {
            include: [{ model: Category }],
            limit: 10,
            offset: (page - 1) * 10 || 0,
        };
        if (filter) {
            options.include.push({
                model: Category,
                where: {
                    name: filter
                }
            });
        }
        if (search) {
            options.where = { name: { [Op.like]: `%${search}%` } };
        }
        if (sort) {
            if (sort === "asc");
            options.order = [["createdAt", "asc"]];
        } else if (sort === "desc") {
            options.order = [["createdAt", "desc"]];
        }
        try {
            let {count, rows} = await Post.findAll(options);
            let result = {
                total: count,
                size: 10,
                totalPage: Math.ceil(count / 10),
                currentPage: page,
                data: rows,
            };
            res.status(200).json(result);
        } catch (error) {
           next(error)
        }
    }

    static async getPostById(req, res,next) {
        try {
            const { id } = req.params;
            let data = await Post.findByPk(id, { include: Category });
            if (!data) {
                return res.status(404).json({ error: 'NotFound' });
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PublicController;
