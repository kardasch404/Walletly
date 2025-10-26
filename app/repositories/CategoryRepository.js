const Category = require('../models/Category');

class CategoryRepository {

    async create(data) {
        try {
            const category = await Category.create({
                id: data.id,
                name: data.name,
                description: data.description,
                type: data.type,
                user_id: data.user_id
            });
            return category.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId) {
        try {
            const categories = await Category.findAll({
                where: { user_id: userId }
            });
            return categories.map(cat => cat.toJSON());
        } catch (error) {
            throw error;
        }
    }

    async getAllCategoriesFromUser(userId) {
        try {
            const categories = await Category.findAll({
                where: { user_id: userId }
            });
            return categories.map(cat => cat.toJSON());
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryRepository;