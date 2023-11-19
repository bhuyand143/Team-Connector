import React, { useRef } from 'react'
import Cards from './cards'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

const Users = (props) => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ domain: "", gender: "" });
    const [available, setAvailable] = useState('');
    const [userdetails, setUserdetails] = useState({ id: "", firstname: "", lastname: "", email: "", gender: "", avatar: "", domain: "", available: "" });
    const [searchText, setSearchText] = useState("");
    const [serachTimeout, setSerachTimeout] = useState(null);
    const [team, setTeam] = useState([]);
    const getUsers = async (page) => {
        try {
            props.setProgress(10);
            const url = `https://team-connector.onrender.com/api/users?page=${page}&domain=${filters.domain}&gender=${filters.gender}&available=${available}`
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
                // if(users.length==0)
                // alert('No User Present!');
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
            const url = `https://team-connector.onrender.com/api/users/${id}`
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
    const updateUser = (currentUser) => {
        ref.current.click();
        setUserdetails(currentUser);
    }
    const addtogroup = async (el) => {
        if (team.length < 4) {
            if (!team.includes(el)) {
                setTeam(team.concat(el));
            }
            else {
                alert('User already added to team!');
            }
        }
        else {
            alert('Maximum 4 members');
        }
    }
    const handlecreategroup = async (e) => {
        if (team.length <= 1) {
            alert('Please add more members');
        }
        else {
            let domain = new Set();
            let f = false;
            for (let t of team) {
                domain.add(t.domain);
                if (!t.available) {
                    alert('Please select Again ,One or more user is not available!');
                    setTeam([]);
                    f = true;
                }
            }
            if (!f) {
                if (domain.size >= 2) {
                    alert('Please select Again ,Multiple Domain!');
                    setTeam([]);
                }
                else {
                    let teamID = prompt('Give a team ID');
                    while (!teamID.trim())
                        teamID = prompt('Please enter a non-empty value:');

                    let teamname = prompt('Give a team name');
                    while (!teamname.trim())
                        teamname = prompt('Please enter a non-empty value:');
                    let teammembers = [];
                    for (let t of team) {
                        teammembers.push(t);
                    }
                    try {
                        props.setProgress(10);
                        const url = `https://team-connector.onrender.com/api/team/`
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            }, body: JSON.stringify({ id: parseInt(teamID), name: teamname, members: teammembers })
                        });
                        if (response.ok) {
                            const result = await response.json();
                            console.log(result);
                            alert('Group Created Succesfully!');
                            getUsers(page);
                            props.setProgress(100);
                        }
                    } catch (error) {
                        alert(error);
                        props.setProgress(100);
                    }
                }
            }
        }
    }

    const handleclick = async (e) => {
        refclose.current.click();
        try {
            props.setProgress(10);
            const url = `https://team-connector.onrender.com/api/users/${userdetails.id}`
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(userdetails)
            });
            const json = await response.json();
            if (response.ok) {
                props.setProgress(100);
                alert("User updated Successfully!");
                getUsers(page);
            }
        } catch (error) {
            alert(error);
            props.setProgress(100);
        }
    }
    const onChange = (e) => {
        setUserdetails({ ...userdetails, [e.target.name]: e.target.value });
    }
    const handleeditCheck = (e) => {
        setUserdetails({ ...userdetails, [e.target.name]: e.target.checked });
    }
    const filterchange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    const handlecheck = (e) => {
        console.log(e.target.checked);
        setAvailable(e.target.checked);
    }

    const handleSearch = (e) => {
        clearTimeout(serachTimeout);
        setSearchText(e.target.value);
        // console.log(searchText);
        setSerachTimeout(
            setTimeout(() => {
                const searchedUsers = total.filter(
                    (user) =>
                        (user.firstname + ' ' + user.lastname).toLowerCase().includes(searchText.toLowerCase())
                );
                setUsers(searchedUsers);
            }, 500)
        );
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
                                            <label htmlFor="userid" class="form-label">User ID</label>
                                            <input type="text" id="userid" class="form-control" name='id' aria-label="userid" onChange={onChange} value={userdetails.id} disabled />
                                        </div>
                                        <div class="col-5">
                                            <label htmlFor="firstname" class="form-label">First Name</label>
                                            <input type="text" class="form-control" id='firstname' name='firstname' onChange={onChange} value={userdetails.firstname} aria-label="First name" required />
                                        </div>
                                        <div class="col-5">
                                            <label htmlFor="lastname" className='form-label'>Last Name</label>
                                            <input type="text" id='lastname' class="form-control" name='lastname' onChange={onChange} value={userdetails.lastname} aria-label="Last name" required />
                                        </div>
                                        <div className='col-4'>
                                            <label htmlFor="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" name='email' id='email' onChange={onChange} value={userdetails.email} required />
                                        </div>
                                        <div class="col-4">
                                            <label htmlFor="gender" class="form-label">Gender</label>
                                            <select id="gender" class="form-select" name='gender' onChange={onChange} value={userdetails.gender} required>
                                                <option selected>Choose...</option>
                                                <option value={"Male"}>Male</option>
                                                <option value={"Female"}>Female</option>
                                                <option value={"Agender"}>Agender</option>
                                            </select>
                                        </div>
                                        <div class="col-4">
                                            <label htmlFor="domain" class="form-label">Domain</label>
                                            <select id="domain" class="form-select" name='domain' onChange={onChange} value={userdetails.domain} required>
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
                                            <input type="text" id='avatar' class="form-control" name='avatar' onChange={onChange} value={userdetails.avatar} aria-label="avatar" required />
                                        </div>
                                        <div className='col-12'>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name='available' onClick={handleeditCheck} checked={userdetails.available} id="available" />
                                                <label class="form-check-label" htmlFor="available">
                                                    Available
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button ref={refclose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary my-3" onClick={handleclick}>Update User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex my-4 mt-5'>
                        <input type="search" className='form-control me-2' placeholder='Search User' name='searchText' onChange={handleSearch} />
                    </div>
                    <div className="row">
                        <div className='col-3 my-3'>
                            <label htmlFor="domain">Domain </label>
                            <select name="domain" id="domain" className=" mb-3 mx-2" onChange={filterchange}>
                                <option value={"null"}>All</option>
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
                                <option value={"null"}  >All</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Agender"}>Agender</option>
                            </select>
                        </div>
                        <div class="col-2 my-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name='available' onClick={handlecheck} id="available" />
                                <label class="form-check-label" htmlFor="available">
                                    Available
                                </label>
                            </div>
                        </div>
                        <div className='col-2 my-3'>
                            <button className='btn btn-success' onClick={() => { getUsers(page); }}>Apply Filter</button>
                        </div>
                        <div className='col-2 my-3'>
                            <button className='btn btn-info' onClick={handlecreategroup}>Create Group</button>
                        </div>
                    </div>
                    <div className="row">
                        {
                           users.length?users.map((el, idx) => {
                                return <div key={el.id} className='col-md-4'>
                                    <Cards deleteUser={deleteUser} updateUser={updateUser} user={el} addtoTeam={addtogroup} team={team}/>
                                </div>
                            }):<h1 className='text-center text-muted'>No Users Present</h1>
                        }
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page >= Math.ceil(1000 / 20)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </>
    )
}

export default Users


