import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';


const Read = () => {
  const [data, setData] = useState([]);
  const {id} =useParams();
    
  useEffect(() => {
      axios.get('http://localhost:3000/users/' +id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Details of the users</h1>
        <div className="mb-2">
          <strong>Name: </strong> {data.name}
        </div>
        <div className="mb-2">
          <strong>Username: </strong> {data.username}
        </div>
        <div className="mb-2">
          <strong>Email: </strong> {data.email}
        </div>
        <div className="mb-2">
          <strong>Phone: </strong> {data.phone}
        </div>
        <div className="mb-2">
          <strong>Date of Birth:  </strong>{data.dob}
        </div>
        <div className="mb-2">
          <strong>City: </strong> {data.city}
        </div>
        <div className="mb-2">
          <strong>District: </strong> {data.district}
        </div>
        <div className="mb-2">
          <strong>Province: </strong> {data.province}
        </div>
        <div className="mb-2">
          <strong>Country: </strong> {data.country}
        </div>
        <Link to ={`/update/${id}`} className='btn btn-success'>Edit</Link>
        <Link to='/' className='btn btn-primary ms-3'>Back</Link>

      </div>

    </div>
  )
}

export default Read