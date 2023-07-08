import PropTypes from 'prop-types'

import classes from './Item.module.css'

const Item = (props) => {
  const itemDeleteHandler = () => {
    props.onItemDelete(props.id)
  }

  return (
    <>
      <li className={classes.li}>
        <h5>{props.userName}</h5>
        <h5>{props.userLastName}</h5>
        <h5>{props.itemName}</h5>
        <h5>{props.itemAmount}</h5>
        <h5>{props.project}</h5>
        <h5>
          {props.date}
          <button
            className={classes['item_delete-button']}
            onClick={itemDeleteHandler}
          >
            x
          </button>
        </h5>
      </li>
      <div className={classes.line}></div>
    </>
  )
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userLastName: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemAmount: PropTypes.number.isRequired,
  project: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onItemDelete: PropTypes.func.isRequired,
}

export default Item
