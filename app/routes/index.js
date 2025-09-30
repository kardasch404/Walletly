var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserService = require('../services/UserService');
const UserRepository = require('../repositories/UserRepository');
const registerSchema = require('../requests/RegisterRequest');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Walletly' });
});

/* GET register page */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* POST register */
router.post('/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  await authController.register(req, res);
});

module.exports = router;
