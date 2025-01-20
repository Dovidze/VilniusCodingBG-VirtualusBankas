import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [sort, setSort] = useState();

    useEffect(() => {

        const params = {}

        params.sort ='asc'
        if(sort === 'asc' || sort === 'desc')
            params.sort = sort;

        axios.get('/api/account', { params })
        .then(resp => {
          setData(resp.data)
        })
        .catch(err => setAlert({
            message: err.response.data,
            status: 'danger'
        }));
    }, [refresh, sort]);

    //Trinama sąskaita tik tada kai balanasas lygus 0
    const handleDelete = (id) => {
      axios.get('/api/account/' + id)
        .then(resp => {
          if(resp.data.accountsBalance > 0) {
            setAlert({
              message: 'Sąskaita gali būti ištrinta, tik jei balansas yra lygus 0',
              status: 'info'
          });
          }
          else {
            axios.delete('/api/account/' + id)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                
                setRefresh(!refresh);
            })    
            .catch(err => setAlert({
                message: err.response.data,
                status: 'warning'
            }));
          }
        })    
        .catch(err => setAlert({
            message: err.response.data,
            status: 'warning'
        }));

    }

    return (
        <>
            <div className="container">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Sąskaitų sąrašas</h1>
                        <div>
                            <select
                                className="form-select"
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="asc">Pagal Pavardę A-Z</option>
                                <option value="desc">Pagal Pavardę Z-A</option>
                            </select>
                        </div>
                    </div>

                {alert.message && 
                    <div className={"mt-4 alert alert-" + alert.status}>
                        {alert.message}
                    </div>
                }
                </div>
                {alert.status !== 'danger' &&
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>Vardas</th>
                                <th>Pavardė</th>
                                <th>Sąskaitos numeris</th>
                                <th>Balansas</th>
                                <th>Veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value) => 
                                <tr key={value._id}>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.accountNumber}</td>
                                    <td>{value.accountsBalance} €</td>
                                    <td>   
                                        <div className="d-flex gap-3">
                                            <Link 
                                                to={"/add-funds/" + value._id}
                                                className="btn btn-success"
                                            >
                                              Pridėti lėšų
                                            </Link>
                                            <Link 
                                                to={"/deduct-funds/" + value._id}
                                                className="btn btn-warning"
                                            >
                                              Nuskaičiuoti lėšas
                                            </Link>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(value._id)}
                                            >Ištrinti</button>
                                        </div>
                                    </td>                                
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}

export default Home;