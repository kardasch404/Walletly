class CategoryService {
    #categoryRepository;

    constructor(categoryRepository) {
        this.#categoryRepository = categoryRepository;
    }

    async create(data, userId)
    {
        try {
            const categoryData = {
                id: Math.random().toString(36).substring(2, 12),
                name: data.name,
                description: data.description,
                image: data.image,
                type: data.type,
                user_id: userId
            };
            
            return await this.#categoryRepository.create(categoryData);
        } catch (error) {
            throw error;
        }
    }

    async getAllCategoriesFromUser(userId) {
        try {
            return await this.#categoryRepository.getAllByUserId(userId);
        } catch (error) {
            throw error;
        }
    }


}

module.exports = CategoryService;