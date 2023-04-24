import React, { useState } from 'react'
import {useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Signup() {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

  let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials!")
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("https://www.masalabox.com/wp-content/uploads/2022/05/pexels-engin-akyurt-2347311-scaled.jpg")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
      <div className='container' >
        <form onSubmit={HandleSubmit}>
          <div className='mb-3'>
            <label htmlFor="exampleInputName1" className="form-label"><b>Name</b></label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"><b>Email address</b></label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
              <label htmlFor="address" className="form-label"><b>Address</b></label>
              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='Click below for fetching address' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <div className="mb-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
            </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
        </form>
      </div>
    </div>
  )
}
