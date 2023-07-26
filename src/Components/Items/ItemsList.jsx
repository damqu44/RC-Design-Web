import PropTypes from 'prop-types'
import useSort from '../../hooks/useSort'
import Item from './Item'
import Button from '../UI/Button'
import classes from './ItemsList.module.css'

import { useSelector } from 'react-redux'
import { useState } from 'react'

const itemsPerPage = 100

const ItemsList = (props) => {
  const [renderedItems, setRenderedItems] = useState(itemsPerPage)

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

  const handleLoadMore = () => {
    setRenderedItems((prevRenderedItems) => prevRenderedItems + itemsPerPage)
  }

  const itemsToShow = searchValue ? searchedItems : sortedItems
  const renderedItemsList = itemsToShow.slice(0, renderedItems)

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
        {renderedItemsList.map((item) => (
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
      <div className={classes['load-button__section']}>
        {renderedItems < itemsToShow.length && (
          <Button handleFunction={handleLoadMore} label='Załaduj więcej' />
        )}
      </div>
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
