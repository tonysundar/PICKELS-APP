import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopeContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { ProductId } = useParams();
  const { products, currency, addToCart } = useContext(ShopeContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(""); // Default image
  const [size, setSize] = useState(""); // Default size
  const [price, setPrice] = useState(0); // Default price

  // Fetch product data
  const fetchProductData = () => {
    const product = products.find((item) => item._id === ProductId);
    if (product) {
      setProductData(product);
      setImage(product.images[0]); // Set the first image by default
      setSize(product.sizes[0]); // Set the first size as the default size
      setPrice(product.price[0]); // Set the default price based on the first size
    }
  };

  // Update size and price when a size is selected
  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
    const index = productData.sizes.indexOf(selectedSize);
    if (index !== -1) {
      setPrice(productData.price[index]); // Set price based on selected size
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [ProductId]);

  return productData ? (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image Section */}
        <div className="flex-1">
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-3.5" />
            ))}
            <p className="pl-2">(133)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            Starting AT {currency} {price}
          </p>
          <p className="mt-5 text-gray-500">{productData.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>SELECT SIZE</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => handleSizeChange(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-green-600" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            // Disable button if no size is selected
            className={`px-8 py-3 ${
              size
                ? "bg-green-500 text-black active:bg-cyan-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Online Booking via WhatsApp is Available</p>
            <p>Courier Service is Available</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
