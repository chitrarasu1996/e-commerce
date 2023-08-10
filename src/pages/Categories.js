import React from 'react'
import Layout from '../components/layout/Layout'
import Allcategory from '../components/Hooks/Allcategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const Categories = Allcategory();



    return (
        <Layout title={"All Categories"}>
            <>
                <div>
                    <h1>All Categories</h1>
                </div>
                <div className='row container'>

                    {Categories.length ? Categories.map((c, i) => (
                        <div key={i} className='col-md-6'>
                            <Link to={`/categories/${c.slug}`}>
                                <button className='btn mt-5 mb-3  ms-5 btn-primary'>{c.name} </button>
                            </Link>
                        </div>
                    )):<><h2>Loading...</h2></>}

                </div>
            </>
        </Layout>

    )
}

export default Categories