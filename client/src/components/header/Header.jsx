import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = ({ user, setUser }) => {

    const handleLogout = () => {
        axios.get('/api/user/logout')
        .then(resp => {
            setUser(false);
        });
    }
    return ( 
        <header className="text-bg-dark d-flex align-items-center py-3 mb-5">
            <div className="nav nav-pills d-flex justify-content-between align-items-center w-100">
            { user ? 
            <>
                <div className='d-flex'>
                    <div className="d-flex align-items-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white d-flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bank" viewBox="0 0 16 16">
                                    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
                                </svg>
                                <span>LT BANKAS</span>
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex align-items-center">
                        <span>Darbuotojas: {user.login}</span>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className="d-flex">
                        <li className="nav-item " >
                            <Link to="/create-account" className="nav-link text-white d-flex gap-2">
                                <span>Nauja sąskaita</span>
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex">
                        <li className="nav-item " >
                            <Link to="/login" className="nav-link text-white d-flex gap-2" onClick={handleLogout} >
                                <span>Atsijungti</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                            </Link>
                        </li>
                    </div>
                </div>
                </>
                :
                <>
                 <div className="d-flex align-items-center">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link text-white d-flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bank" viewBox="0 0 16 16">
                                <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
                            </svg>
                            <span>LT BANKAS</span>
                        </Link>
                    </li>
                </div>
                </>
                }
            </div>
        </header>
    );
}

export default Header;