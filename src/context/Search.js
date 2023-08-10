
import { useContext,useState,createContext } from "react";



 const searchContext=createContext();

const SearchProvider=({children})=>{

    const [auth,setAuth]=useState({
        keywords:"",
        results:[]
    })
    return(
        <searchContext.Provider value={[auth,setAuth]}>
{children}
        </searchContext.Provider>
    )
};
const useSearch=()=>useContext(searchContext)

export{SearchProvider,useSearch}