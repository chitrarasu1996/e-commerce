import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProducts, getProductsBySlug } from '../service/API';
import { api } from '../service/API';
const CategoryProduct = () => {
const navigate=useNavigate()
  const {slug}=useParams();
const [allProducts,setAllProducts]=useState([]);
const [cactegory,setcategory]=useState("");

useEffect(()=>{
if(slug)getProductsByCategory()
},[slug])

const getProductsByCategory=async()=>{
  try {
    const res=await  getProductsBySlug(slug)
    console.log(res.data.products)
setAllProducts(res.data.products)
setcategory(res.data.categories)

  } catch (error) {
    console.log(error)
  }

}
  return (
    <Layout>
      <>
      <div className='text-center'>
  
  <div><h4>category - {cactegory.name}</h4></div>
  <div><h6>Products Found {allProducts.length}</h6></div>
  <div className='row col-md-9  offset-2 m-auto '>
  <div className=' d-flex flex-wrap'>
                            {allProducts.length >0&& allProducts.map((item, i) => (


                                <div key={i} className="card m-2" style={{ width: "16rem" }}>
                                    <img style={{ height:220 }} src={api+`product/get-Photo/${item._id}`}
                                        className="card-img-top" alt="..." />
                                    <div style={{ height:170 }} className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description.substring(0, 18)}...</p>
                                        <p className="card-text">${item.price}</p>
                                        <button className="btn btn-primary me-2" style={{ fontSize: "10px" }}>Add To Cart</button>
                                        <button className="btn btn-secondary" onClick={()=>navigate(`/productdetails/${item.slug}`)} style={{ fontSize: "10px" }}>More Details</button>
                                    </div>
                                </div>

                            ))}

{/* <div className="m-2 p-2">
                            {allProducts && allProducts.length < totalProductsCount &&
                                (<button className="btn btn-danger"
                                 onClick={(e)=>{
                                    e.preventDefault();
                                setPage(page+1)
                                }}> 
                {loading?"Loading...":"Loadmore"}
                                </button>)

                            }
                        </div> */}
                        </div>
</div>
  </div>
  </>
    </Layout>
  
  )
}

export default CategoryProduct;