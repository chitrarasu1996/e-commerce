import React, { useEffect, useState } from 'react'
import { getAllCategory } from '../../service/API';

const Allcategory = () => {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        getCategories()

    }, [])

    const getCategories = async () => {
        try {
            const res = await getAllCategory();
          
            setAllCategories(res.data.Category);
        } catch (error) {
            console.log(error)
        }

    }
    return allCategories;
}

export default Allcategory