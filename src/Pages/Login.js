import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

const Login = () => {
    const navigate = useNavigate()
    const { setIsLoggedIn } = useContext(UserContext)
    const [loginDetail, setLoginDetail] = useState({
        email: "",
        password: ""
    })

    const handleLogin = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLoginDetail({...loginDetail, [name]: value})
    }

    const handleSubmit = async (e) => {        //User Authentication
        e.preventDefault()

        try {
            const res = await fetch('https://reqres.in/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginDetail),
            });
      
            const result = await res.json();
            sessionStorage.setItem('token', result?.token)         //Storing the token
            if (result?.token) navigate("/");
            setIsLoggedIn(true)
          } catch (error) {
            console.error('Error making POST request:', error);
          }
    }

  return (
    <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='loginForm'>
         <input type='email' name="email" onChange={handleLogin} value={loginDetail.email} placeholder='Email'/>
         <input type='text' name="password" onChange={handleLogin} value={loginDetail.password} placeholder='Password' />
         <button className='btn' >Login</button>
         <p className='note'>Note- You can login with mail: <b>eve.holt@reqres.in</b> and password: <b>cityslicka</b> </p>
        </form>
    </>
  )
}

export default Login