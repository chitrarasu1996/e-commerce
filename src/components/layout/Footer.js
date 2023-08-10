import { Link } from "react-router-dom";

const Footer=()=>{
    return(
        <div className="footer " style={{width:"100vw"}} >
            <h3 className=" text-wrap text-center "> All Rights Reserved &copy; chitrarasu</h3>
            <p className="mt-3 text-center text-white ">  
             <Link to={"/about"}>about</Link>|
                
            <Link to={"/contact"}>contact</Link>|
            <Link to={"/policy"}>Privacy Policy</Link>| 

            </p>
         
            </div>
    )
};
export default Footer;
