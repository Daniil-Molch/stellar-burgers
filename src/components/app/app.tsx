import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  BrowserRouter,
  Outlet,
  Route,
  Router,
  Routes,
  useLocation
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  return (
    <div className={styles.app}>
      <Routes location={backgroundLocation || location}>
        <Route
          element={
            <>
              <AppHeader />
              <Outlet />
            </>
          }
        >
          <Route path='/' Component={ConstructorPage} />
          <Route path='/feed' Component={Feed} />
          <Route path={'/login'} Component={Login}></Route>
          <Route path={'/register'} Component={Register}></Route>
          <Route path={'/forgot-password'} Component={ForgotPassword}></Route>
          <Route path={'/reset-password'} Component={ResetPassword}></Route>
          <Route
            element={
              <ProtectedRoute>
                <Outlet></Outlet>
              </ProtectedRoute>
            }
          >
            <Route path={'/profile'} Component={Profile}></Route>
            <Route path={'/profile/orders'} Component={ProfileOrders}></Route>
          </Route>
          <Route path={'*'} Component={NotFound404}></Route>
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path={'/feed/:number'}
            element={
              <Modal title='order info' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          ></Route>
          <Route
            path={'/ingredients/:id'}
            element={
              <Modal title='IngredientDetails' onClose={() => {}}>
                <IngredientDetails />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
