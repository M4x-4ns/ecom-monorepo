import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import axios from "axios";
import { createProduct,readProduct,updateProduct,listProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams,useNavigate } from "react-router-dom";


const initialSate = {
  title: "Logictech mouse",
  description: "desc",
  price: 3000,
  quantity: 20,
  categoryId: "",
  images: [],
};
const FormEditProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
   
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
 
  // console.log(products);

  const [form, setForm] = useState(initialSate);

  useEffect(() => {
    getCategory();
    fetchProduct(token,id,form)
  }, []);

  const fetchProduct = async(token,id,form)=>{
    try{
        const res = await readProduct(token,id,form);
        console.log('res from backend',res);
        setForm(res.data);
    }catch(err){
      console.log('Err fatch data',err);
    }
  }
  console.log(form);


  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token,id, form);
      console.log(res);
      toast.success(`เพิ่มข้อมูลสินค้า ${res.data.title} สำเร็จ`);
      navigate('/admin/product')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleOnChange}
          name="title"
          placeholder="Title"
        />
        <input
          className="border"
          value={form.description}
          onChange={handleOnChange}
          name="description"
          placeholder="Description"
        />
        <input
          type="number"
          className="border"
          value={form.price}
          onChange={handleOnChange}
          name="price"
          placeholder="price"
        />
        <input
          type="number"
          className="border"
          value={form.quantity}
          onChange={handleOnChange}
          name="quantity"
          placeholder="quantity"
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            Please Select{" "}
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />
        {/* Upload file img */}
          <Uploadfile form={form} setForm={setForm}/>

        <button className="bg-blue-500">Edit Product</button>

        <hr />
        <br />

        
      </form>
    </div>
  );
};

export default FormEditProduct;
