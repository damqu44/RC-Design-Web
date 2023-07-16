import PropTypes from 'prop-types'
import useSort from '../../hooks/useSort'
import Item from './Item'
import classes from './ItemsList.module.css'

import { useSelector } from 'react-redux'

const ItemsList = (props) => {
  const {
    searchedItems,
    sortedItems,
    sortColumn,
    sortOrder,
    handleSortColumn,
  } = useSort(
    props.items,
    'date' // Specify the initial sort column
  )

  const searchValue = useSelector((state) => state.searchValue)

  const headers = [
    { columnName: 'userName', displayName: 'Imię' },
    { columnName: 'userLastName', displayName: 'Nazwisko' },
    { columnName: 'itemName', displayName: 'Przedmiot' },
    { columnName: 'itemAmount', displayName: 'Ilość' },
    { columnName: 'project', displayName: 'Projekt' },
    { columnName: 'date', displayName: 'Data' },
  ]

  return (
    <>
      <ul className={classes.ul}>
        <li className={classes.li}>
          {headers.map((header) => (
            <h2
              key={header.columnName}
              className={`${classes.columnHeader} ${
                sortColumn === header.columnName && sortOrder !== 'none'
                  ? classes.active
                  : ''
              }`}
              onClick={() => handleSortColumn(header.columnName)}
            >
              <span>{header.displayName}</span>
              {sortColumn === header.columnName && (
                <span className={classes.sortIndicator}>
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </h2>
          ))}
        </li>
        <div className={classes.line}></div>

        {/* Item rows */}
        {searchValue
          ? searchedItems.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                userName={item.userName}
                userLastName={item.userLastName}
                itemName={item.itemName}
                itemAmount={item.itemAmount}
                project={item.project}
                date={item.date}
                onItemDelete={props.onItemDelete}
              />
            ))
          : sortedItems.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                userName={item.userName}
                userLastName={item.userLastName}
                itemName={item.itemName}
                itemAmount={item.itemAmount}
                project={item.project}
                date={item.date}
                onItemDelete={props.onItemDelete}
              />
            ))}
      </ul>
    </>
  )
}

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      userLastName: PropTypes.string.isRequired,
      itemName: PropTypes.string.isRequired,
      itemAmount: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemDelete: PropTypes.func,
}

export default ItemsList
