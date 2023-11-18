import React, { useRef } from 'react'
import Cards from './cards'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

const Users = (props) => {
    const [users, setUsers] = useState([]);
    const [total,setTotal]=useState(0);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ domain: "", gender: "" });
    const [available, setAvailable] = useState('');
    const getUsers = async (page) => {
        try {
            props.setProgress(10);
            const url = `http://localhost:4000/api/users?page=${page}&domain=${filters.domain}&gender=${filters.gender}&available=${available}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setUsers(result.data);
                setTotal(result.total);
                props.setProgress(100);
            }
        } catch (error) {
            alert(error);
            props.setProgress(100);
        }
    }
    const deleteUser = async (id) => {
        try {
            props.setProgress(10);
            const url = `http://localhost:4000/api/users/${id}`
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                getUsers(page);
                props.setProgress(100);
            }
        } catch (error) {
            alert(error);
            props.setProgress(100);
        }
    }
    const handleNextClick = async () => {
        getUsers(page + 1);
        setPage(page + 1);
    }
    const handlePrevClick = async () => {
        getUsers(page - 1);
        setPage(page - 1);
        console.log(page);
    }
    useEffect(() => {
        getUsers(1);
        //eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const updateUser = () => {
        ref.current.click();
    }
    const handleclick = (e) => {
        refclose.current.click();
    }
    // const onChange()=>{

    // }
    const filterchange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    const handlecheck=(e)=>{
        console.log(e.target.checked);
        setAvailable(e.target.checked);
    }

    return (
        <>
            <div className='container'>
                <div className='container'>
                    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form class="row g-3">
                                        <div class="col-2">
                                            <label for="userid" class="form-label">User ID</label>
                                            <input type="text" id="userid" class="form-control" aria-label="userid" required />
                                        </div>
                                        <div class="col-5">
                                            <label for="firstname" class="form-label">First Name</label>
                                            <input type="text" class="form-control" id='firstname' aria-label="First name" required />
                                        </div>
                                        <div class="col-5">
                                            <label htmlFor="lastname" className='form-label'>Last Name</label>
                                            <input type="text" id='lastname' class="form-control" aria-label="Last name" required />
                                        </div>
                                        <div className='col-4'>
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id='email' required />
                                        </div>
                                        <div class="col-4">
                                            <label for="gender" class="form-label">Gender</label>
                                            <select id="gender" class="form-select" required>
                                                <option selected>Choose...</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Agender</option>
                                            </select>
                                        </div>
                                        <div class="col-4">
                                            <label for="domain" class="form-label">Domain</label>
                                            <select id="domain" class="form-select" required>
                                                <option selected>Choose...</option>
                                                <option>Sales</option>
                                                <option>Finance</option>
                                                <option>Marketing</option>
                                                <option>IT</option>
                                                <option>Management</option>
                                                <option>UI Designing</option>
                                                <option>Business Development</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <label htmlFor="avatar" className='form-label'>Avatar URL</label>
                                            <input type="text" id='avatar' class="form-control" name='avatar' aria-label="avatar" required />
                                        </div>
                                        <div className='col-12'>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Available
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary my-3">Update User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex my-3'>
                        <input type="search" className='form-control me-2' placeholder='Search User' />
                        <button className='btn btn-outline-info'>Search</button>
                    </div>
                    <div className="row">
                        <div className='col-3 my-3'>
                            <label htmlFor="domain">Domain </label>
                            <select name="domain" id="domain" className=" mb-3 mx-2" onChange={filterchange}>
                                <option value={"null"}>Choose...</option>
                                <option value={"Sales"}>Sales</option>
                                <option value={"Finance"}>Finance</option>
                                <option value={"Marketing"}>Marketing</option>
                                <option value={"IT"}>IT</option>
                                <option value={"Management"}>Management</option>
                                <option value={"UI Designing"}>UI Designing</option>
                                <option value={"Business Development"}>Business Development</option>
                            </select>
                        </div>
                        <div className='col-3 my-3'>
                            <label htmlFor="gender" >Gender </label>
                            <select name="gender" id="gender" className="mb-3 mx-2" onChange={filterchange}>
                                <option value={"null"}  >Choose...</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Agender"}>Agender</option>
                            </select>
                        </div>
                        <div class="col-3 my-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name='available' onClick={handlecheck} id="available"/>
                                <label class="form-check-label" htmlFor="available">
                                    Available
                                </label>
                            </div>
                        </div>
                        <div className='col-3 my-3'>
                            <button className='btn btn-success' onClick={() => { getUsers(page); }}>Apply Filter</button>
                        </div>
                    </div>
                    <div className="row">
                        {
                            users.map((el, idx) => {
                                return <div key={el.id} className='col-md-4'>
                                    <Cards firstname={el.firstname} lastname={el.lastname} id={el.id}
                                        available={el.available} gender={el.gender} email={el.email} domain={el.domain}
                                        avatar={el.avatar} deleteUser={deleteUser} updateUser={updateUser} />
                                </div>
                            })}
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page >= Math.ceil(total/20)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </>
    )
}

export default Users


