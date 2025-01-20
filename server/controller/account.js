import { Router } from 'express';
import Account from '../model/account.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { auth } from '../middleware/auth.js';
import account from '../model/account.js';


const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Sukurti direktorija uploads automatiškai, jei jos nėra sukurtos
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
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

// Visos sąskaitos
router.get('/', auth, async (req, res) => {
    try {
        const sortData = {};

        console.log(await account.find())

        if(req.query.sort)
            sortData.lastName = req.query.sort === 'asc' ? 'asc' : 'desc'; 

        // Patikrinkite klaidas čia
        const result = await account.find().sort(sortData);
        res.json(result);
    } catch (err) {
        // console.error("Error: ", err); // Užfiksuokite klaidą į konsolę
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

//Naujos saskaitos sukurimas
router.post('/', auth, upload.single('passportPhoto'), async (req, res) => {
    try {
        const failoKelias = req.file.path;

        const newAccount = {
            ...req.body,
            passportPhoto: failoKelias,
        };

        await Account.create(newAccount);

        res.json('Duomenys sėkmingai išsaugoti');
    } catch (err) {
        console.error(err);
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Sąskaitos redagavimas
router.put('/:id', auth, async (req, res) => {
    try {
        await Account.findByIdAndUpdate(req.params.id, req.body)
        res.json("Sąskaitos balansas sėkmingai atnaujintas");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

// Sąskaitos ištrinimas
router.delete('/:id', auth, async (req, res) => {
    try {
        // Pirmiausia surandame sąskaitą pagal ID
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json('Sąskaita nerasta');
        }

        // Jei yra nuotrauka, pašaliname ją iš serverio - local vieta
        if (account.passportPhoto) {
            const filePath = path.resolve(__dirname, '..', account.passportPhoto);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Nepavyko ištrinti failo:', err);
                }
            });
        }

        // Pašaliname sąskaitą iš duomenų bazės
        await Account.findByIdAndDelete(req.params.id);
        res.json("Sąskaita sėkmingai ištrinta");

    } catch (err) {
        console.error(err);
        res.status(500).json('Įvyko serverio klaida');
    }
});

export default router;