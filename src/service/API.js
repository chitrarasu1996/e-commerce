import axios from "axios"


export const api="https://ecommerce-backend-ptt1.onrender.com/";

export const registerDetails=async(name,email,password,phone,address,answer)=>{
    const postData=await axios.post(api+"auth/register",{name,email,password,phone,address,answer})

return postData
};

export const loginDetails=async(email,password)=>{
    const loggeData=await axios.post(api+"auth/login",{email,password})
return loggeData
}


export const AuthChecking=async()=>{


    const res=await axios.get(api+"auth/user-auth") 

    return res;
}

export const adminChencking=async()=>{
    const res=await axios.get(api+"auth/admin-auth") 
    return res ;
}

export const forgotPassword=async(email,newpassword,answer)=>{
    const res=axios.post(api+"auth/forgot-password",{email,newpassword,answer})
   
    return res
}
//category

export const getAllCategory=async()=>{
const res=await axios.get(api+"category/get-category")
return res;
}

export const createCategory=async(name)=>{
 const res=await  axios.post(api+"category/create-category",{name})
 return res
}

export const deleteCategory=async(id)=>{
const res=await axios.delete(api+`category/delete-catgery/${id}`)
return res
};

export const updatedCategory=async(id,name)=>{
    const res=await axios.put(api+`category/update-catogory/${id}`,{name})
  return res
}

export const getSingleCategory=async(id)=>{
const res=await axios.get(api+`category/singleproduct-categroy/${id}`)
return res
}
//end<--->
//create Products
export const createProduct=async(products)=>{
const res=await axios.post(api+"product/create-product",products)
return res

}

//get all Products
export const getAllProducts=()=>{
    const res=axios.get(api+"product/getAllProducts")
    return res
}
//get all products photos

export const getAllPhtotos=async(pid)=>{
    const res=await axios.get(api+`product/get-Photo/${pid}`)
    return res;
    
}
//get single product

export const getSingleProduct=async(slug)=>{
    const res=await axios.get(api+`product/get-singleProduct/${slug}`)
    return res;
}
//update Product
export const updateSingleProduct=async(pid,products)=>{
const res=await axios.put(api,`product/update-product/${pid}`,products)
return res

}

//get Products by search

export const getProductBySearch=async(keywords)=>{

    const res=await axios.get(api+`product/search-products/${keywords}`)
    return res;

}
//get similar products

export const gettingSimilar=async(pid,cid)=>{
const res=await axios.get(api+`product/getrelated-products/${pid}/${cid}`)
return res;
}
//get products by category
export const getProductsBySlug=async(slug)=>{
 const response=await axios.get(api+`product/product-category/${slug}`)
return response;

};


//update user Profile

export const updateUserProfile=async(name,password,phone,address)=>{
    const res=await axios.put(api+"auth/update-proflie",{name,password,phone,address})
    return res;

}