import React from 'react'
import Cards from './cards'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

const Users = (props) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [Domain, setDomain] = useState(null);
    const [gender, setGender] = useState(null);
    const getUsers = async (page) => {
        try {
            props.setProgress(10);
            const url = `http://localhost:4000/api/users?page=${page}`
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
                props.setProgress(100);
            }
        } catch (error) {
            alert(error);
            props.setProgress(100);
        }
    }
    const handleNextClick = async () => {
        getUsers(page+1);
        setPage(page + 1);
    }
    const handlePrevClick = async () => {
        getUsers(page-1);
        setPage(page - 1);
        console.log(page);
    }
    useEffect(() => {
        getUsers(1);
        //eslint-disable-next-line
    }, [])
    return (
        <>
            <div className='container'>
                <div className='container'>
                    <div className="row">
                        {
                            users.map((el, idx) => {
                                return <div key={el.id} className='col-md-4'>
                                    <Cards firstname={el.firstname} lastname={el.lastname} id={el.id}
                                        available={el.available} gender={el.gender} email={el.email} domain={el.domain}
                                        avatar={el.avatar} />
                                </div>
                            })}
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 0} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page >= 49} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </>
    )
}

export default Users


