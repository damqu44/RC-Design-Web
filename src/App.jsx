import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  useNavigation,
  Outlet,
} from 'react-router-dom'

import HomePage from './Pages/Home'
import ErrorPage from './Pages/Error'

import Header from './Components/UI/Header'
import { Provider } from 'react-redux'
import store from './store/store'
import OrdersPage from './Pages/Orders'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App

const Root = () => {
  const navigation = useNavigation()
  return (
    <div>
      {navigation.state === 'loading' && <div>loading</div>}
      <Header />
      <Outlet />
    </div>
  )
}
