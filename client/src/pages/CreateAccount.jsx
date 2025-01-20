import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePersonalCode } from '../helpers/validators.js';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [alert, setAlertState] = useState({});

    const setAlert = (alert) => {
        setAlertState(alert);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const personalCodeInput = e.target.elements.personalCode.value;

        if (!validatePersonalCode(personalCodeInput, setAlert)) {
            return;
        }

        try {
            const checkResponse = await axios.post('/api/account/check-personal-code', { personalCode: personalCodeInput });
            
            if (checkResponse.status === 409) {
                setAlert({
                    message: checkResponse.data.message,
                    status: 'danger',
                });
                return;
            }
        
            // if (checkResponse.status === 200) {
            //     console.log('Asmens kodas tinkamas');
            // }
        } catch (err) {
            setAlert({
                message: err.response?.data.message || 'Įvyko klaida tikrinant asmens kodą',
                status: 'danger',
            });
            return;
        }

        
        try {
            const resp = await axios.post('/api/account', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setAlert({
                message: resp.data,
                status: 'success',
            });

            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            setAlert({
                message: err.response?.data || 'Įvyko klaida kuriant paskyrą.',
                status: 'danger',
            });
        }
    };

    return (
        <>
            <h1 className="mb-5">Naujos sąskaitos sukūrimas</h1>

            {alert.message && 
                <div className={"mt-4 alert alert-" + alert.status}>
                    {alert.message}
                </div>
            }

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className='fw-bold'>Vardas</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="firstName"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='fw-bold'>Pavardė</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="lastName"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='fw-bold'>Asmens kodas</label>
                    <input 
                        type='text'
                        className="form-control" 
                        name="personalCode"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='fw-bold'>Paso nuotraukas</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        name="passportPhoto"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary">Talpinti</button>
                </div>
            </form>
        </>
    );
}

export default CreateAccount;