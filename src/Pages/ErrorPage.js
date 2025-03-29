import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const ErrorPage = () => {
  return (
    <div className='App'>

        <Header />
        <h1> Looks Likes an error.</h1>
        <h2> Go to <Link to="/">Users List</Link></h2>
        
    </div>
  )
}

export default ErrorPage