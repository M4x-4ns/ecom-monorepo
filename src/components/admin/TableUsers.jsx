import React, { useEffect, useState } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus,changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);
    
  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUserStatus =  (userId,userStatus)=>{
    console.log(userId,userStatus)
    const value ={
        id: userId,
        enabled: !userStatus
    }
    changeUserStatus(token,value)
    .then(()=>{
        handleGetUsers(token);
        toast.success('Update Status Success')
    })
    .catch((err) => {
      console.log(err);
    });

  }

  const handleChangeUserRole =  (userId,userRole)=>{
    
    const value ={
        id: userId,
        role: userRole
    }
    changeUserRole(token,value)
    .then(()=>{
        handleGetUsers(token);
        toast.success('Update Role Success')
    })
    .catch((err) => {
      console.log(err);
    });

  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>Email</th>
            {/* <th>วันที่แก้ไขล่าสุด</th> */}
            <th>สิทธ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {
          users?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
              {/* <td>{item.updatedAt}</td> */}



              <td>
                <select  
                onChange={(e)=>handleChangeUserRole(item.id,e.target.value)}
                value={item.role} >
                    <option>user</option>
                    <option>admin</option>
                </select>
              </td>



              <td>
                {item.enabled ? 'Active' : 'Inactive'}
              </td>
              <td>
                <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold  p-1  rounded-md shadow-md" onClick={() => handleChangeUserStatus(item.id,item.enabled)}>
                    {item.enabled ? 'Disable' : 'Enable'}
                </button>
              </td>
              
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
