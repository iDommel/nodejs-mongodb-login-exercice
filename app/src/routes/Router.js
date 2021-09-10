import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from '../utils/constants/routes'
import Home from './home/home';
import Login from './login/login';
import Register from './register/register';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routes.HOME} component={Home}/>
                <Route path={routes.REGISTER} component={Register}/>
                <Route path={routes.LOGIN} component={Login}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;