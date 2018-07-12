import React from 'react';
import PropTypes from 'prop-types';


const ShortenForm = props =>(

<form onSubmit={props.handleSubmit} className="form-inline mt-2 mt-md-0">
    <input className="form-control mr-sm-2"
      type="text"
      name="url"
      placeholder="https://www.reddit..."
      value={props.url}
      onChange={props.handleChangeText}
    />
   
    <button className="btn btn-outline-success my-2 my-sm-0"
     type="submit">Shorten</button>
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