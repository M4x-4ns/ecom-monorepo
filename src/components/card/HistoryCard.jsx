import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  //   console.log(token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlgetOrders(token);
  }, []);

  const hdlgetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) =>{
    switch(status){
      case "Not Process":
        return "bg-gray-200"
      case "Processing":
        return "bg-yellow-200"
      case "Completed":
        return "bg-green-200"
      case "Cancelled":
        return "bg-red-200"
      
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>

      <div className="space-y-4">
        {/* Card */}
        {orders?.map((item, index) => {
          // console.log(item)
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              {/* header */}
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm ">Order date</p>
                  <p className=" font-bold">{dateFormat(item.updatedAt)}</p>
                </div>

                <div>
                   <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full text-sm`}>
                    {item.orderStatus}
                    </span>
                </div>
              </div>

              {/* table */}
              <div>
                <table className="border-gray-500 border-2 w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>สินค้า</th>
                      <th>ราคา</th>
                      <th>จำนวน</th>
                      <th>รวม</th>
                    </tr>
                  </thead>

                  <tbody>
                    {item.products?.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td>{numberFormat(product.product.price)}</td>
                          <td>{product.count}</td>
                          <td>{numberFormat(product.product.price * product.count)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div>
                <div className="text-right">
                  <p>ราคาสุทธิ</p>
                  <p>{numberFormat(item.cartTotal)} บาท</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
