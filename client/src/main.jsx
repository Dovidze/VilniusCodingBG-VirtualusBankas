import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header/Header';
import DeductFunds from './pages/DeductFunds';
import AddFunds from './pages/AddFunds';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-funds/:id" element={<AddFunds />} />
        <Route path="/deduct-funds/:id" element={<DeductFunds />} />

        <Route path="*" element={<h1>Toks puslapis nerastas</h1>} />
      </Routes>
    </div>
  </BrowserRouter>
)

// CRUD
// CREATE 
// READ
// UPDATE
// DELETE