import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=' d-flex  text-center text-white bg-dark' id="outer">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column ">
        <div className='mt-auto'>
          <main class="px-3">
            <h1>Team Connector!</h1>
            <p>Add the users to make the team!</p>
            <Link to="/users" class="btn btn-lg btn-secondary bg-white">View Users</Link>
          </main>
        </div>
        <footer class="mt-auto text-white-50">
          <p>&copy;2023</p>
        </footer>
      </div>
    </div>
  )
}

export default Home