import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractFormData } from '../helpers/util.js';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = extractFormData(e.target);
        
        axios.post('/api/account', data)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            });
            
            // Peradresavimo kūrimas
            setTimeout(() => {
                navigate('/');
            }, 1500);
        })
        .catch(err => setAlert({
            message: err.response.data,
            status: 'danger'
        }));
    }

    return (
        <>
            <h1 className="mb-5">Naujos sąskaitos sukūrimas</h1>

            {alert.message && 
                <div className={"mt-4 alert alert-" + alert.status}>
                    {alert.message}
                </div>
            }

            <form onSubmit={handleSubmit}>
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
                        type="text" 
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