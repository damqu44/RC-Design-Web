import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

// Utwórz kontekst
export const AuthContext = createContext()

// Utwórz dostawcę kontekstu
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export default AuthProvider
