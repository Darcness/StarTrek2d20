import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CharacterCreationApp from "./app";
import GMTrackerPage from './tracker/gmTrackerPage';
import { Provider } from "react-redux";
import store from './state/store';
import './i18n/config';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
            <Route path="/gmtracker" component={GMTrackerPage} />
            <Route path="/" component={CharacterCreationApp} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("mainBody")
);