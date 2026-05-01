import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Spajanje na MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Povezano s MongoDB bazom"))
    .catch(err => console.error("Greška pri spajanju na MongoDB:", err));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// VAŽNO: Dodajemo /api ispred ruta da se podudara s onim iz Quiz.jsx i vercel.json
// Ruta za Registraciju
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({ error: "Korisnik već postoji." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "Korisnik uspješno kreiran!" });
    } catch (err) {
        res.status(500).json({ error: "Interna greška servera." });
    }
});

// Ruta za Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ username: user.username, message: "Uspješan login!" });
        } else {
            res.status(400).json({ error: "Pogrešan username ili password." });
        }
    } catch (err) {
        res.status(500).json({ error: "Greška prilikom prijave." });
    }
});

// Ovo ostavljamo za lokalni rad, ali Vercel će koristiti export
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
}

// Pošto koristiš "import" na vrhu, moraš koristiti "export default" umjesto module.exports
export default app;