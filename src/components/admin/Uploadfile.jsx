import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  //js
  const token = useEcomStore((state) => state.token);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    //code
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; //[] empty arry
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);

        //Validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image!`);
          continue;
        }
        //Image Resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint Backend

            uploadFiles(token, data)
              .then((res) => {
                console.log(res);

                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("Upload image Success!!!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  console.log(form);

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        console.log(res);
        const filterImages = images.filter((item, index) => {
          return item.public_id !== public_id;
        });
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {
          isLoading && <Loader className="animate-spin h-15 w-15 " />
        }
        
        {/* Image */}
        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img className="w-24 h-24 hover:scale-105" src={item.url} />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 bg-red-500 rounded-md"
            >
              X
            </span>
          </div>
        ))}
      </div>

      <div>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
          className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
};

export default Uploadfile;
