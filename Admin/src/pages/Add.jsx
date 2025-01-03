import React, { useState } from 'react';
import { assets } from '../assets/assests';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prices, setPrices] = useState({ "250g": "", "500g": "", "1kg": "" }); // Store prices for each size
  const [category, setCategory] = useState('Veg');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', JSON.stringify(Object.values(prices))); // Send the prices as an array
      formData.append('category', category);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post("https://pickels-app-1.onrender.com" + '/api/product/add', formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset fields after successful submission
        setName('');
        setDescription('');
        setPrices({ "250g": "", "500g": "", "1kg": "" });
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div className="flex flex-col w-full gap-3 items-start">
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Pickle name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Pickle description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here..."
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Pickle Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Veg pickle">VEG PICKLES</option>
            <option value="Non_Veg pickle">NON-VEG PICKLES</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Pickle Prices</p>
          <div className="flex gap-3">
            {["250g", "500g", "1kg"].map((size) => (
              <div key={size}>
                <p className="mb-1">{size}</p>
                <input
                  onChange={(e) => setPrices((prev) => ({ ...prev, [size]: e.target.value }))}
                  value={prices[size]}
                  className="w-full px-3 py-2 sm:w-[120px]"
                  type="number"
                  placeholder={`Price for ${size}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2">Pickle Sizes</p>
        <div className="flex gap-3">
          {["250g", "500g", "1kg"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                )
              }
            >
              <p
                className={`${sizes.includes(size) ? "bg-green-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          Added to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-2 mt-4 bg-green-300 text-black">
        ADD
      </button>
    </form>
  );
};

export default Add;
