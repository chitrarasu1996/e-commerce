import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai"
import { FcShop } from "react-icons/fc"
import { useAuth } from "../../context/Auth";
import { toast } from "react-hot-toast";
import Allcategory from "../Hooks/Allcategory";
import SearchInput from "../form/SearchInput";
import { useCart } from "../../context/Cart";
import { Badge } from 'antd';
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const categories = Allcategory();

  const navigate = useNavigate()

  const handleLogout = () => {
    
    localStorage.removeItem("auth")
  
    setTimeout(() => {
      navigate("/login")
     
      
    }, 1000)
   
    setTimeout(() => {
    
      toast.success("Logout Successfully")
      setAuth({
        ...auth,
        user:null,
        token: ""
      })

    }, 2000)

  }

  return (
    <div style={{Width:"100vw"}} className="container-fluid"> 
      <nav className="navbar navbar-expand-lg bg-body-tertiary " >
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

            <Link to={"/"} className="navbar-brand d-flex gap-2" >
              <FcShop size={25} />Sell Shop</Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <SearchInput />
              <li className="nav-item">
                <NavLink to={"/"} 
                className="nav-link" >home</NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link style={{ border: "none" }}
                  className="nav-link dropdown-toggle"
                  to={"/category"}

                  data-bs-toggle="dropdown">
                  categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={`/categories`}
                      style={{ border: "none" }}
                      className="nav-link dropdown-item" href="#">
                      All Categories
                    </Link>
                  </li>
                  {categories && categories.map((c, i) => (

                    <li key={i}>
                      <Link to={`/categories/${c.slug}`}
                        style={{ border: "none" }}
                        className="nav-link dropdown-item" href="#">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>


              {!auth?.user? (<>  <li className="nav-item">
                <NavLink to={"/register"} className="nav-link">Register</NavLink>
              </li>

                <li className="nav-item ">
                  <NavLink to={"/login"} className="nav-link" >Login</NavLink>
                </li></>) : (<>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu" >
                      <li><NavLink to={`${auth?.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user"}`}
                       className="nav-link"  style={{border:"none"}}>dashboard</NavLink></li>
                      <li><NavLink onClick={handleLogout} className="nav-link" style={{border:"none"}}>Logout</NavLink></li>
                    </ul>
                  </li></>)}
           
              <Badge showZero count={cart?.length} className="mt-1">
              <li className="nav-item">
                <NavLink  to={"/cart"} 
                className="nav-link me-2 " style={{fontSize:"17px"}}>cart</NavLink>
              </li>
              </Badge>


            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
};
export default Header;
