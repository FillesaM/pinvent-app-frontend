import { SpinnerImage } from '../../loader/Loader'
import './productList.scss'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { useState, useEffect} from 'react';
import Search from '../../search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice';
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice';
import {Link} from 'react-router-dom'

const ProductList = ({products,isLoading}) => {

const dispatch = useDispatch();
const filteredProducts = useSelector(selectFilteredProducts)

const [searchInput,setSearchInput] = useState("")

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
}

  useEffect(() => {
  dispatch(FILTER_PRODUCTS({products,searchInput}))
   }, [products,searchInput,dispatch])


const shortenText = (text,n)=> {
    if(text.length > n) {
        const shortText=text.substring(0,n).concat("...")
        return shortText;
    }
    return text;
}

const delProduct=async(id)=>{
    await dispatch(deleteProduct(id))
    await dispatch(getProducts())
}

const confirmDelete = (id)=>{
    confirmAlert({
        title: 'Delete Product',
        message: 'Are you sure you want to delete product?',
        buttons: [
          {
            label: 'Delete',
            onClick: () => delProduct(id)
          },
          {
            label: 'Cancel',
            //onClick: () => alert('Click No')
          }
        ]
      });
}

  return (
    <div className='product-list'>
        <hr />
        <div className="table">
            <div className='--flex-between --flex-direction-column'>
                <span><h3>Inventory Items</h3></span>
                <span>
                    <Search value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
                </span>
            </div>
            {isLoading && <SpinnerImage/>}
            <div className="table">
                {!isLoading && products.length === 0 ? (<p>No product is found,please add a product</p>)
                :(
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product,index)=>{
                                const{_id,name,category,price,quantity} = product
                                return (
                                  <tr key={_id}>
                                    <td>{index +1 }</td>
                                    <td>{shortenText(name,16)}</td>
                                    <td>{category}</td>
                                    <td>${price}</td>
                                    <td>{quantity}</td>
                                    <td>${quantity*price}</td>
                                    <td className='icons'>
                                        <Link to={`/product-details/${_id}`}><span><AiOutlineEye size={25} color={"purple"}/></span></Link>
                                        <Link to={`/edit-product/${_id}`}><span><FaEdit size={20} color={"green"}/></span></Link>
                                        <span><FaTrashAlt size={20} color={"red"} onClick={()=>confirmDelete(_id)}/></span>
                                        </td>
                                </tr> 
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <ReactPaginate
             breakLabel="..."
             nextLabel="Next >"
             onPageChange={handlePageClick}
             pageRangeDisplayed={2}
             pageCount={pageCount}
             previousLabel="< Prev"
             renderOnZeroPageCount={null}
             containerClassName="pagination"
             pageLinkClassName="page-num"
             previousLinkClassName="page-num"
             nextLinkClassName="page-num"
             activeLinkClassName="activePage"
      />
        </div>
    </div>
  )
}

export default ProductList