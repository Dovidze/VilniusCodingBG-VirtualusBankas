import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header/Header';
import DeductFunds from './pages/DeductFunds';
import AddFunds from './pages/AddFunds';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import axios from 'axios';

const App = () => {
    // Vartotojo duomenys kuriuos tikriname
    const [user, setUser] = useState();
    // Kai perkrauname narsykle
    useEffect(() => {
        axios.get('/api/user/check-auth')
            .then(resp => {
                if (resp.data) {
                    setUser(resp.data);
                }
            })
            .catch(err => {
                
            });
    }, []);

    return ( 
        <BrowserRouter>
        <Header user={user} setUser={setUser}/>
        <div className="container">
            <Routes>
                <Route path="/login" element={<Login setUser={setUser}/>} />
                {user  ? ( 
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/add-funds/:id" element={<AddFunds />} />
                            <Route path="/deduct-funds/:id" element={<DeductFunds />} />
                            <Route path="/create-account" element={<CreateAccount />} />
                        </>   
                   ) : (
                    <Route path="*" element={<Login setUser={setUser} />} />
                )}

                <Route path="*" element={<h1>Toks puslapis nerastas</h1>} />
            </Routes>
        </div>
    </BrowserRouter>
    );
}

export default App;