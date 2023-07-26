import classes from './Button.module.css'

import PropTypes from 'prop-types'

const Button = ({ label, type, handleFunction }) => {
  return (
    <button className={classes.button} type={type} onClick={handleFunction}>
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleFunction: PropTypes.func,
}

export default Button
