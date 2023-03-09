import axios from 'axios'

 const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

 const createProduct = async(formData)=> {
    const resposne = await axios.post(`${BACKEND_URL}/api/products`, formData)
    return resposne.data
 }

 const getProducts = async()=> {
    const resposne = await axios.get(`${BACKEND_URL}/api/products`)
    return resposne.data
 }

 const deleteProduct = async(id)=> {
   const resposne = await axios.delete(`${BACKEND_URL}/api/products/${id}`)
   return resposne.data
}

const getProduct = async(id)=> {
   const resposne = await axios.get(`${BACKEND_URL}/api/products/${id}`)
   return resposne.data
}
const updateProduct = async(id,formData)=> {
   const resposne = await axios.patch(`${BACKEND_URL}/api/products/${id}`,formData)
   return resposne.data
}

const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
}

export default productService;

