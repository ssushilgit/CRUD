import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
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
  });
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
      // Fetch country list
      axios.get('https://restcountries.com/v3.1/all')
        .then(res => {
          setCountries(res.data.map(country => country.name.common));
        })
        .catch(err => console.log(err));
    }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/users/' + id) // Correct endpoint
      .then(res => {
        setValues(res.data); // Set form values to fetched data
      })
      .catch(err => console.log(err));
  }, [id]); // Add `id` as a dependency

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/users/${id}`, values) // Correct axios.put syntax
      .then(res => {
        console.log(res);
        navigate('/'); // Navigate to home after updating
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Edit User Details</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter updated Name"
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter updated username "
              value={values.username}
              onChange={e => setValues({ ...values, username: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter updated Email"
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone: </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter updated phone number"
              value={values.phone}
              onChange={e => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="dob">DOB: </label>
            <input
              type="date"
              name="dob"
              className="form-control"
              placeholder="Enter updated dob "
              value={values.dob}
              onChange={e => setValues({ ...values, dob: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="Enter updated city "
              value={values.city}
              onChange={e => setValues({ ...values, city: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="district">District: </label>
            <input
              type="text"
              name="district"
              className="form-control"
              placeholder="Enter updated district "
              value={values.district}
              onChange={e => setValues({ ...values, district: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="province">Province:</label>
            <select
              name="province"
              className="form-control"
              value={values.province}
              onChange={e => setValues({ ...values, province: e.target.value })}
            >
              <option value="">Select Province</option>
              <option value="Koshi Province">Koshi Province</option>
              <option value="Madhesh Province">Madhesh Province</option>
              <option value="Bagmati Province">Bagmati Province</option>
              <option value="Gandaki Province">Gandaki Province</option>
              <option value="Lumbini Province">Lumbini Province</option>
              <option value="Karnali Province">Karnali Province</option>
              <option value="Sudurpashchim Province">Sudurpashchim Province</option>
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

          <button type="submit" className="btn btn-success">Update</button>
          <Link to='/' className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
