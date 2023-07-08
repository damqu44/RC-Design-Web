import Item from './Item'

import classes from './ItemsList.module.css'

import PropTypes from 'prop-types'
import { useState } from 'react'

const ItemsList = (props) => {
  const [sortOrder, setSortOrder] = useState('desc') // Track sorting order: 'asc' or 'desc'
  const [sortedColumn, setSortedColumn] = useState('date') // Track the currently sorted column

  const headers = [
    { columnName: 'userName', displayName: 'Imię' },
    { columnName: 'userLastName', displayName: 'Nazwisko' },
    { columnName: 'itemName', displayName: 'Przedmiot' },
    { columnName: 'itemAmount', displayName: 'Ilość' },
    { columnName: 'project', displayName: 'Projekt' },
    { columnName: 'date', displayName: 'Data' },
  ]

  // Function to handle sorting
  const sortItemsHandler = (column) => {
    if (column === sortedColumn) {
      // If the same column is clicked again, toggle the sorting order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // If a different column is clicked, set it as the sorted column and default to ascending order
      setSortedColumn(column)
      setSortOrder('asc')
    }
  }

  // Sorting logic
  const sortedItems = [...props.items].sort((a, b) => {
    if (sortOrder === 'asc') {
      if (sortedColumn === 'itemAmount') {
        return a[sortedColumn] - b[sortedColumn]
      } else {
        return a[sortedColumn].localeCompare(b[sortedColumn])
      }
    } else {
      if (sortedColumn === 'itemAmount') {
        return b[sortedColumn] - a[sortedColumn]
      } else {
        return b[sortedColumn].localeCompare(a[sortedColumn])
      }
    }
  })

  let itemsToRender = sortedItems
  return (
    <>
      <ul className={classes.ul}>
        <div className={classes.line}></div>
        <li className={classes.li}>
          {headers.map((header) => (
            <h2
              key={header.columnName}
              className={`${classes.columnHeader} ${
                sortedColumn === header.columnName && sortOrder !== 'none'
                  ? classes.active
                  : ''
              }`}
              onClick={() => sortItemsHandler(header.columnName)}
            >
              <span>{header.displayName}</span>
              {sortedColumn === header.columnName && (
                <span className={classes.sortIndicator}>
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </h2>
          ))}
        </li>
        <div className={classes.line}></div>
        {itemsToRender.map((item) => (
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
      itemAmount: PropTypes.number.isRequired,
      project: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemDelete: PropTypes.func,
}

export default ItemsList
