import express from 'express';
import mongoose from 'mongoose';

import account from './controller/account.js';
import user from './controller/user.js';

const app = express();

app.use(express.json());

app.use('/api/account', account);

app.use('/api/user', user);

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/virtualBank');

    app.listen(3000); 
   
    console.log(`Veikia`)
} catch {
    console.log(`Neveikia`)
}