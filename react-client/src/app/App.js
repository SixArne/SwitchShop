import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import './app.scss';

import { StorePage } from './pages';
import { PageLayout, BackofficeLayout} from './layouts';
import { RouteWithLayout, AuthRouteWithLayout } from './utilities';
import * as Routes from './routes';
import { ApiProvider, AuthProvider, ResizeProvider } from './services';
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./admin/pages/AdminPage";

function App() {
  return (
    <div className="app">
      <ResizeProvider>
        <AuthProvider>
          <ApiProvider>
            <Router basename='/'>
              <Switch>
                <RouteWithLayout exact path={Routes.LANDING} component={StorePage} layout={PageLayout}/>
                <RouteWithLayout exact path={Routes.PRODUCT} component={ProductPage} layout={PageLayout}/>
                <RouteWithLayout exact path={Routes.REGISTER} component={RegisterPage} layout={PageLayout}/>
                <RouteWithLayout exact path={Routes.LOGIN} component={LoginPage} layout={PageLayout}/>
                <AuthRouteWithLayout path={Routes.BACKOFFICE_LANDING} component={AdminPage} layout={BackofficeLayout} />
              </Switch>
            </Router>
          </ApiProvider>
        </AuthProvider>
      </ResizeProvider>
    </div>
  );
}

export default App;
