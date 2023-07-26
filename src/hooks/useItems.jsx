import { useState, useEffect, useCallback } from 'react'

const useItems = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchItems = useCallback(async () => {
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

      const loadedItems = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }))

      setItems(loadedItems)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }, [])

  const deleteItem = useCallback(async (itemId) => {
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

      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    } catch (error) {
      setError(error.message)
    }
  }, [])

  const addItem = useCallback(async (item) => {
    try {
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

      setItems((prevItems) => [
        ...prevItems,
        {
          id: data.name,
          ...item,
        },
      ])
    } catch (error) {
      setError(error.message)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return { items, isLoading, error, deleteItem, addItem }
}

export default useItems
