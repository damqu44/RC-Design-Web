import { Link, useLocation } from 'react-router-dom'
import LogoutButton from '../Auth/LogoutButton'
import classes from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchValue } from '../../actions/actions'

const Header = () => {
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.searchValue)
  const location = useLocation()

  const handleSearch = (event) => {
    dispatch(setSearchValue(event.target.value))
  }

  return (
    <div className={classes.header}>
      <Link to={location.pathname === '/' ? '/orders' : '/'}>
        <img src='/logo.png' className={classes.logo} alt='Logo' />
      </Link>
      <input
        type='text'
        value={searchValue || ''}
        onChange={handleSearch}
        placeholder='Szukaj...'
        className={classes.searchInput}
      />

      <LogoutButton className={classes['logout-button']} />
    </div>
  )
}

export default Header
