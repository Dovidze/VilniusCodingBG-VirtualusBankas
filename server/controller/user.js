import { Router } from 'express';
import User from '../model/user.js';

const router = Router();

// Visi vartotojai
router.get('/', async (req, res) => {
    try {
        res.json(await User.find());
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Vienas vartotojas
router.get('/:id', async (req, res) => {
    try {
        res.json(await User.findById(req.params.id));
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Vartotojo sukurimas
router.post('/', async (req, res) => {
    try {
        await User.create(req.body);
        res.json('Įrašas sėkmingai išsaugotas');
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Vartotojo redagavimas
router.put('/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.json("Vartotojas sėkmingai atnaujintas");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Vartotojo istrynimas
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json("Vartotojas sėkmingai ištrintas");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

export default router;