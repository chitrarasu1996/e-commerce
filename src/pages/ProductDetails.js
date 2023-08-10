import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { api, getSingleCategory, getSingleProduct, gettingSimilar } from '../service/API';
import axios from 'axios';

export const ProductDetails = () => {

    const { slug } = useParams();
    const [product, setProduct] = useState("");
    const navigate = useNavigate()
    const [cId, setCid] = useState("");

    const [similarProduct, setSimilarProduct] = useState([])

    const [singleCategory, setSingleCategory] = useState("")
    useEffect(() => {

        if (slug) {
            getProduct()

        }

    }, [slug])

    useEffect(() => {
        if (product) getSingleProductCategory()

    }, [product])

    // get single Category
    const getSingleProductCategory = async () => {
        const res = await getSingleCategory(cId);
        setSingleCategory(res.data.category.name)

    }
    //get similar products

    const getSimilarProducts = async (ppid, ccid) => {
        try {
            const res = await gettingSimilar(ppid, ccid);

            setSimilarProduct(res.data.product)

        } catch (error) {
            console.log(error)
        }

    }

    //get product

    const getProduct = async () => {
        try {
            const res = await getSingleProduct(slug);
            setProduct(res.data.product)
            setCid(res.data.product.category)

            getSimilarProducts(res.data.product._id, res.data.product.category)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>

            <>
                <div className='row container'>
                    <div className='col-md-6'>
                        {product &&
                            <img style={{ height: 300, width: "16rem" }}
                                src={api + `product/get-Photo/${product._id}`}
                                className="card-img-top" alt={product.name} />}
                    </div>
                    <div className='col-md-6 d-flex flex-column p-2'>
                        <div><h1 style={{ fontWeight: "400" }}>ProductDetails</h1></div>
                        <hr />
                        <h6>Name : {product.name}</h6>
                        <h6>Description : {product.description}</h6>
                        <h6>Price : {product.price}</h6>
                        <h6>Category : {singleCategory}</h6>
                        <div>
                            <button className="btn btn-secondary w-75 mt-1"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className='row' >
                    <div className='d-flex gap-2'>
                        <h5  style={{ opacity: "1"}}>
                            Similar Products 
                            
                        </h5>
                     
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        {similarProduct.length ? similarProduct.map((item, i) => (


                            <div key={i} className="card m-2" style={{ width: "16rem" }}>

                                <img style={{ height: 220 }}
                                    src={api + `product/get-Photo/${item._id}`}
                                    className="card-img-top" alt={item.name} />
                                <div style={{ height: 170 }} className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description.substring(0, 18)}...</p>
                                    <p className="card-text">${item.price}</p>
                                    <button className="btn btn-primary me-2" style={{ fontSize: "10px" }}>Add To Cart</button>
                                    <button className="btn btn-secondary"
                                        onClick={() => navigate(`/productdetails/${item.slug}`)}
                                        style={{ fontSize: "10px" }}>More Details</button>
                                </div>
                            </div>

                        )) : <div className='text-center'><h6>No products Are available</h6></div>}
                    </div>
                </div>
            </>
        </Layout>

    )
}
