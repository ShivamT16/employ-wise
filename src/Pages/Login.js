import React, { useState } from 'react'

const Login = () => {

    const [loginDetail, setLoginDetail] = useState({
        email: "",
        password: ""
    })
    // const [response, setResponse] = useState('')

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
          } catch (error) {
            console.error('Error making POST request:', error);
          }
    }

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <input type='email' name="email" onChange={handleLogin} value={loginDetail.email} placeholder='Email'/>
        <input type='text' name="password" onChange={handleLogin} value={loginDetail.password} placeholder='Password' />
        <button>Login</button>
        </form>
    </div>
  )
}

export default Login