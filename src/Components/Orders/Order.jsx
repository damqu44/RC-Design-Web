import { useEffect, useRef, useState } from 'react'
import classes from './Order.module.css'
import PropTypes from 'prop-types'

const Order = (props) => {
  const divRef = useRef(null)
  const [isOverflowed, setIsOverflowed] = useState(false)
  const [isExtended, setIsExtended] = useState(false)

  useEffect(() => {
    const div = divRef.current

    if (div.scrollHeight > div.clientHeight + 20) {
      setIsOverflowed(true)
    }
  }, [])

  const toggleOverflow = () => {
    if (isExtended) {
      setIsExtended(false)
    } else {
      setIsExtended(true)
    }
  }

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
        <li
          className={`${classes['order-li']} ${
            isExtended
              ? classes['expandable-li__active']
              : classes['expandable-li']
          }`}
        >
          <h5 className={classes['order-h5']}>{props.companyName}</h5>
          <div
            className={`${isExtended ? classes['expandable-div__active'] : ''}`}
          >
            <h5
              ref={divRef}
              className={`${
                isExtended
                  ? classes['expandable-h5__active']
                  : classes['order-h5__content']
              }`}
            >
              {props.orderName}
            </h5>
            {isOverflowed ? (
              <div
                className={`${
                  isExtended
                    ? classes['order-li__shrink']
                    : classes['order-li__extend']
                }`}
                onClick={toggleOverflow}
              >
                ➤
              </div>
            ) : (
              ''
            )}
          </div>

          <h5 className={classes['order-h5']}>{props.purchaserName}</h5>
          <h5 className={classes['order-h5']}>{props.project}</h5>
          <h5 className={classes['order-h5']}>{props.purchaseDate}</h5>
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
