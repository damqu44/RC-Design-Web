import { useCallback, useEffect, useState } from 'react'

const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        'https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/orders.json'
      )

      if (!response.ok) {
        throw new Error('Error!')
      }

      const data = await response.json()

      const loadedOrders = Object.keys(data).map((key) => {
        const orderData = data[key]
        const trimmedOrderData = {
          id: key,
          companyName: orderData.companyName.trim(),
          orderName: orderData.orderName.trim(),
          purchaserName: orderData.purchaserName.trim(),
          purchaseDate: orderData.purchaseDate,
          project: orderData.project.trim(),
          isInvoice: orderData.isInvoice,
          isArrived: orderData.isArrived,
        }
        return trimmedOrderData
      })

      setOrders(loadedOrders)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }, [])

  const deleteOrder = useCallback(async (orderId) => {
    try {
      const response = await fetch(
        `https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/orders/${orderId}.json`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Error deleting order!')
      }

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      )
    } catch (error) {
      setError(error.message)
    }
  }, [])

  const addOrder = useCallback(async (order) => {
    try {
      const response = await fetch(
        'https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      setOrders((prevOrders) => [...prevOrders, { id: data.name, ...order }])
    } catch (error) {
      setError(error.message)
    }
  }, [])

  const updateOrder = useCallback(async (orderId, updatedData) => {
    try {
      // Fetch the existing order data from the server
      const response = await fetch(
        `https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/orders/${orderId}.json`
      )

      if (!response.ok) {
        throw new Error('Error fetching order data for update!')
      }

      const existingData = await response.json()

      // Merge the existing data with the updatedData
      const mergedData = { ...existingData, ...updatedData }

      // Send the complete order data in the PUT request
      const putResponse = await fetch(
        `https://rc-design-29794-default-rtdb.europe-west1.firebasedatabase.app/orders/${orderId}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mergedData),
        }
      )

      if (!putResponse.ok) {
        throw new Error('Error updating order!')
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, ...updatedData } : order
        )
      )
    } catch (error) {
      setError(error.message)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return {
    orders,
    setOrders,
    isLoading,
    error,
    deleteOrder,
    addOrder,
    updateOrder,
  }
}

export default useOrders
