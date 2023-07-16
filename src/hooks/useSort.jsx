import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useSort = (items, initialSortColumn) => {
  const [sortedItems, setSortedItems] = useState([])
  const [searchedItems, setSearchedItems] = useState([])
  const [sortColumn, setSortColumn] = useState(initialSortColumn)
  const [sortOrder, setSortOrder] = useState('desc')
  const searchValue = useSelector((state) => state.searchValue)

  useEffect(() => {
    const sortItems = () => {
      const sorted = [...items].reverse().sort((a, b) => {
        const valueA = a[sortColumn] || ''
        const valueB = b[sortColumn] || ''

        if (sortOrder === 'asc') {
          return valueA.localeCompare(valueB)
        } else {
          return valueB.localeCompare(valueA)
        }
      })

      setSortedItems(sorted)
    }

    const searchItems = () => {
      const searched = [...items].reverse().filter((obj) =>
        Object.values(obj).some((value) => {
          if (typeof value === 'string') {
            const regex = new RegExp(searchValue, 'i')
            return regex.test(value)
          } else {
            return false
          }
        })
      )
      const newSearched = searched.reverse().sort((a, b) => {
        const valueA = a[sortColumn] || ''
        const valueB = b[sortColumn] || ''

        if (sortOrder === 'asc') {
          return valueA.localeCompare(valueB)
        } else {
          return valueB.localeCompare(valueA)
        }
      })
      setSearchedItems(newSearched)
    }

    sortItems()
    searchItems()
  }, [items, sortColumn, sortOrder, searchValue])

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'))
  }

  const handleSortColumn = (column) => {
    setSortColumn(column)
    toggleSortOrder()
  }

  return { searchedItems, sortedItems, sortColumn, sortOrder, handleSortColumn }
}

export default useSort
