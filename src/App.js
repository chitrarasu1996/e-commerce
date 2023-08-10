
import { Routes ,Route} from 'react-router-dom';
import './App.css';



import HomePage from './pages/HomePage';
import About from './pages/about';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import Private from './components/Routes/Private';
import Forgotpassword from './pages/Auth/Forgotpassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProducts from './pages/Admin/UpdateProducts';
import SearchResults from './pages/SearchResults';
import { ProductDetails } from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
  return (
    <div className="App">

     
    <Routes>
     
      <Route path='/' element={<HomePage/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/categories/:slug' element={<CategoryProduct/>}/>
      <Route path='/productdetails/:slug' element={<ProductDetails/>}/>
      <Route path='/search' element={<SearchResults/>}/>
      <Route path='/dashboard' element={<Private/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/orders' element={<Orders/>}/>
        <Route path='user/profile' element={<Profile/>}/>
      </Route>
    
      <Route path='/dashboard' element={<AdminRoute/>}>

        <Route path='admin' element={<AdminDashboard/>}/>

        <Route path='admin/create-products' element={<CreateProduct/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/product/:slug' element={<UpdateProducts/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/orders' element={<AdminOrders/>}/>
      </Route>
    
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<Forgotpassword/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
     
    </div>
  );
}

export default App;
