import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import classes from './AddItem.module.css'

import Button from '../UI/Button'

const AddItem = (props) => {
  const [currentDate, setCurrentDate] = useState('')
  const userNameRef = useRef('')
  const userLastNameRef = useRef('')
  const itemNameRef = useRef('')
  const itemAmountRef = useRef('')
  const projectRef = useRef('')
  const dateRef = useRef('')

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]
    setCurrentDate(currentDate)
  }, [])

  const submitHandler = (event) => {
    event.preventDefault()

    const item = {
      userName: userNameRef.current.value,
      userLastName: userLastNameRef.current.value,
      itemName: itemNameRef.current.value,
      itemAmount: itemAmountRef.current.value,
      project: projectRef.current.value,
      date: dateRef.current.value,
    }

    props.onAddItem(item)

    userNameRef.current.value = ''
    userLastNameRef.current.value = ''
    itemNameRef.current.value = ''
    itemAmountRef.current.value = ''
    projectRef.current.value = ''
  }

  return (
    <form onSubmit={submitHandler} className={classes['addItem-form']}>
      <div>
        <input
          type='text'
          id='userName'
          ref={userNameRef}
          placeholder='Imie'
          required
        />
      </div>
      <div>
        <input
          type='text'
          id='userLastName'
          ref={userLastNameRef}
          placeholder='Nazwisko'
          required
        />
      </div>
      <div>
        <input
          type='text'
          id='itemName'
          ref={itemNameRef}
          placeholder='Przedmiot'
          required
        />
      </div>
      <div>
        <input
          type='number'
          id='itemAmount'
          ref={itemAmountRef}
          placeholder='Ilość'
          required
        />
      </div>
      <div>
        <input
          type='text'
          id='project'
          ref={projectRef}
          placeholder='Projekt'
          required
        />
      </div>
      <div>
        <input
          type='date'
          id='date'
          ref={dateRef}
          defaultValue={currentDate}
          required
        />
      </div>

      <Button label='Dodaj' type='submit' />
    </form>
  )
}

AddItem.propTypes = {
  onAddItem: PropTypes.func.isRequired,
}

export default AddItem
