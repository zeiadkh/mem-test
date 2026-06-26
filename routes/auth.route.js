import authController from '../controllers/auth.controller.js';
import express from 'express';
const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authController.isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
});
export default router;
