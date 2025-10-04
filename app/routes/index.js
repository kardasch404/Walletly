var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserService = require('../services/UserService');
const UserRepository = require('../repositories/UserRepository');
const { validateRegister } = require('../http/requests/RegisterRequest');
const { validateLogin } = require('../http/requests/LoginRequest');

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
router.get('/dashboard', function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('dashboard', { 
    title: 'Dashboard - Walletly',
    user: req.session.user 
  });
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

module.exports = router;