
# Virtualus bankas
Baigiamasis darbas

Virtualus bankas – tai aplikacija, leidžianti administruoti vartotojų banko sąskaitas. Projektas padalintas į dvi dalis: Client (kliento sąsaja) ir Server (serverio dalis).



## Projekto funkcionalumas 
#### 👨‍💻 Vartotojai
- Tik prisijungę vartotojai gali naudotis sistema.
- Prisijungimo duomenys išduodami sistemos administratoriaus.

#### 🏦 Banko sąskaitų valdymas
- Sąskaitų sąrašas:
    - Rodomos visos sąskaitos, rūšiuotos pagal savininko pavardę.
    - Galimybė pridėti lėšų arba nuskaičiuoti lėšas.
    - Sąskaitos ištrynimas galimas tik esant nuliniam balansui.
- Naujos sąskaitos kūrimas:
    - Vartotojas įveda vardą, pavardę, unikalų asmens kodą, paso kopijos nuotrauką.
    - Automatiškai generuojamas IBAN formato sąskaitos numeris.
    - Pradinė suma: 0 EUR.
- Lėšų valdymas:
    - Lėšų pridėjimas ir nurašymas.
    - Apsauga nuo neigiamo balanso.

#### 🔒 Saugumas
- Slaptažodžiai saugomi šifruoti.
- Tikrinama asmens kodo unikalumas ir taisyklių atitikimas.

## Naudotos technologijos  

| Dalys         | Technologijos                              |
|---------------|-------------------------------------------|
| **Frontend**  | React, Axios, React Router, Vite          |
| **Backend**   | Node.js, Express, Mongoose, Multer, Bcrypt|
| **Kiti įrankiai** | Postman, MongoDB Compass                |

## Projekto struktūra

#### Naudotos technologijos ir įrankiai
#### - Client (frontend)
- React - vartotojo sąsajai kurti.
- Axios - užklausoms į serverį vygdyti.
- React Router - maršrutizavimui.
- Vite - kaip moderni kūrimo ir statybos priemonė.
#### - Server (backend)
- Express – REST API kūrimui.
- Mongoose – MongoDB duomenų bazės integravimui.
- Multer – failų įkėlimui.
- Nodemon – patogiam serverio paleidimui ir kūrimo metu vykstantiems pokyčiams stebėti.
#### - Kita
- IBAN numerio generavimas pagal lietuviškus standartus.

## Projekto vaizdai 
#### Prisijungimo langas
![PrisijungimoForma](https://github.com/user-attachments/assets/5e7b508d-8c86-405a-aef6-8ba1e260fab5)

#### Sąskaitų sąrašas
![PagrindinsPuslapis](https://github.com/user-attachments/assets/c4f39b2e-abbe-4c8d-bdb4-c766582d753b)

#### Lėšų pridėjimas ir nurašymas
![LesuPridėjimas](https://github.com/user-attachments/assets/9291beb3-d0b8-4316-9c82-fbf07af89bba)
![LesuNuskaitymas](https://github.com/user-attachments/assets/901f3c80-14c2-46ee-936e-55fe0562bc3d)

#### Naujos sąskaitos sukūrimas
![NaujosSukūrimas](https://github.com/user-attachments/assets/2518e86a-b4c3-4b79-a09c-328b198a5d48)

## Įdiegimas
#### 1. Frontend diegimas
``` bash
cd client
npm install
npm run dev
```
#### 2. Backend diegimas

``` bash
cd server
npm install
npm run dev
```
## Autorius
**Dovydas**
- [GitHub](https://github.com/Dovidze)
