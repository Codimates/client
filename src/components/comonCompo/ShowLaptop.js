import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import HomePageBanner from "./HomePageBanner";

export default function ShowLaptop() {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [approvedBrands, setApprovedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);

  const scrollContainerRef = useRef(null);

  


  // Fetch laptops from the API
  const getLaptops = async () => {
    try {
      const response = await axios.get("/inventory/getaddsiteistrue");
      setLaptops(response.data);
      setFilteredLaptops(response.data);
    } catch (error) {
      console.error("Can't get laptops:", error);
    }
  };

  // Fetch brands from the API
  const getBrands = async () => {
    try {
      const response = await axios.get("/inventory/brand/getallbrands");
      setApprovedBrands(response.data);
    } catch (error) {
      console.error("Can't get approved brands:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    getBrands();
    getLaptops();
  }, []);

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedBrand(brand);
    const filtered = brand 
      ? laptops.filter(laptop => laptop.brand_name.toLowerCase() === brand.brandname.toLowerCase())
      : laptops;
    setFilteredLaptops(filtered);
  };

  // Handle search
  const handleSearch = () => {
    const filtered = laptops.filter(laptop => 
      laptop.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.model_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLaptops(filtered);
    setSelectedBrand(null);
  };

  // Handle "Next" button click
  const handleNextSlide = (imagesLength) => {
    setCurrentSlide((prev) => (prev + 1) % imagesLength);
  };

  // Handle "Previous" button click
  const handlePreviousSlide = (imagesLength) => {
    setCurrentSlide((prev) => (prev - 1 + imagesLength) % imagesLength);
  };

  return (
    <div>
      <div>
        
        <div className="pt-[-200px]">
          <HomePageBanner/>
        </div>
        
        <div className="pt-10 mb-6 text-center">
          <h2 className="text-3xl font-bold text-orange-500">Explore Popular Brands</h2>
        </div>
        <div className="relative py-6 bg-[#19191A] bg-opacity-25">
      <div className="flex justify-center px-4 md:px-0">
        

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 px-4 py-4 overflow-x-auto md:overflow-hidden scrollbar-hide"
        >
          {loading ? (
            <div className="flex justify-center w-full">
              <div className="w-5 h-5 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* "All Brands" Option */}
              <div
                key="all-brands"
                className={`relative  flex-shrink-0 h-[70px] w-[70px] transition-transform duration-200 rounded-full hover:scale-110 ${
                  selectedBrand === null ? "border-4 border-orange-500" : ""
                }`}
                onClick={() => handleBrandSelect(null)}
              >
                <div className="flex items-center justify-center w-full h-full bg-[#19191A] border-2 border-gray-300 rounded-full">
                  <span className="text-sm font-semibold text-[#747474]">-All-</span>
                </div>
              </div>

              {/* Brand Logos */}
              {approvedBrands.length > 0 ? (
                approvedBrands.map((brand) => (
                  <div
                    key={brand._id}
                    className={`relative flex-shrink-0 h-[70px] w-[70px] transition-transform duration-200 rounded-full hover:scale-110 ${
                      selectedBrand && selectedBrand.brandname === brand.brandname
                        ? "border-4 border-orange-500"
                        : ""
                    }`}
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand.brandlogo ? (
                      <img
                        src={brand.brandlogo}
                        alt={brand.brandname}
                        className="object-cover w-full h-full border-2 border-gray-300 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-300 border-2 border-orange-500 rounded-full">
                        <span className="text-xs text-gray-500">No Logo</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white bg-[#19191A] rounded-full opacity-0 bg-opacity-80 hover:opacity-100">
                      {brand.brandname}
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="text-gray-500">No brands available</h3>
              )}
            </>
          )}
        </div>

        
      </div>
    </div>
        
        {/* Search Section */}
        <div className="flex justify-center my-4">
          <input 
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter Brand name, Model name....."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="px-4 py-2 bg-[#19191A] text-white rounded-r-md hover:bg-gray-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Laptops Display Section */}
      <div className="flex flex-wrap justify-center gap-4">
        {filteredLaptops.length > 0 ? (
          filteredLaptops.map((inventory) => (
            <div
              key={inventory._id}
              className="p-4 mb-4 border rounded-lg"
            >
              <div className="flex flex-col items-center">
                {/* Display first image from array */}
                {inventory.images?.[0] && (
                  <img
                    src={inventory.images[0]}
                    alt={inventory.brand_name}
                    className="object-contain w-[300px] h-[300px] mb-2 border-2 border-orange-500 rounded-lg"
                  />
                )}

                {/* Laptop Details */}
                <h3 className="text-lg font-semibold text-center">
                  {inventory.brand_name}
                </h3>
                <p className="text-black text-opacity-50">{inventory.model_name}</p>
                <div>
                  <button
                    className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                    onClick={() => {
                      setSelectedLaptop(inventory);
                      setCurrentSlide(0);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-gray-500">No laptops found</h3>
        )}
      </div>

      {/* Modal for Slideshow (Unchanged from previous code) */}
      {selectedLaptop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-4xl p-6 bg-white rounded-lg">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                className="text-2xl text-gray-900 hover:text-red-600 top-4 right-4"
                onClick={() => setSelectedLaptop(null)}
              >
                <IoIosClose className="size-8"/>
              </button>
            </div>

            {/* Slideshow */}
            <div className="relative">
              {selectedLaptop.images?.[currentSlide] && (
                <img
                  src={selectedLaptop.images[currentSlide]}
                  alt={`${selectedLaptop.brand_name} Slide ${currentSlide + 1}`}
                  className="object-contain w-full h-[500px] rounded-lg"
                />
              )}

              {/* Navigation Buttons - Only show if there are multiple images */}
              {selectedLaptop.images?.length > 1 && (
                <>
                  <button
                    onClick={() => handlePreviousSlide(selectedLaptop.images.length)}
                    className="absolute p-2 text-white -translate-y-1/2 bg-gray-700 rounded-full left-2 top-1/2 hover:bg-gray-900"
                  >
                    <IoIosArrowBack className="size-6" />
                  </button>
                  <button
                    onClick={() => handleNextSlide(selectedLaptop.images.length)}
                    className="absolute p-2 text-white -translate-y-1/2 bg-gray-700 rounded-full right-2 top-1/2 hover:bg-gray-900"
                  >
                    <IoIosArrowForward className="size-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            {selectedLaptop.images?.length > 1 && (
              <div className="mt-2 text-center">
                <div className="flex items-center justify-center gap-2 mt-2">
                  {selectedLaptop.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index ? "bg-orange-500" : "bg-gray-300"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Laptop Details */}
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-semibold text-orange-500">
                {selectedLaptop.brand_name}
              </h2>
              <p>{selectedLaptop.model_name}</p>
              <p className="font-medium text-green-600">
                Price: ${selectedLaptop.price}
              </p>
              <p>RAM: {selectedLaptop.ram}</p>
              <p>Processor: {selectedLaptop.processor}</p>
              <p>
                Graphics Card: {selectedLaptop.graphics_card || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}