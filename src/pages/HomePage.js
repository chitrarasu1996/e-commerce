import Layout from "../components/layout/Layout";
import {  useEffect, useState } from "react";

import {  useNavigate } from "react-router-dom";
import { api, getAllCategory, getAllProducts } from "../service/API";
import { toast } from "react-hot-toast";

import { Card, Checkbox, Empty, Radio } from "antd";
import axios from "axios";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";



import "../styles/home.style.css"
const HomePage = () => {




    const [allProducts, setAllProducts] = useState([]);

    const [categories, setCategories] = useState([])

    const [checked, setChecked] = useState([]);

    const [radio, setRadio] = useState([])


    const [page, setPage] = useState(1)

    const [totalProductsCount, setTotalProductsCount] = useState(0);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(Boolean);
    const [cart, setcart] = useCart()
    const [noProducts, setNoProducts] = useState("")
    const [goToCart,setGoToCart]=useState(false)
    //getProductCount 
    const getProductsCount = async () => {
        try {
            const response = await axios.get(api + "product/products-count");

            setTotalProductsCount(response.data.totalProducts)

        } catch (error) {
            console.log(error)

        }
    }


    //get all categories
    useEffect(() => {
        AllCategories()
        getProductsCount()
    }, [])
    const AllCategories = async () => {
        try {
            const respone = await getAllCategory()

            if (respone.data.success) {
                setCategories(respone.data.Category)
            }
        } catch (er) {
            console.log(er)
            toast.error("something went wrong while getting category")
        }
    }

    useEffect(() => {
        if (!checked.length || !radio.length) {
            gettingAllProducts()
        }
    }, [checked.length, radio.length]);
    //filter
    useEffect(() => {
        if (checked.length || radio.length) {
            getProductsByFilter()
        }
    }, [checked, radio])

    // loadmeore-page-useEffect


    //loadMore
    const loadMore = async () => {
        try {
            setLoading(false)
            const respone = await axios.get(api + `product/product-list/${page}`)

            setLoading(true)
            setAllProducts([...allProducts, ...respone?.data?.products])


        } catch (er) {
            console.log(er)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])
    //     }
    //get all products
    const gettingAllProducts = async () => {
        try {
            setLoading(true)
            const respone = await axios.get(api + `product/product-list/${page}`)
            setLoading(false)
            if (respone.data.success) {
                setAllProducts(respone.data.products)
            }
        } catch (er) {
            console.log(er)
            setLoading(false)
            toast.error("somethig went Wrong")
        }
    }

    //filter by categories
    const categeryFilter = (value, id) => {
        let allCheckedCatergory = [...checked];
        if (value) {
            allCheckedCatergory.push(id)
        } else {
            allCheckedCatergory = allCheckedCatergory.filter((checkedId) => checkedId !== id)
        }
        setChecked(allCheckedCatergory)


    }
    // get products by filter

    const getProductsByFilter = async () => {
        try {

            const { data } = await axios.post(api + "product/filter-product", { checked, radio });
            
            setAllProducts(data.products)
            if (!data.success) {
            
                setTimeout(() => {
                    setAllProducts(data.products)
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    //more details

    const addingProductsIntoCart = (item) => {
        setGoToCart(true)
        setcart([...cart, item]);
setTimeout(()=>{
    toast.success("Item Added Succefully")
},1000)
     

        localStorage.setItem("cart", JSON.stringify([...cart, item]))
    }





    return (
        <Layout  title={"All Products - Best Offers"}>

           
            <div >
                <div className="row"  >
                    <div className="col-md-2 text-center pt-2 mb-2">
                        <h6 className="border-bottom ">Filter By categories</h6>

                        <div className="d-flex flex-column ms-3 mb-2">
                            {categories && categories.map((c, i) => (
                                <Checkbox key={i}
                                    onChange={(e) => categeryFilter(e.target.checked, c._id)}
                                >{c.name}
                                </Checkbox>
                            ))}
                        </div>
                        <div className="mt-4 "> <h6 className="border-bottom"> Filter By Price </h6></div>
                        <div className="d-flex flex-column ms-3">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}   >
                                {Prices?.map((p) => (
                                    <div
                                        key={p._id} className="d-flex">
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="btn btn-danger mt-2" onClick={() => window.location.reload()}>
                            RESET FILTERS
                        </div>
                        <div className="ui animated button" tabIndex="0">
                            <div className="visible content">Next</div>
                            <div className="hidden content">
                                <i className="right arrow icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 text-center mt-1" >
                       
                        <div>

                            <div className='d-flex flex-wrap'>
                                {allProducts.length > 0 ? allProducts.map((item, i) => (


                                    <div key={i} className="card m-2 box shadow" style={{ width: "16rem" }}>
                                        <img style={{ height: 220 }} src={api + `product/get-Photo/${item._id}`}
                                            className="image-hover card-img-top" alt="..." />
                                        <div style={{ height: 170 }} className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description.substring(0, 18)}...</p>
                                            <p className="card-text" style={{ color: 'green', fontWeight: "500" }}>${item.price}</p>
                                            <button className="btn btn-primary me-2"
                                                onClick={() => addingProductsIntoCart(item)}
                                                style={{ fontSize: "10px" }}>Add To Cart</button>


                                            <button className="btn btn-secondary"
                                                onClick={() => navigate(`/productdetails/${item.slug}`)}
                                                style={{ fontSize: "10px" }}>More Details</button>
                                        </div>
                                    </div>

                                )) : <div><h3>No Products are available</h3></div>}

                            </div>
                            <div className="m-2 p-2">
                                {allProducts.length>0 && allProducts.length < totalProductsCount &&
                                    (<button  className="btn btn-secondary text-white loademore"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page + 1)
                                        }}>
                                        {loading ? "Loading..." : "Loadmore"}
                                    </button>)

                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </Layout>
    )
};
export default HomePage