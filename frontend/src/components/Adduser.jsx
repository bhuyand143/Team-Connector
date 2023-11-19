import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

const Adduser = (props) => {
    const [userdetails, setUserdetails] = useState({id:"",firstname:"",lastname:"",email:"",gender:"",avatar:"",domain:"",available:""});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            props.setProgress(10);
            const url = `https://team-connector.onrender.com/api/users`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(userdetails)
            });
            const json = await response.json();
            if (response.ok) {
                props.setProgress(100);
                alert("User Created Successfully!");
                return redirect('/users');
            }
        } catch (error) {
            alert(error);
            props.setProgress(100);
        }
    }
    const onChange = (e) => {
        setUserdetails({ ...userdetails, [e.target.name]: e.target.value }) // any thing that changes should be replaced with the value which is in name  all others will be same as before
    }
    return (
        <div className='container'>
            <div className='container'>
                <h1 className='my-3'> Add User</h1>
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-2">
                        <label htmlFor="userid" class="form-label">User ID</label>
                        <input type="text" id="userid" class="form-control" name='id' aria-label="userid" onChange={onChange} required />
                    </div>
                    <div class="col-5">
                        <label htmlFor="firstname" class="form-label">First Name</label>
                        <input type="text" class="form-control" id='firstname' name='firstname' onChange={onChange} aria-label="First name" required />
                    </div>
                    <div class="col-5">
                        <label htmlFor="lastname" className='form-label'>Last Name</label>
                        <input type="text" id='lastname' class="form-control" name='lastname'onChange={onChange} aria-label="Last name" required />
                    </div>
                    <div className='col-4'>
                        <label htmlFor="email" class="form-label">Email</label>
                        <input type="email" class="form-control" name='email' id='email'onChange={onChange} required />
                    </div>
                    <div class="col-4">
                        <label htmlFor="gender" class="form-label">Gender</label>
                        <select id="gender" class="form-select" name='gender' onChange={onChange} required>
                            <option selected>Choose...</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Agender"}>Agender</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <label htmlFor="domain" class="form-label">Domain</label>
                        <select id="domain" class="form-select" name='domain' onChange={onChange} required>
                            <option selected>Choose...</option>
                            <option value={"Sales"}>Sales</option>
                            <option value={"Finance"}>Finance</option>
                            <option value={"Marketing"}>Marketing</option>
                            <option value={"IT"}>IT</option>
                            <option value={"Management"}>Management</option>
                            <option value={"UI Designing"}>UI Designing</option>
                            <option value={"Business Development"}>Business Development</option>
                        </select>
                    </div>
                    <div class="col">
                        <label htmlFor="avatar" className='form-label'>Avatar URL</label>
                        <input type="text" id='avatar' class="form-control" name='avatar'onChange={onChange} aria-label="avatar" required />
                    </div>
                    <div className='col-12'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name='available' onChange={onChange} id="available"/>
                            <label class="form-check-label" htmlFor="available">
                                Available
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Add User</button>
                </form>
            </div>
        </div>
    )
}

export default Adduser
