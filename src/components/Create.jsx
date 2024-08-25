import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Create = () => {
    const [values, setValues] = useState({
        profilePicture: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        dob: '',
        city: '',
        district: '',
        province: '',
        country: 'Nepal' // default to Nepal
    })
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch country list
        axios.get('https://restcountries.com/v3.1/all')
          .then(res => {
            setCountries(res.data.map(country => country.name.common));
          })
          .catch(err => console.log(err));
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/users', values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }
    const handleFileChange = (e) => {
        setValues({ ...values, profilePicture: e.target.files[0] });
    };

    return (
        <div className='d-flex mt-5 w-100 vh-100 justify-content-center align-items-center '>
            <div className="border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Add a User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Name'
                            onChange={e => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name='username' className='form-control' placeholder='Enter Username'
                            onChange={e => setValues({ ...values, username: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' className='form-control' placeholder='Enter Email'
                            onChange={e => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name='phone' className='form-control' placeholder='Enter Phone'
                            onChange={e => setValues({ ...values, phone: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="dob">DOB:</label>
                        <input type="date" name='dob' className='form-control'
                            onChange={e => setValues({ ...values, dob: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="city">City:</label>
                        <input type="text" name='city' className='form-control' placeholder='Enter City'
                            onChange={e => setValues({ ...values, city: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="district">District:</label>
                        <input type="text" name='district' className='form-control' placeholder='Enter District'
                            onChange={e => setValues({ ...values, district: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="province">Province:</label>
                        <select name='province' className='form-control'
                            onChange={e => setValues({ ...values, province: e.target.value })}>
                            <option value="">Select Province</option>
                            <option value="Province 1">Koshi Province</option>
                            <option value="Province 2">Madhesh Province</option>
                            <option value="Province 3">Bagmati Province</option>
                            <option value="Province 4">Gandaki Province</option>
                            <option value="Province 5">Lumbini Province</option>
                            <option value="Province 6">Karnali Province</option>
                            <option value="Province 7">Sudurpashchim Province</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="country">Country:</label>
                        <select name='country' className='form-control' 
                        value={values.country}
                            onChange={e => setValues({ ...values, country: e.target.value })}>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="profilePicture">Profile Picture:</label>
                        <input type="file" name='profilePicture' className='form-control'
                            onChange={handleFileChange} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to='/' className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Create