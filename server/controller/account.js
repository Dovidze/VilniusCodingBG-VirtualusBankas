import { Router } from 'express';
import Account from '../model/account.js';
import multer from 'multer';
import fs from 'fs';

const router = Router();

//Sukurti direktorija uploads automatiškai, jei jos nėra sukurtos
const path = './uploads';
if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
    console.log('Direktorija paso nuotraukoms sukurta automatiškai.');
}

//Failo vieta ir pavadinimas kai jis bus išsaugotas
const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads');
    },
    filename: function (req, file, next) { 
        next(null, Date.now() + '.jpg');
    }
});

const upload = multer({ storage: storage });


//Nuotraukos ikelimas naudojant multer
router.post('/upload', upload.single('nuotrauka'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.json('POST metodu duomenys gauti');
});

// Visos sąskaitos
router.get('/', async (req, res) => {
    try {
        res.json(await Account.find());
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

//Tikrinamas asmens kodas
router.post('/check-personal-code', async (req, res) => {
    try {
        const { personalCode } = req.body;
        const existingAccount = await Account.findOne({ personalCode });
        if (existingAccount) {
            return res.status(409).json({ message: 'Toks asmens kodas jau yra sistemoje' });
        }

        return res.status(200).json({ message: 'Asmens kodas tinkamas' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Klaida tikrinant asmens kodą' });
    }
});


//Viena sąskaita
router.get('/:id', async (req, res) => {
    try {
        res.json(await Account.findById(req.params.id));
    } catch {
        res.status(500).json('Įvyko serverio klaidas');
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