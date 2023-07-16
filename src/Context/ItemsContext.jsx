import { createContext, useState } from 'react'

import PropTypes from 'prop-types'

export const ItemsContext = createContext()

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([])

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  )
}

ItemsProvider.propTypes = {
  children: PropTypes.node,
}
