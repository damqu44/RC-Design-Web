import { BeatLoader } from 'react-spinners'
import AddItem from './AddItem'
import AuthForm from '../Auth/AuthForm'
import ItemsList from './ItemsList'
import useItems from '../../hooks/useItems'
import classes from './Items.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useSelector } from 'react-redux'
import useSort from '../../hooks/useSort'

const Items = () => {
  const { items, isLoading, error, deleteItem, addItem } = useItems()
  const { isLogged } = useContext(AuthContext)

  const { searchedItems } = useSort(items)

  const searchValue = useSelector((state) => state.searchValue)

  let content = <p className={classes.content}>Brak danych..</p>

  if (items.length > 0) {
    content = <ItemsList items={items} onItemDelete={deleteItem} />
    if (searchValue && searchedItems.length === 0) {
      content = (
        <p className={classes.content}>Nie znaleziono szukanego tekstu..</p>
      )
    }
  }

  if (error) {
    content = <p className={classes.content}>{error}</p>
  }

  if (isLoading) {
    content = (
      <p className={classes.content}>
        <BeatLoader color='#000000' size={25} loading={true} />
      </p>
    )
  }

  return (
    <div className={classes.container}>
      {isLogged ? (
        <>
          <AddItem onAddItem={addItem} />
          <>{content}</>
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}

export default Items
