import React, { Component } from 'react';
import loading from './loading.gif';

class Spinner extends Component {
  render() {
    return (
      <div className='text-card d-flex align-items-center justify-content-center'>
        {/* Style added to make the image smaller */}
        <img className='m-3' src={loading} alt='loading' style={{ width: '50px', height: '50px' }} />
      </div>
    );
  }
}

export default Spinner;
