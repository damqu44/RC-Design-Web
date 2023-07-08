import classes from './App.module.css'

import AddItem from './Components/AddItem'
import AuthForm from './Components/Auth/AuthForm'
import { AuthContext } from './Components/Context/AuthContext'
import Header from './Components/Header'
import ItemsList from './Components/ItemsList'

import { useEffect, useState, useCallback, useContext } from 'react'

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isLogged } = useContext(AuthContext)

  const fetchItemsHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        'https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/items.json'
      )
      if (!response.ok) {
        throw new Error('Error!')
      }

      const data = await response.json()

      const loadedItems = []

      for (const key in data) {
        loadedItems.push({
          id: key,
          userName: data[key].userName,
          userLastName: data[key].userLastName,
          itemName: data[key].itemName,
          itemAmount: Number(data[key].itemAmount),
          project: data[key].project,
          date: data[key].date,
        })
      }

      setItems(loadedItems)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchItemsHandler()
  }, [fetchItemsHandler])

  async function deleteItemHandler(itemId) {
    try {
      const response = await fetch(
        `https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/items/${itemId}.json`,
        {
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        throw new Error('Error deleting item!')
      }

      fetchItemsHandler()
    } catch (error) {
      setError(error.message)
    }
  }

  async function addItemHandler(item) {
    const response = await fetch(
      'https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/items.json',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()
    console.log(data)

    fetchItemsHandler()
  }

  let content = <p className={classes.content}>Found no movies.</p>

  if (items.length > 0) {
    content = <ItemsList items={items} onItemDelete={deleteItemHandler} />
  }

  if (error) {
    content = <p className={classes.content}>{error}</p>
  }

  if (isLoading) {
    content = <p className={classes.content}>Loading...</p>
  }
  return (
    <div className={classes.container}>
      <Header />
      {isLogged ? (
        <>
          <AddItem onAddItem={addItemHandler} />
          <>{content}</>
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}

export default App
