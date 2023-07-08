import LogoutButton from './Auth/LogoutButton'
import classes from './Header.module.css'

const Header = () => {
  return (
    <div className={classes.header}>
      <img src='/logo.png' className={classes.logo}></img>
      <LogoutButton className={classes['logout-button']} />
    </div>
  )
}

export default Header
