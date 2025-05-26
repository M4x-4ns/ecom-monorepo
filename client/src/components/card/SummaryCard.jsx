import React,{useState, useEffect, use} from 'react'
import { listUserCart,saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const SummaryCard = () => {
    const token = useEcomStore(state => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address , setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        hdlGetUserCart(token)

    },[])
    const hdlGetUserCart = (token)=>{
        listUserCart(token)
        .then((res)=>{
            // console.log(res)
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal)
        })
        .catch((err) => {
            console.log(err)
        })
    }    
    
    const hdlSaveAddress=()=>{     
        if(!address){
            return toast.warning('Please fill address')
        }
        saveAddress(token,address)
        .then((res)=>{
            console.log(res)
            toast.success(res.data.message)
            setAddressSaved(true)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const hdlGotoPayment=()=>{
        if(!addressSaved){
            return toast.warning('Please save address')
        }
        navigate('/user/payment')
    }
    
    console.log(products)

  return (
    <div className='mx-auto'>
        <div className='flex flex-warp gap-4'>
            {/* Left */}
            <div className='w-2/4'>
                <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                    <h1 className='text-lg font-bold'>ที่อยู่จัดส่ง</h1>
                    <textarea required onChange={(e)=>setAddress(e.target.value)}  placeholder='กรอกที่อยู่จัดส่ง' className='w-full bg-white rounded-md px-2'/>
                    <button onClick={hdlSaveAddress} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md hover:scale-105 hover:translate-y-1 hover:duration-200'>Save Address</button>
                </div>
            </div>

            {/* Right */}
            <div className='w-2/4'>
                <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                    <h1 className='text-lg font-bold'>คำสั่งซื้อของคุณ</h1>

                    {/* Item List */}

                    {
                        products?.map((item,index)=>
                            <div key={index}>
                                <div className='flex justify-between items-end'>
                                    <div>
                                        <p className='font-bold'>{item.product.title}</p>
                                        <p className='text-sm'>จำนวน: {item.count} x {numberFormat(item.product.price)}</p>
                                    </div>

                                    <div>
                                        <p className='text-red-500 font-bold'>{numberFormat(item.product.price * item.count)}</p>
                                    </div>
                                </div>
                        </div>
                        )
                    }
                    
                    
                    <hr />

                    <div>
                        <div className='flex justify-between '>
                            <p>ค่าจัดส่ง:</p>
                            <p>0.00</p>
                        </div>
                        <div className='flex justify-between '>
                            <p>ส่วนลด:</p>
                            <p>0.00</p>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <div className='flex justify-between '>
                            <p>ค่าจัดส่ง:</p>
                            <p>0.00</p>
                        </div>
                        <div className='flex justify-between '>
                            <p className='font-bold'>รวมสุทธิ:</p>
                            <p className='text-red-500 font-bold text-lg'>{numberFormat(cartTotal)}</p>
                        </div>
                    </div>
                    <hr />

                    <div >
                        <button onClick={hdlGotoPayment}  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full'>ดำเนินการชำระเงิน</button>
                    </div>
                </div>
            </div>
        </div>



    </div>
  )
}

export default SummaryCard