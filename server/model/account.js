import { Schema, model } from 'mongoose';

// Generuojamas LT banko sąskaitos numeris (LT - šalis, 12 - kontrolinis numeris, 10101 - banko kodas, likę random, kiekvienam klientui skirtingi)
const generateAccountNumber = () => {
    const accountNumber = 'LT1210101' + Math.random().toString().slice(2, 13);
    return accountNumber; 
};

export default model('Accounts', new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true 
    },
    accountNumber: {
        type: String,
        required: true,
        default: generateAccountNumber
    },
    personalCode: {
        type: Number,
        required: true,
        unique: true
    },
    passportPhoto: {
        type: String,
        required: true
    },
    accountsBalance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
    }));