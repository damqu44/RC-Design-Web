import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import classes from './LogoutButton.module.css'

const LogoutButton = () => {
  const { isLogged, setIsLogged, setLoginUsername, setLoginPassword } =
    useContext(AuthContext)

  const handleLogout = () => {
    setIsLogged(false)
    // Remove authentication token or session information from local storage
    localStorage.removeItem('token')
    setLoginUsername('')
    setLoginPassword('')
  }

  return (
    <>
      {isLogged ? (
        <button onClick={handleLogout} className={classes['logout-button']}>
          Wyloguj
        </button>
      ) : null}
    </>
  )
}

export default LogoutButton
