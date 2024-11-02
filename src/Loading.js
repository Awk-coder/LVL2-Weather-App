import React from 'react';
import './loading.css'; // We will create this CSS file next

const Loading = () => {
  return (
    <div className="loading">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;