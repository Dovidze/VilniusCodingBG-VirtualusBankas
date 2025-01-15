import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { extractFormData } from '../helpers/util.js';

const AddFunds = () => {
    const [data, setData] = useState({});
    const [alert, setAlert] = useState({});
    const [balance, setBalance] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('/api/account/' + id)
        .then(resp => setData({
            ...resp.data,
            accountsBalance: resp.data.accountsBalance
        }))
        .catch(err => setAlert({
            message: err.response.data,
            status: 'danger'
        }));
    }, []);
    
    //Tikrinama Input lauko reikšmė
    const handleInputChange = (e) => {
        let value = e.target.value;

        value = value.replace(',', '.');

        if (value === '' || /^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
            setBalance(value);
        }
    };


    //Pridedama ivesta reikšmė prie senos, ir atnaujinama duomenų bazėje
    const handleSubmit = (e) => {
        e.preventDefault();        
        
        const formData = extractFormData(e.target);
        
        const newBalance = parseFloat(data.accountsBalance) + parseFloat(formData.accountsBalance);
        const updatedData = { ...formData, accountsBalance: newBalance };

        axios.put('/api/account/' + id, updatedData)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            });
            
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
            <div className="container">
                <h1 className='text-success'>Lėšų pridėjimas</h1>

                {alert.message && 
                    <div className={"mt-4 alert alert-" + alert.status}>
                        {alert.message}
                    </div>
                }
                {alert.status !== 'danger' &&
                    <div>
                        <table className="table mt-4">
                            <thead>
                                <tr>
                                    <th>Vardas</th>
                                    <th>Pavardė</th>
                                    <th>Sąskaitos numeris</th>
                                    <th>Balansas</th>
                                    <th>Pridedamų lėšų kiekis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.firstName}</td>
                                    <td>{data.lastName}</td>
                                    <td>{data.accountNumber}</td>
                                    <td>{data.accountsBalance} €</td>
                                    <td>
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    name="accountsBalance"
                                                    onInput={handleInputChange}
                                                    value={balance}
                                                    required 
                                                    defaultValue={data.accountsBalance}
                                                />
                                                <button className="btn btn-success">Pridėti</button>
                                            </div>
                                        </form>
                                    </td>                       
                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-end'>
                            <Link 
                                to={"/"}
                                className="btn btn-primary"
                            >
                                Grįžti
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default AddFunds;