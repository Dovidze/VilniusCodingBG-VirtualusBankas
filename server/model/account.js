import { Schema, model } from 'mongoose';

// Generuojamas LT banko sąskaitos numeris
const generateAccountNumber = () => {
    const accountNumber = 'LT12' + Math.random().toString().slice(2, 18);
    return accountNumber; 
};

// Funkcija kuri gražina tam tikrų metų ir mėnesio dienų skaičių
const getDaysInMonth = (year, month) => {
        const nextMonth = new Date(year, month, 1);
        nextMonth.setDate(0);
        return nextMonth.getDate();
    }
// Generuojamas asmens kodas
const generatePersonalCode = () => {

    let menuo = "";
    let metai = "";
    let B = 0;
    let C = 0;

    //Pirmas skaitmuo 1-6
    const A = Math.floor(Math.random() * 6) + 1;

    //Antras ir trečias skaitmuo Gimimo metai 00-99, jei 2000 tai 00-24
    if( A == 5 || A == 6) {
        B = Math.floor(Math.random() * 2);
        if( B == 2) {
            C = Math.floor(Math.random() * 4);
        } else { 
            C = Math.floor(Math.random() * 9); 
        }
    } else {
        B = Math.floor(Math.random() * 9);
        C = Math.floor(Math.random() * 9);
    }
    
    // Ketvirtas ir Penktas skaitmuo mėnesis 01 - 12
    let D = Math.floor(Math.random() * 12) + 1;
    let E = 0;
    if (D > 9) {
        E = D - 10;
        D = 1;
        menuo = D.toString() + E.toString()
    } else {
        E = D
        D = 0
        menuo = E.toString()
    }

    // Nustatomi metai pagal pirma skaičių
    if (A == 1 || A == 2) { 
        metai = '18' + B.toString() + C.toString()
    } else if ( A == 3 || A == 4) {
        metai = '19' + B.toString() + C.toString()
    } else if ( A == 5 || A == 6) {
        metai = '20' + B.toString() + C.toString()
    }

    // Nustatoma kiek dienų turi butent šių metų mėnesis
    let F = Math.floor(Math.random() * getDaysInMonth(parseFloat(metai), parseFloat(menuo))) + 1;
    
    // Šeštas ir septintas skaitmuo diena 01 - Nustatyto kiekio
    let G = 0;
    if( F < 10 ) {
        G = F;
        F = 0;
    } else {
        G = F % 10;
        F = parseInt(F / 10);
    }
    
    //Aštuntas, devintas ir dešimtas skaitmuo sąrašo numeris 001-999
    const H = Math.floor(Math.random() * 9);
    const I = Math.floor(Math.random() * 9);
    let J = 0;
    if (H == 0 && I == 0) {
        J = Math.floor(Math.random() * 9) + 1;
    } else {
        J = Math.floor(Math.random() * 9);
    }

    let K = 0;

    //Formulės paskutiniam venuoliktam skaitmeniui generuoti
    let sum1 = A*1 + B*2 + C*3 + D*4 + E*5 + F*6 + G*7 + H*8 + I*9 + J*1;
    let sum2 = A*3 + B*4 + C*5 + D*6 + E*7 + F*8 + G*9 + H*1 + I*2 + J*3;
    
    //Tikrinama liekana paskutiniam skaitmeniui
    if (sum1 % 11 == 10) {
        if (sum2 % 11 == 10) {
            K = 0;
        } else {
            K = sum2 % 11;
        }
    } else {
        K = sum1 % 11
    }

    // Konvertuojama į String tipą ir gaunamas asmens kodas String formatu
    const asmensKodas = A.toString() + B.toString() + C.toString() + D.toString() + E.toString() + F.toString() + G.toString() + H.toString() + I.toString() + J.toString() + K.toString();
    return asmensKodas;
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
        default: generatePersonalCode 
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