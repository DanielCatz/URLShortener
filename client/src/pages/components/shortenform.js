import React from 'react';
import PropTypes from 'prop-types';


const ShortenForm = props =>(

<form onSubmit={props.handleSubmit}>
    <input
      type="text"
      name="url"
      placeholder="https://www.reddit..."
      value={props.url}
      onChange={props.handleChangeText}
    />
   
    <button type="submit">Shorten</button>
  </form>
);

ShortenForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  url: PropTypes.string,
};

ShortenForm.defaultProps = {
  url: '',
};



export default ShortenForm;