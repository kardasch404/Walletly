var express = require('express');
var router = express.Router();

// Controllers
const AuthController = require('../controllers/AuthController');
const CategoryController = require('../controllers/CategoryController');
const BudgetController = require('../controllers/BudgetController');
const WalletController = require('../controllers/WalletController');
const TransactionController = require('../controllers/TransactionController');

// Services
const UserService = require('../services/UserService');
const CategoryService = require('../services/CategoryService');
const BudgetService = require('../services/BudgetService');
const WalletService = require('../services/WalletService');
const TransactionService = require('../services/TransactionService');

// Repositories
const UserRepository = require('../repositories/UserRepository');
const CategoryRepository = require('../repositories/CategoryRepository');
const BudgetRepository = require('../repositories/BudgetRepository');
const WalletRepository = require('../repositories/WalletRepository');
const TransactionRepository = require('../repositories/TransactionRepository');

// Request Validations
const { validateRegister } = require('../http/requests/RegisterRequest');
const { validateLogin } = require('../http/requests/LoginRequest');
const { validateUserUpdate } = require('../http/requests/userUpdateRequest');
const { validateUserPhotoUpdate } = require('../http/requests/UserPhotoUpdateRequest');
const { validateUserUpdatePassword } = require('../http/requests/UserUpdatePasswordRequest');
const { validateCategoryStore } = require('../http/requests/CategoryStoreRequest');
const { validateBudgetStore } = require('../http/requests/BudgetStoreRequest');
const { validateWalletStore } = require('../http/requests/WalletStoreRequest');
const { validateTransactionStore } = require('../http/requests/TransactionStoreRequest');

const multer = require('multer');
const path = require('path');

// Multer configuration
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

// Initialize dependencies
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const budgetRepository = new BudgetRepository();
const budgetService = new BudgetService(budgetRepository);
const budgetController = new BudgetController(budgetService);

const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(walletService);

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

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
    const recentTransactions = await transactionService.getRecentTransactions(req.session.userId);
    const totalIncome = await transactionService.getTotalIncome(req.session.userId);
    const totalExpense = await transactionService.getTotalExpense(req.session.userId);
    const totalBalance = await transactionService.getTotalBalance(req.session.userId);
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    const budgets = await budgetService.getAllBudgetsFromUser(req.session.userId);
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    
    res.render('dashboard/layouts/main', { 
      title: 'Dashboard - Walletly',
      user: user,
      body: '../pages/index',
      currentPage: 'dashboard',
      recentTransactions: recentTransactions,
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      totalBalance: totalBalance,
      monthlyData: monthlyData,
      budgets: budgets,
      categories: categories
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Dashboard - Walletly',
      user: req.session.user,
      body: '../pages/index',
      currentPage: 'dashboard',
      recentTransactions: [],
      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0,
      monthlyData: [],
      budgets: [],
      categories: []
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

/*---------------------- GET create transaction page -------------------------- */
// -----------------------------------------------------------------------------


/* GET transactions page */
router.get('/transactions', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    const wallets = await walletService.getAllWalletsFromUser(req.session.userId);
    const transactions = await transactionService.getAllTransactionsFromUser(req.session.userId);
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Transactions - Walletly',
      user: user,
      body: '../pages/transactions',
      currentPage: 'transactions',
      categories: categories,
      wallets: wallets,
      transactions: transactions,
      monthlyData: monthlyData
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Transactions - Walletly',
      user: req.session.user,
      body: '../pages/transactions',
      currentPage: 'transactions',
      categories: [],
      wallets: [],
      transactions: [],
      monthlyData: []
    });
  }
});

/* GET wallet page */
router.get('/wallet', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    const wallets = await walletService.getAllWalletsFromUser(req.session.userId);
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Wallet - Walletly',
      user: user,
      body: '../pages/wallet',
      currentPage: 'wallet',
      wallets: wallets,
      monthlyData: monthlyData
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Wallet - Walletly',
      user: req.session.user,
      body: '../pages/wallet',
      currentPage: 'wallet',
      wallets: [],
      monthlyData: []
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
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Goals - Walletly',
      user: user,
      body: '../pages/goals',
      currentPage: 'goals',
      monthlyData: monthlyData
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Goals - Walletly',
      user: req.session.user,
      body: '../pages/goals',
      currentPage: 'goals',
      monthlyData: []
    });
  }
});

/* GET budget page */
router.get('/budget', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    const budgets = await budgetService.getAllBudgetsFromUser(req.session.userId);
    const wallets = await walletService.getAllWalletsFromUser(req.session.userId);
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Budget - Walletly',
      user: user,
      body: '../pages/budget',
      currentPage: 'budget',
      categories: categories,
      budgets: budgets,
      wallets: wallets,
      monthlyData: monthlyData
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Budget - Walletly',
      user: req.session.user,
      body: '../pages/budget',
      currentPage: 'budget',
      categories: [],
      budgets: [],
      wallets: [],
      monthlyData: []
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
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Analytics - Walletly',
      user: user,
      body: '../pages/analytics',
      currentPage: 'analytics',
      monthlyData: monthlyData
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Analytics - Walletly',
      user: req.session.user,
      body: '../pages/analytics',
      currentPage: 'analytics',
      monthlyData: []
    });
  }
});

/* GET categories page */
router.get('/categories', async function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await userService.getUserById(req.session.userId);
    const categories = await categoryService.getAllCategoriesFromUser(req.session.userId);
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Categories - Walletly',
      user: user,
      body: '../pages/categories',
      currentPage: 'categories',
      categories: categories,
      monthlyData: monthlyData
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Categories - Walletly',
      user: req.session.user,
      body: '../pages/categories',
      currentPage: 'categories',
      categories: [],
      monthlyData: []
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
    const monthlyData = await transactionService.getMonthlyData(req.session.userId);
    res.render('dashboard/layouts/main', { 
      title: 'Settings - Walletly',
      user: user,
      body: '../pages/settings',
      currentPage: 'settings',
      monthlyData: monthlyData
    });
  } catch (error) {
    res.render('dashboard/layouts/main', { 
      title: 'Settings - Walletly',
      user: req.session.user,
      body: '../pages/settings',
      currentPage: 'settings',
      monthlyData: []
    });
  }
});



// ============= POST ROUTES =============

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

/* GET logout */
router.get('/logout-get', (req, res) => {
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
  
  try {
    validateCategoryStore(req.body);
    await categoryController.createCategory(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/* POST create budget */
router.post('/budgets', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    validateBudgetStore(req.body);
    await budgetController.createBudget(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/* POST create wallet */
router.post('/wallets', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    validateWalletStore(req.body);
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
  
  try {
    validateTransactionStore(req.body);
    await transactionController.createTransaction(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/* POST update password */
router.post('/update-password', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    validateUserUpdatePassword(req.body);
    await authController.updatePassword(req, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});



module.exports = router;