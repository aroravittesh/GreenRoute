import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmailOrId } from '../models/userModel.js';

export const signup = async (req, res) => {
  try {
    console.log("📥 Received signup data:", req.body);
    const { name, email, employee_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, employee_id, hashedPassword);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await findUserByEmailOrId(identifier);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};