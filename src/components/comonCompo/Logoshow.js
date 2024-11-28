import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Logoshow() {
  const [approvedBrands, setApprovedBrands] = useState([]);

  // Fetch brands from the API
  const getBrands = async () => {
    try {
      const response = await axios.get("/inventory/brand/getallbrands");
      setApprovedBrands(response.data);
    } catch (error) {
      console.error("Can't get approved brands:", error);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="p-4">
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-6">
          {approvedBrands.length > 0 ? (
            approvedBrands.map((brand) => (
              <div
                key={brand._id}
                className="flex-shrink-0 text-orange-500 border rounded-lg"
              >
                <div className="flex flex-col items-center">
                  {brand.brandlogo && (
                    <img
                      src={brand.brandlogo}
                      alt={brand.brandname}
                      className="object-contain w-16 h-16 mb-2 border-2 border-orange-500 rounded-full"
                    />
                  )}
                  <h3 className="text-sm font-semibold text-center">
                    {brand.brandname}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-gray-500">No brands available</h3>
          )}
        </div>
      </div>
    </div>
  );
}
