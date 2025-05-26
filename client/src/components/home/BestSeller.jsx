import React,{useState,useEffect} from 'react'
import { listproductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShow from '../../utils/SwiperShow'
import { SwiperSlide } from 'swiper/react'

const BestSeller = () => {
    const [data,setData] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = ()=>{
        listproductBy('sold','desc',12)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div >
        <SwiperShow>
        {
            data?.map((item,index)=>(
                <SwiperSlide>
                    <ProductCard item={item} key={index}/>

                </SwiperSlide>
            ))}
    </SwiperShow>
    </div>
    
  )
}

export default BestSeller