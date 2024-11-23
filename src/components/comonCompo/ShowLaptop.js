import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosClose } from "react-icons/io";

export default function ShowLaptop() {
  const [Laptop, setLaptop] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState(null);

  // Fetch laptops from the API
  const getLaptop = async () => {
    try {
      const response = await axios.get("/inventory/getalllaps");
      setLaptop(response.data);
    } catch (error) {
      console.error("Can't get laptops:", error);
    }
  };

  useEffect(() => {
    getLaptop();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4">
        {Laptop.length > 0 ? (
          Laptop.map((inventory) => (
            <div
              key={inventory._id}
              className="p-4 mb-4 border rounded-lg"
            >
              <div className="flex flex-col items-center">
                {/* Display S3 image */}
                {inventory.images && (
                  <img
                    src={inventory.images}
                    alt={inventory.brand_name}
                    className="object-contain w-[400px] h-[500px] mb-2 border-2 border-orange-500 rounded-lg"
                  />
                )}

                {/* Laptop Details */}
                <h3 className="text-lg font-semibold text-center">
                  {inventory.brand_name}
                </h3>
                <p className="text-black text-opacity-50">{inventory.model_name}</p>
                <div>
                  {/* View Button */}
                  <button
                    className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                    onClick={() => setSelectedLaptop(inventory)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-gray-500">Loading...</h3>
        )}
      </div>

      {/* Modal for Details */}
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

            {/* Single Image Display */}
            <div className="relative">
              {selectedLaptop.images && (
                <img
                  src={selectedLaptop.images}
                  alt={selectedLaptop.brand_name}
                  className="object-contain w-full h-[500px] rounded-lg"
                />
              )}
            </div>

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