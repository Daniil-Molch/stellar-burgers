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

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import {
  BrowserRouter,
  Outlet,
  Route,
  Router,
  Routes,
  useLocation
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { NavigationModal } from '../modal/modal';

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
          <Route
            path={'/login'}
            element={
              <ProtectedRoute disAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/register'}
            element={
              <ProtectedRoute disAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/forgot-password'}
            element={
              <ProtectedRoute disAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/reset-password'}
            element={
              <ProtectedRoute disAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          {/* <Route path={'/register'} Component={Register}></Route> */}
          {/* <Route path={'/forgot-password'} Component={ForgotPassword}></Route> */}
          {/* <Route path={'/reset-password'} Component={ResetPassword}></Route> */}
          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path={'/profile'} Component={Profile} />
            <Route path={'/profile/orders'} Component={ProfileOrders} />
          </Route>
          <Route path={'*'} Component={NotFound404} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <NavigationModal title='Детали заказа' onClose={() => {}}>
                <OrderInfo />
              </NavigationModal>
            }
          />

          <Route
            path={'/feed/:number'}
            element={
              <NavigationModal title='order info' onClose={() => {}}>
                <OrderInfo />
              </NavigationModal>
            }
          />
          <Route
            path={'/ingredients/:id'}
            element={
              <NavigationModal title='IngredientDetails' onClose={() => {}}>
                <IngredientDetails />
              </NavigationModal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
