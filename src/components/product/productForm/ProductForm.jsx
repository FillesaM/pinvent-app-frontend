import './productForm.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../../card/Card';

const ProductForm = ({
    product,
    productImage,
    imagePreview, 
    description,
    setDescription,
    handleImageChange,
    handleInputChange,
    saveProduct
}) => {


  return (
    <div className='add-product'>
        <Card cardClass={"card"}>
            <form onSubmit={saveProduct}>
                <Card cardClass={"group"}>
                    <label>Product Image:</label>
                    <code className='--color-dark'>Supported Formats: jpg, jpeg, png</code>
                    <input type="file" name="image" id="file" onChange={(e)=>handleImageChange(e)}/>
                    {imagePreview != null ?
                     (<div className='image-preview'>
                        <img src={imagePreview} alt="Product Pic" />
                     </div>)
                     :(<p>No image set for this product</p>)}
                </Card> 
                <label>Product Name:</label>
                <input type="text" placeholder='Product Name' name='name' value={product?.name ||""} onChange={handleInputChange}/>
                <label>Product Category:</label>
                <input type="text" placeholder='Product Category' name='category' value={product?.category ||""} onChange={handleInputChange}/>
                <label>Product Price:</label>
                <input type="text" placeholder='Product Price' name='price' value={product?.price ||""} onChange={handleInputChange}/>
                <label>Product Qunatity:</label>
                <input type="text" placeholder='Product Quantity' name='quantity' value={product?.quantity ||""} onChange={handleInputChange}/>
                <label>Product Desctiption:</label>
                <ReactQuill theme="snow" value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats}/>;
                <div className="--my">
                    <button className='--btn --btn-primary' type='submit'>Save Product</button>
                </div>
            </form>
        </Card>
    </div>
  )
}
ProductForm.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];

export default ProductForm