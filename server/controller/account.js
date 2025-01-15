import { Router } from 'express';
import Account from '../model/account.js';

const router = Router();

// Visos sąskaitos
router.get('/', async (req, res) => {
    try {
        res.json(await Account.find());
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Viena sąskaita
router.get('/:id', async (req, res) => {
    try {
        res.json(await Account.findById(req.params.id));
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Sąskaitos sukūrimas
router.post('/', async (req, res) => {
    try {
        await Account.create(req.body);
        res.json('Sąskaita sėkmingai išsaugota');
    } catch (err){
        res.json(err)
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Sąskaitos redagavimas
router.put('/:id', async (req, res) => {
    try {
        await Account.findByIdAndUpdate(req.params.id, req.body)
        res.json("Sąskaitos balansas sėkmingai atnaujintas");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Sąskaitos ištrinimas
router.delete('/:id', async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.params.id)
        res.json("Sąskaita sėkmingai ištrinta");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

export default router;