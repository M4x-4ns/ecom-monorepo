import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "motion/react"

const ProductCard = ({ item }) => {
  const actionAddtoCart =useEcomStore((state)=>state.actionAddtoCart);
  return (
    <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            
        >

    <div className="border rounded-md shadow-md p-2 w-55 ">
      <div>
        {item.images && item.images.length > 0 
        ? (
          <img src={item.images[0].url} className="rounded-md w-full h-40 object-cover hover:scale-110 hover:duration-200"/>
        ) 
        : (
          <div className="w-full h-40 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
            No Image
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-xl truncate">{item.title}</p>
        <p className="text-sm text-gray-500 truncate">{item.description}</p>
      </div>

      <div className="flex justify-between items-end py-2">
        <span className="text-xm font-bold">{numberFormat(item.price)}</span>
        <button onClick={()=>actionAddtoCart(item)} className="bg-blue-500 rounded-md p-2 hover:bg-blue-700 shadow-md cursor-pointer">
          <ShoppingCart />
        </button>
      </div>
    </div>
    </motion.div>
  );
};

export default ProductCard;
