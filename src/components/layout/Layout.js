
import Footer from "./Footer";
import Header  from "./Header";
import {Helmet} from "react-helmet"
import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout =({children,description,keywords,author,title})=>{
    return(
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
     

        <Header/>
        
        <main  style={{minHeight:"70vh"}}  >
        <Toaster/>
            {children}</main>

        <Footer/>
        </div>
    )
};
Layout.defaultProps={
    title:"E-commerce-shop now",
    description:"MERN Stack Project",
    keywords:"mern,react,node,mongodb",
    author:"chitrarasu"
}
export default Layout;
