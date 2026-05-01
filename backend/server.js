import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Pametno spajanje na MongoDB (bitno za Vercel serverless funkcije)
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("Povezano s MongoDB bazom");
    } catch (err) {
        console.error("Greška pri spajanju na MongoDB:", err.message);
    }
};

// Osiguraj bazu prije svakog zahtjeva
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// User Model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// --- API RUTE ---

// 1. Registracija
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Sva polja su obavezna." });
        }

        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({ error: "Korisnik već postoji." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "Korisnik uspješno kreiran!" });
    } catch (err) {
        console.error("DEBUG Register:", err);
        res.status(500).json({ error: "Greška na serveru: " + err.message });
    }
});

// 2. Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            // Kreiranje JWT tokena (koristi JWT_SECRET iz Vercel postavki)
            const token = jwt.sign(
                { userId: user._id }, 
                process.env.JWT_SECRET || 'privremena_tajna', 
                { expiresIn: '1h' }
            );

            res.json({ 
                username: user.username, 
                token: token,
                message: "Uspješan login!" 
            });
        } else {
            res.status(400).json({ error: "Pogrešan username ili password." });
        }
    } catch (err) {
        console.error("DEBUG Login:", err);
        res.status(500).json({ error: "Greška na serveru: " + err.message });
    }
});

// Postavke za lokalni rad
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
}

// Export za Vercel
export default app;