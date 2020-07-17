import React, { } from 'react';

import './ErrorLayout.scss';

const ErrorLayout = ({ children }) => {

  return (
    <div class="page--404">
      <main class="main">
        {children}
      </main>
    </div>    
  )
};
export default ErrorLayout;