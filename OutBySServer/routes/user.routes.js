const router = require('express').Router()
const User = require('../models/User.model')
const { isAuthenticated, extractUserId } = require('../middlewares/jwt.middleware')

const {
  getUsers,
  getUserProfile,
  updateUserData,
  deleteUser,
} = require('../controllers/userController')

router.use(isAuthenticated);
router.use(extractUserId);

router.get('/', getUsers)
router.get('/:userId', getUserProfile)

router.put('/', updateUserData)

router.delete('/', deleteUser)

module.exports = router
