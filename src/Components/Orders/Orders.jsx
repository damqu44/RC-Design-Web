import { useContext } from 'react'
import AuthForm from '../Auth/AuthForm'

import AddOrder from './AddOrder'
import OrdersList from './OrdersList'

import classes from './Orders.module.css'
import { AuthContext } from '../../Context/AuthContext'
import useOrders from '../../hooks/useOrders'

const Orders = () => {
  const { orders, isLoading, error, deleteOrder, addOrder, updateOrder } =
    useOrders()
  const { isLogged } = useContext(AuthContext)

  const handleIsArrivedChange = (orderId, newValue) => {
    updateOrder(orderId, { isArrived: newValue })
  }

  const handleIsInvoiceChange = (orderId, newValue) => {
    updateOrder(orderId, { isInvoice: newValue })
  }

  let content = <p className={classes['orders-content']}>Brak danych</p>

  if (orders.length > 0) {
    content = (
      <OrdersList
        orders={orders}
        onOrderDelete={deleteOrder}
        onIsArrivedChange={handleIsArrivedChange}
        onIsInvoiceChange={handleIsInvoiceChange}
      />
    )
  }

  if (error) {
    content = <p className={classes['orders-content']}>{error}</p>
  }

  if (isLoading) {
    content = <p className={classes['orders-content']}>Ładowanie</p>
  }

  return (
    <div className={classes['orders-container']}>
      {isLogged ? (
        <>
          <AddOrder onAddOrder={addOrder} />
          {content}
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}

export default Orders
