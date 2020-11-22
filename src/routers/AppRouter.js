import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

// <BrowserRouter> uses createBrowserHistory library by default.
// We changed <BrowserRouter> to <Router> so we can pass in the 'history' prop and have more control.
// As you can see above the named export 'history' can be used within the app.
const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute
                    path="/"
                    exact
                    component={LoginPage}
                />
                <PrivateRoute
                    path="/dashboard"
                    component={DashboardPage}
                />
                <Route
                    component={NotFoundPage}
                />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
