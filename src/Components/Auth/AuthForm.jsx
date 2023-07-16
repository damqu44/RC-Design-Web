import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

import classes from './AuthForm.module.css'

const AuthForm = () => {
  // const [registerUsername, setRegisterUsername] = useState('')
  // const [registerPassword, setRegisterPassword] = useState('')
  // const [registrationError, setRegistrationError] = useState('')
  const [loginError, setLoginError] = useState('')
  const {
    setIsLogged,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
  } = useContext(AuthContext)

  useEffect(() => {
    // Check local storage for authentication token or session information
    const token = localStorage.getItem('token')
    if (token) {
      setIsLogged(true)
      // Perform additional actions if necessary
    }
  }, [setIsLogged])

  const handleLogin = async (e) => {
    e.preventDefault()

    // Send login data to the server for verification
    try {
      const response = await fetch(
        'https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        {
          method: 'POST',
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        setIsLogged(true)
        // Store authentication token or session information in local storage
        localStorage.setItem('token', 'your-authentication-token')
      }
    } catch (error) {
      setLoginError(error.message)
    }
  }

  // const handleRegister = async (e) => {
  //   e.preventDefault()

  //   // Check if the user already exists
  //   const response = await fetch(
  //     'https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  //   )
  //   const users = await response.json()

  //   if (
  //     Object.values(users).some((user) => user.username === registerUsername)
  //   ) {
  //     // User already exists
  //     setRegistrationError('User already exists')
  //     return
  //   }

  //   if (registerUsername.length < 4) {
  //     setRegistrationError('Login is too short, 4 characters are required')
  //     return
  //   }

  //   // Create a new user
  //   try {
  //     const registerResponse = await fetch(
  //       'https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/users.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           username: registerUsername,
  //           password: registerPassword,
  //         }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )

  //     if (registerResponse.ok) {
  //       setIsLogged(true)
  //       // Store authentication token or session information in local storage
  //       localStorage.setItem('token', 'your-authentication-token')
  //     }
  //   } catch (error) {
  //     setRegistrationError(error.message)
  //     return
  //   }
  // }

  return (
    <div className={classes['auth-form__container']}>
      <form onSubmit={handleLogin} className={classes['auth-form__form']}>
        <input
          type='text'
          placeholder='Username'
          value={loginUsername}
          className={classes['auth-form__input']}
          onChange={(e) => setLoginUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={loginPassword}
          className={classes['auth-form__input']}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
        <p className={classes['auth-form__error']}>{loginError}</p>
        <button type='submit' className={classes['auth-form__button']}>
          Login
        </button>
      </form>

      {/* <form onSubmit={handleRegister} className={classes['auth-form__form']}>
        <input
          type='text'
          placeholder='Username'
          value={registerUsername}
          className={classes['auth-form__input']}
          onChange={(e) => setRegisterUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={registerPassword}
          className={classes['auth-form__input']}
          onChange={(e) => setRegisterPassword(e.target.value)}
          required
        />
        {registrationError && (
          <p className={classes['auth-form__error']}>
            {registrationError}
          </p>
        )}
        <button type='submit'>Register</button>
      </form> */}
    </div>
  )
}

export default AuthForm
