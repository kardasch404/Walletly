class CategoryController 
{

    #categoryService;
    #userController;

    constructor(categoryService) {
        this.#categoryService = categoryService;
    }

    async createCategory(req, res)
    {
        try {
            const data = req.body;
            const userId = req.session.userId;
            
            if (!userId) {
                return res.status(400).json({ error: 'User not found' });
            }

            const category = await this.#categoryService.create(data, userId);

            return res.redirect('/categories');
            // return res.json({
            //     error: false,
            //     message: 'Category created success',
            //     category: category
            // });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getAllCategoriesFromUser(req, res)
    {
        try {
            const userId = req.session.userId;

            if (!userId)
            {
                return res.redirect('/login');
            }

            const categories = await this.#categoryService.getAllCategoriesFromUser(userId);
            return res.render('categories', {
                title: 'My Categories - Walletly',
                categories: categories
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;