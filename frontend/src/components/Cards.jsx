import React from 'react'

const Cards = (props) => {
    let {firstname,lastname,avatar,gender,domain,email,id,available} = props;
    return (
        <>
            <div className="card mx-4 my-4" style={{ width: "19rem" }}>
                <div className="card-body">
                    <img src={avatar} id={id} alt="Avatar" />
                    <h5 className="card-title">{firstname} {lastname}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">ID - {id}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Domain - {domain}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary"> Gender- {gender}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Email- {email}  </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{!available?'Not':''} Available  </h6>
                         {/* <a href="#" className={`card-link btn btn-primary ${!available?'disabled':''}`} >Add to team</a> */}
                </div>
            </div>
        </>
    )
}

export default Cards

