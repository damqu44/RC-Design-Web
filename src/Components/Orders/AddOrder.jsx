import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classes from './AddOrder.module.css'

import Button from '../UI/Button'

const AddOrder = (props) => {
  const [currentDate, setCurrentDate] = useState('')
  const companyNameRef = useRef('')
  const orderNameRef = useRef('')
  const purchaserNameRef = useRef('')
  const purchaseDateRef = useRef('')
  const projectRef = useRef('')
  const isArrivedRef = useRef(false)
  const isInvoiceRef = useRef(false)
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]
    setCurrentDate(currentDate)
  }, [])

  const submitHandler = (event) => {
    event.preventDefault()

    const order = {
      companyName: companyNameRef.current.value,
      orderName: orderNameRef.current.value,
      purchaserName: purchaserNameRef.current.value,
      purchaseDate: purchaseDateRef.current.value,
      project: projectRef.current.value,
      isArrived: isArrivedRef.current,
      isInvoice: isInvoiceRef.current,
    }

    props.onAddOrder(order)
    companyNameRef.current.value = ''
    orderNameRef.current.value = ''
    purchaserNameRef.current.value = ''
    projectRef.current.value = ''
  }

  return (
    <form onSubmit={submitHandler} className={classes['addOrder-form']}>
      <div>
        <input
          type='text'
          id='comapnyName'
          ref={companyNameRef}
          placeholder='Firma'
          required
        ></input>
      </div>
      <div>
        <textarea
          id='orderName'
          ref={orderNameRef}
          placeholder='Zamówienie..'
          required
        ></textarea>
      </div>
      <div>
        <input
          type='text'
          id='purchaserName'
          ref={purchaserNameRef}
          placeholder='Zamówił..'
          required
        ></input>
      </div>
      <div>
        <input
          type='text'
          id='project'
          ref={projectRef}
          placeholder='Projekt'
          required
        ></input>
      </div>
      <div>
        <input
          type='date'
          id='purchaseDate'
          ref={purchaseDateRef}
          defaultValue={currentDate}
          required
        ></input>
      </div>
      <Button label='Dodaj' type='submit' />
    </form>
  )
}

AddOrder.propTypes = {
  onAddOrder: PropTypes.func.isRequired,
}

export default AddOrder
