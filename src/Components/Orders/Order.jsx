import classes from './Order.module.css'
import PropTypes from 'prop-types'

const Order = (props) => {
  const handleIsArrivedChange = (event) => {
    const newValue = event.target.checked
    props.onIsArrivedChange(props.id, newValue)
  }

  const handleIsInvoiceChange = (event) => {
    const newValue = event.target.checked
    props.onIsInvoiceChange(props.id, newValue)
  }

  const orderDeleteHandler = () => {
    props.onOrderDelete(props.id)
  }

  return (
    <>
      <pre className={classes['order-pre']}>
        <li className={classes['order-li']}>
          <h5>{props.companyName}</h5>
          <h5>{props.orderName}</h5>
          <h5>{props.purchaserName}</h5>
          <h5>{props.project}</h5>
          <h5>{props.purchaseDate}</h5>
          <input
            type='checkbox'
            id='isArrived'
            value={props.isArrived}
            checked={props.isArrived}
            onChange={handleIsArrivedChange}
          ></input>
          <input
            type='checkbox'
            id='isInvoice'
            value={props.isInvoice}
            checked={props.isInvoice}
            onChange={handleIsInvoiceChange}
          ></input>
          <button
            className={classes['order-delete__button']}
            onClick={orderDeleteHandler}
          >
            x
          </button>
        </li>
        <div className={classes.line}></div>
      </pre>
    </>
  )
}

Order.propTypes = {
  id: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  orderName: PropTypes.string.isRequired,
  purchaserName: PropTypes.string.isRequired,
  purchaseDate: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  isArrived: PropTypes.bool.isRequired,
  isInvoice: PropTypes.bool.isRequired,
  onIsArrivedChange: PropTypes.func.isRequired,
  onIsInvoiceChange: PropTypes.func.isRequired,
  onOrderDelete: PropTypes.func.isRequired,
}

export default Order
