import express from 'express';
import mongoose from 'mongoose';

import account from './controller/account.js';
import user from './controller/user.js';

import session from 'express-session';


const app = express();

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/virtualBank');

    app.listen(3000); 
    console.log(`Veikia`)
} catch {
    console.log(`Neveikia`)
}


app.set('trust proxy', 1) 
    // Sesijos konfiguracija:
    app.use(session({
    secret: 'Slapta unikali frazė',
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.json());

app.use('/api/account', account);
app.use('/api/user', user);
