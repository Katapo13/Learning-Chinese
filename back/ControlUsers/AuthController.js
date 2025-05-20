const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //для хэширования
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async register(req, res) {
    try {
      const { email, userName, password } = req.body;
      const candidate = await User.findOne({ email });
      
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким email уже существует" });
      }
      
      const hashPassword = bcrypt.hashSync(password, 10);
      const userRole = await Role.findOne({ value: "user" });
      
      const user = new User({
        email,
        userName,
        password: hashPassword,
        roles: [userRole.value]
      });
      
      await user.save();
      
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      
      const token = generateAccessToken(user._id, user.roles);
      
      // возвращаем и токен, и данные пользователя
      return res.json({ 
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.userName,
          roles: user.roles
        }
      });
      
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new authController();