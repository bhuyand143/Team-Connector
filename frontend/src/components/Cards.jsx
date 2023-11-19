import React, { useState } from 'react'

const Cards = (props) => {
    let { updateUser, deleteUser, user, addtoTeam,team} = props;
    return (
        <>
            <div className="card mx-4 my-4" style={{ width: "19rem" }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className={`badge rounded-pill bg-primary ${team.includes(user)?'':'d-none'}`} style={{ zIndex: '1', left: '90%' }}>
                        Selected
                    </span>
                </div>
                <div className="card-body">
                    <img src={user.avatar} id={user.id} alt="Avatar" />
                    <h5 className="card-title">{user.firstname} {user.lastname}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">ID - {user.id}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Domain - {user.domain}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary"> Gender- {user.gender}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Email- {user.email}  </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{!user.available ? 'Not' : ''} Available  </h6>
                    <i className="fa-solid fa-trash mx-2" onClick={() => { deleteUser(user.id); }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateUser(user); }}></i>
                    <button className={`btn btn-sm btn-primary mx-4 ${team.includes(user)?'disabled':''}`} onClick={() => { addtoTeam(user); }} >{team.includes(user)?'Added to team':'Add to team'}</button>
                    {/* <a href="#" className={`card-link btn btn-primary ${!available?'disabled':''}`} >Add to team</a> */}
                </div>
            </div>
        </>
    )
}

export default Cards

