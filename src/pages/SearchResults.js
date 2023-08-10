import React from 'react'
import { useSearch } from '../context/Search'
import Layout from '../components/layout/Layout';
import { api } from '../service/API';

const SearchResults = () => {

    const [values,setValues]=useSearch();

  return (
  <>
  <Layout title={"Search results"}>
    <div className='text-center'>
  <div className='p-2'> <h2> SearchResults</h2></div>
    <div>
        {values?.results.length < 1 ? " No Products Found":`Found ${values?.results.length} `}
    </div>
    </div>
    <div>
    <div className='d-flex flex-wrap m-2 p-2'>
    {values?.results.length && values.results.map((item, i) => (


<div key={i} className="card m-2" style={{ width: "16rem" }}>
    <img style={{ height: "180px" }} src={api+`product/get-Photo/${item._id}`}
        className="card-img-top" alt="..." />
    <div style={{ height: "190px" }} className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description.substring(0, 18)}...</p>
        <p className="card-text">${item.price}</p>
        <button className="btn btn-primary me-2" style={{ fontSize: "10px" }}>Add To Cart</button>
        <button className="btn btn-secondary" style={{ fontSize: "10px" }}>More Details</button>
    </div>
</div>

))}
</div>
    </div>
  </Layout>
  
    </>
  )
}

export default SearchResults