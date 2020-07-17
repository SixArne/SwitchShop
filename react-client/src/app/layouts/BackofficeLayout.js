import React, { } from 'react';

import './BackofficeLayout.scss';
import Sidebar from "../admin/components/Sidebar/Sidebar";

const BackofficeLayout = ({ children }) => {

  return (
      <div className="overflow-hidden">
          <div className="row">
              <div className="col-md-1">
                  <Sidebar/>
              </div>
              <div className="col-md-11">
                  {children}
              </div>
          </div>
      </div>
  )
};
export default BackofficeLayout;