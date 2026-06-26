import prisma from '../db/prismaClient.js';
import bcrypt from 'bcrypt';

async function createUser(data) {
    const newUser = await prisma.user.create({
        data: { email: data.email, name: data.name, password: data.password },
    });
    console.log(newUser);
}




const authController = {
    register: (req, res) => {
        console.log(req)
        if (!req.body.email || !req.body.name || !req.body.password || !req.body) {
            return res.status(400).json({ message: 'Email, name, and password are required' });
        }
        const userData = {
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10)
        };
        createUser(userData);
        return res.status(201).json({ message: 'User registered successfully', userData });
        // Registration logic
    },
    login: async (req, res) => {
        try{
            const userData = {
            email: req.body.email,
            password: req.body.password
        };
        console.log(userData, req.body)
        if (!userData.email || !userData.password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const user = await prisma.user.findUnique({
            where: { email: userData.email }
        });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(!bcrypt.compareSync(userData.password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        return res.status(200).json({ message: 'Login successful', user });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message:error.message });
        }
        // Login logic
    }
};

export default authController;
