import React, { useEffect, useState } from 'react'
import Cards from './cards';
import { Link } from 'react-router-dom';


const Teams = (props) => {
    const [teams, setTeams] = useState([]);
    const getTeam = async () => {
        try {
            props.setProgress(10);
            const url = `https://team-connector.onrender.com/api/team`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const result = await response.json();
                setTeams(result.data);
                // if (teams.length == 0)
                //     alert('No teams Present!');
                props.setProgress(100);
            }
        } catch (error) {
            alert(error);
            props.setProgress(100);
        }
    }

    useEffect(() => {
        getTeam();
        //eslint-disable-next-line
    }, [])
    return (
        <div className='container'>
            {
                teams.length?teams.map((team) => {
                    return (
                        <div className='row'>
                            <div className='col-3 my-3'>
                                <div class="card" style={{ width: '18rem' }}>
                                    <div class="card-body">
                                        <h5 class="card-title">Team ID-{team.id}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">Team Name-{team.name}</h6>
                                        <h4 className='card-subtitle mb-2 text-muted'>Members</h4>
                                        <ul>
                                            {
                                                team.members.map(user => {
                                                    return <li>{user.firstname} {user.lastname}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }): <h1 className='text-center text-muted'>No Teams Present</h1>
            }
        </div>
    )
}

export default Teams