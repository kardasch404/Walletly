var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserService = require('../services/UserService');
const UserRepository = require('../repositories/UserRepository');
const { validateRegister } = require('../http/requests/RegisterRequest');
const { validateLogin } = require('../http/requests/LoginRequest');
const { validateUserUpdate } = require('../http/requests/userUpdateRequest');
const { validateUserPhotoUpdate } = require('../http/requests/UserPhotoUpdateRequest');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/home', { title: 'Walletly - Smart Budget Management' });
});

/* GET about page */
router.get('/about', function(req, res, next) {
  res.render('pages/about', { title: 'About Us - Walletly' });
});

/* GET features page */
router.get('/features', function(req, res, next) {
  res.render('pages/features', { title: 'Features - Walletly' });
});

/* GET contact page */
router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { title: 'Contact Us - Walletly' });
});

/* GET register page */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register - Walletly' });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login - Walletly' });
});

/* GET dashboard page */
router.get('/dashboard', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Dashboard - Walletly',
      user: user,
      body: '../pages/index',
      currentPage: 'dashboard'
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Dashboard - Walletly',
      user: req.session.user,
      body: '../pages/index',
      currentPage: 'dashboard'
    });
  }
});

/* GET create category page */
router.get('/create-category', function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('create-category', { title: 'Create Category - Walletly' });
});

/* GET create budget page */
router.get('/create-budget', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const CategoryService = require('../services/CategoryService');
  const CategoryRepository = require('../repositories/CategoryRepository');
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository);
  
  try {
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    res.render('create-budget', { 
      title: 'Create Budget - Walletly',
      categories: categories
    });
  } catch (error) {
    res.render('create-budget', { 
      title: 'Create Budget - Walletly',
      categories: []
    });
  }
});

/* GET create transaction page */
router.get('/create-transaction', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const CategoryService = require('../services/CategoryService');
  const CategoryRepository = require('../repositories/CategoryRepository');
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository);
  
  try {
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    res.render('create-transaction', { 
      title: 'Create Transaction - Walletly',
      categories: categories
    });
  } catch (error) {
    res.render('create-transaction', { 
      title: 'Create Transaction - Walletly',
      categories: []
    });
  }
});

/* GET transactions page */
router.get('/transactions', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const CategoryService = require('../services/CategoryService');
  const CategoryRepository = require('../repositories/CategoryRepository');
  const WalletService = require('../services/WalletService');
  const WalletRepository = require('../repositories/WalletRepository');
  const TransactionService = require('../services/TransactionService');
  const TransactionRepository = require('../repositories/TransactionRepository');
  
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository);
  const walletRepository = new WalletRepository();
  const walletService = new WalletService(walletRepository);
  const transactionRepository = new TransactionRepository();
  const transactionService = new TransactionService(transactionRepository);
  
  try {
    console.log('Session userId:', req.session.userId);
    const user = await userService.getUserById(req.session.userId);
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    const wallets = await walletService.getAllWalletsFromUser(req.session.userId);
    const transactions = await transactionService.getAllTransactionsFromUser(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Transactions - Walletly',
      user: user,
      body: '../pages/transactions',
      currentPage: 'transactions',
      categories: categories,
      wallets: wallets,
      transactions: transactions
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Transactions - Walletly',
      user: req.session.user,
      body: '../pages/transactions',
      currentPage: 'transactions',
      categories: [],
      wallets: [],
      transactions: []
    });
  }
});

/* GET wallet page */
router.get('/wallet', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const WalletService = require('../services/WalletService');
  const WalletRepository = require('../repositories/WalletRepository');
  const walletRepository = new WalletRepository();
  const walletService = new WalletService(walletRepository);
  
  try {
    const user = await userService.getUserById(req.session.userId);
    const wallets = await walletService.getAllWalletsFromUser(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Wallet - Walletly',
      user: user,
      body: '../pages/wallet',
      currentPage: 'wallet',
      wallets: wallets
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Wallet - Walletly',
      user: req.session.user,
      body: '../pages/wallet',
      currentPage: 'wallet',
      wallets: []
    });
  }
});

/* GET goals page */
router.get('/goals', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Goals - Walletly',
      user: user,
      body: '../pages/goals',
      currentPage: 'goals'
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Goals - Walletly',
      user: req.session.user,
      body: '../pages/goals',
      currentPage: 'goals'
    });
  }
});

/* GET budget page */
router.get('/budget', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const CategoryService = require('../services/CategoryService');
  const CategoryRepository = require('../repositories/CategoryRepository');
  const BudgetService = require('../services/BudgetService');
  const BudgetRepository = require('../repositories/BudgetRepository');
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository);
  const budgetRepository = new BudgetRepository();
  const budgetService = new BudgetService(budgetRepository);
  
  try {
    const user = await userService.getUserById(req.session.userId);
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    const budgets = await budgetService.getAllBudgetsFromUser(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Budget - Walletly',
      user: user,
      body: '../pages/budget',
      currentPage: 'budget',
      categories: categories,
      budgets: budgets
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Budget - Walletly',
      user: req.session.user,
      body: '../pages/budget',
      currentPage: 'budget',
      categories: [],
      budgets: []
    });
  }
});

/* GET analytics page */
router.get('/analytics', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Analytics - Walletly',
      user: user,
      body: '../pages/analytics',
      currentPage: 'analytics'
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Analytics - Walletly',
      user: req.session.user,
      body: '../pages/analytics',
      currentPage: 'analytics'
    });
  }
});

/* GET categories page */
router.get('/categories', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const CategoryService = require('../services/CategoryService');
  const CategoryRepository = require('../repositories/CategoryRepository');
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository);
  
  try {
    const user = await userService.getUserById(req.session.userId);
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Categories - Walletly',
      user: user,
      body: '../pages/categories',
      currentPage: 'categories',
      categories: categories
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Categories - Walletly',
      user: req.session.user,
      body: '../pages/categories',
      currentPage: 'categories',
      categories: []
    });
  }
});

/* GET settings page */
router.get('/settings', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Settings - Walletly',
      user: user,
      body: '../pages/settings',
      currentPage: 'settings'
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Settings - Walletly',
      user: req.session.user,
      body: '../pages/settings',
      currentPage: 'settings'
    });
  }
});



/* POST register */
router.post('/register', async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  await authController.register(req, res);
});

/* POST login */
router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  await authController.login(req, res);
});

/* POST logout */
router.post('/logout', (req, res) => {
  authController.logout(req, res);
});

/* POST update profile */
router.post('/update-profile', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    validateUserUpdate(req.body);
    await authController.updateUserProfile(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/* POST update photo */
router.post('/update-photo', upload.single('image'), async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const data = {
      userId: req.session.userId,
      image: req.file ? req.file.filename : null
    };
    validateUserPhotoUpdate(data);
    await authController.updateUserPhoto(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/* POST create category */
router.post('/categories', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const CategoryService = require('../services/CategoryService');
  const CategoryRepository = require('../repositories/CategoryRepository');
  const CategoryController = require('../controllers/CategoryController');
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository);
  const categoryController = new CategoryController(categoryService);
  
  await categoryController.createCategory(req, res);
});

/* POST create budget */
router.post('/budgets', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const BudgetService = require('../services/BudgetService');
  const BudgetRepository = require('../repositories/BudgetRepository');
  const BudgetController = require('../controllers/BudgetController');
  const budgetRepository = new BudgetRepository();
  const budgetService = new BudgetService(budgetRepository);
  const budgetController = new BudgetController(budgetService);
  
  await budgetController.createBudget(req, res);
});

/* POST create wallet */
router.post('/wallets', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const { validateWalletStore } = require('../http/requests/WalletStoreRequest');
  const WalletService = require('../services/WalletService');
  const WalletRepository = require('../repositories/WalletRepository');
  const WalletController = require('../controllers/WalletController');
  
  try {
    validateWalletStore(req.body);
    const walletRepository = new WalletRepository();
    const walletService = new WalletService(walletRepository);
    const walletController = new WalletController(walletService);
    await walletController.createWallet(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/* POST create transaction */
router.post('/transactions', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const { validateTransactionStore } = require('../http/requests/TransactionStoreRequest');
  const TransactionService = require('../services/TransactionService');
  const TransactionRepository = require('../repositories/TransactionRepository');
  const TransactionController = require('../controllers/TransactionController');
  
  try {
    validateTransactionStore(req.body);
    const transactionRepository = new TransactionRepository();
    const transactionService = new TransactionService(transactionRepository);
    const transactionController = new TransactionController(transactionService);
    await transactionController.createTransaction(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;