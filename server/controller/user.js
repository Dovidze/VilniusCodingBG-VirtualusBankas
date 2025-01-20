import { Router } from 'express';
import User from '../model/user.js';
import { auth } from '../middleware/auth.js';
import bcrypt from 'bcrypt';

const router = Router();

// Visi vartotojai
router.get('/', async (req, res) => {
    try {
        res.json(await User.find());
    } catch {
        res.status(501).json('Įvyko serverio klaida');
    }
});

//Vienas vartotojas
// router.get('/:id', async (req, res) => {
//     try {
//         res.json(await User.findById(req.params.id));
//     } catch {
//         res.status(500).json('Įvyko serverio klaida');
//     }
// });

router.post('/login', async (req, res) => { 
    if(!req.body.login || !req.body.password)
        return res.status(500).json('Negauti prisijungimo duomenys');

    const data = await User.findOne({ login: req.body.login });
    
    if(!data) 
        return res.status(401).json('Neteisingi prisijungimo duomenys');

    if(!await bcrypt.compare(req.body.password, data.password)) 
        return res.status(401).json('Neteisingi prisijungimo duomenys');
    
    req.session.user = {
        login: data.login,
    };

    res.json(req.session.user);
});

router.get('/check-auth', auth, (req, res) => {
    res.json(req.session.user);
  
});

router.get('/logout', auth, (req, res) => {
    // Sesijos duomenų ištrynimas
    req.session.destroy();

    res.json("Sėkmingai atsijungėte");
});

// Vartotojo sukurimas
router.post('/', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.create(req.body);

        res.json('Vartotojas sėkmingai užregistruotas');
    } catch (e) {
        //Unikalumo tikrinimas
        if (e.code === 11000 && e.keyValue && e.keyValue.login) {
            res.status(409).json(`Vartotojas "${e.keyValue.login}" jau egzistuoja. Pasirinkite kitą.`);
        } else {
            //Kita klaida
            res.status(500).json('Įvyko serverio klaida');
        }
    }
});

// Vartotojo redagavimas
router.put('/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.json("Vartotojas sėkmingai atnaujintas");
    } catch {
        res.status(501).json('Įvyko serverio klaida');
    }
});

// Vartotojo istrynimas
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json("Vartotojas sėkmingai ištrintas");
    } catch {
        res.status(501).json('Įvyko serverio klaida');
    }
});

export default router;