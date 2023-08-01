import { useState } from 'react'
import PropTypes from 'prop-types'
import Order from './Order'
import Button from '../UI/Button'
import classes from './OrdersList.module.css'

const ordersPerPage = 100

const OrdersList = (props) => {
  const [renderedOrders, setRenderedOrders] = useState(ordersPerPage)
  const { orders } = props

  const sortedOrders = [...orders].reverse()

  const headers = [
    { columnName: 'companyName', displayName: 'Firma' },
    { columnName: 'orderName', displayName: 'Treść zamówienia' },
    { columnName: 'purchaserName', displayName: 'Zamówił' },
    { columnName: 'project', displayName: 'Projekt' },
    { columnName: 'purchaseDate', displayName: 'Data zamówienia' },
    { columnName: 'isArrived', displayName: 'Przyjęto' },
    { columnName: 'isInvoice', displayName: 'FV' },
  ]

  const handleLoadMore = () => {
    setRenderedOrders(
      (prevRenderedorders) => prevRenderedorders + ordersPerPage
    )
  }

  const handleIsArrivedChange = (orderId, newValue) => {
    // Call the function passed from parent component to update isArrived property
    props.onIsArrivedChange(orderId, newValue)
  }

  const handleIsInvoiceChange = (orderId, newValue) => {
    // Call the function passed from parent component to update isInvoice property
    props.onIsInvoiceChange(orderId, newValue)
  }

  const renderedOrdersList = sortedOrders.slice(0, renderedOrders)

  console.log('LIST', renderedOrdersList)

  return (
    <>
      <ul className={classes['order-ul']}>
        <li className={classes['order-menu-li']}>
          {headers.map((header) => (
            <h2
              key={header.columnName}
              className={classes['order-columnHeader']}
            >
              <span>{header.displayName}</span>
            </h2>
          ))}
        </li>
        {renderedOrdersList.map((order) => (
          <Order
            key={order.id}
            id={order.id}
            companyName={order.companyName}
            orderName={order.orderName}
            purchaserName={order.purchaserName}
            project={order.project}
            isArrived={order.isArrived}
            isInvoice={order.isInvoice}
            purchaseDate={order.purchaseDate}
            onIsArrivedChange={handleIsArrivedChange}
            onIsInvoiceChange={handleIsInvoiceChange}
            onOrderDelete={props.onOrderDelete}
          />
        ))}
      </ul>
      <div className={classes['load-button__section']}>
        {renderedOrders < renderedOrdersList.length && (
          <Button handleFunction={handleLoadMore} label='Załaduj więcej' />
        )}
      </div>
    </>
  )
}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      orderName: PropTypes.string.isRequired,
      purchaserName: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired,
      isArrived: PropTypes.bool.isRequired,
      isInvoice: PropTypes.bool.isRequired,
      purchaseDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOrderDelete: PropTypes.func,
  onIsArrivedChange: PropTypes.func,
  onIsInvoiceChange: PropTypes.func,
}

export default OrdersList
