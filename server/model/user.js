import { Schema, model } from 'mongoose';

export default model('Users', new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    // Laiko Žymų (timestamp) sukūrimas:
    createdAt: {
        type: Date,
        // Dabartinė data ir laikas priskiriamas pagal nutylėjimą:
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
    }));