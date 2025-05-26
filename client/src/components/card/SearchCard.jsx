import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text,setText] = useState("");
  const [categorySelected,setCategorySelected] = useState([])
  const [price,setPrice] = useState([100,30000])
  const [ok,setOk] = useState(false)
  
//   console.log(categories);
  useEffect(()=>{
    getCategory()
    
  },[])

  
  //Step 1 Search Text
    // console.log(text);
    useEffect(()=>{
        const delay = setTimeout(()=>{
            
        
            if(text){
                actionSearchFilters({ query: text })
            } else{
                getProduct();
            }

        },300)

        return ()=> clearTimeout(delay)
            
        
    },[text])
  //Step 2 Search by Category
    const handleCheck = (e)=>{
        // console.log(e.target.value);
        const inCheck = e.target.value  // ค่าที่เลือก
        const inState =[...categorySelected] //[]
        const fileCheck = inState.indexOf(inCheck) //ถ้าไม่เจอ จะ return -1
        
        if(fileCheck === -1){
            inState.push(inCheck)
            
        }else{
            inState.splice(fileCheck,1)
            
        }
        setCategorySelected(inState)
        
        
        if(inState.length > 0){
            actionSearchFilters({ category: inState })
           
        }else{
             getProduct();
        }
    }
    // console.log(categorySelected);


  //Step 3 Search by Price
    useEffect(()=>{
        actionSearchFilters({ price })
    },[ok])
    const handlePrice =(value)=>{
        console.log(value)
        setPrice(value)
        setTimeout(()=>{
            setOk(!ok)
        },300)
    }




  return (
        <div>
            <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
            {/* Search by Text */}
            <input 
            onChange={(e)=>setText(e.target.value)}
            type="text"
            placeholder="ค้นหาสินค้า..."
            className="border rounded-md w-full mb-4 px-2 " />
            
            <hr />
            {/* Search by Category */}
            <div>
                <h1 className="text-xl font-bold mb-4">หมวดหมู่สินค้า</h1>
                <div>
                    {
                        categories.map((item,index)=>
                            <div className="flex gap-2 "key={item.id}>
                                <input 
                                    onChange={handleCheck}
                                    value={item.id}
                                    type="checkbox" />
                                <label>{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            <hr />
                    {/* Search by Price */}
            <div>
                <h1>ค้นหาราคา</h1>
                <div>
                    <div className="flex justify-between">
                        <span>Min : {numberFormat(price[0])}</span>
                        <span>Max : {numberFormat(price[1])}</span>
                    </div>


                    <Slider
                    onChange={handlePrice}
                    range
                    min={0}
                    max={50000}
                    defaultValue={[100,30000]}
                    />
                </div>
            </div>

        </div>
  )
};

export default SearchCard;
