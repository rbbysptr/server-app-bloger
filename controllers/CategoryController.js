const { Category } = require("../models");
class CategoriesController {
    static async getAllCategories(req, res,next) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
    static async createCategory(req, res,next) {
        try {
            const newCategory = await Category.create(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
    static async updateCategory(req, res,next) {
        try {
            const categoryId = req.params.id;
            const category = await Category.findByPk(categoryId);
            if (req.user.role === 'admin' || (req.user.role === 'staff' && category.AuthorId === req.user.id)) {
                const [updated] = await Category.update(req.body, { where: { id: categoryId } });
                if (updated) {
                    const updatedCategory = await Category.findByPk(categoryId);
                    res.status(200).json(updatedCategory);
                } else {
                    res.status(404).json({ error: 'Category not found' });
                }
            } else {
                next();
            }
        } catch (error) {
           next(error)
        }
    }
}

module.exports = CategoriesController;
