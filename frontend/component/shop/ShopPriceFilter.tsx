import React from "react";
import { Slider } from "@mui/material";
import { useCafeuContext } from "@/context/CafeuContext";

const ShopPriceFilter= () => {
  const {priceRange,setPriceRange,handlePriceChange} = useCafeuContext()
  return (
    <div
      className="sidebar-single mb-50"
      data-aos="fade-up"
      data-aos-duration="2500"
    >
      <h4 className="sidebar-title mb-25">Price Filter</h4>
      <div className="price-filter-wrap">
        <div className="input-wrap">
          <div className="input-group">
            <span className="input-txt">$</span>
            <input
              type="number"
              id="minNumber"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseFloat(e.target.value), priceRange[1]])
              }
            />
          </div>
          <div className="input-group">
            <span className="input-txt">$</span>
            <input
              type="number"
              id="maxNumber"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseFloat(e.target.value)])
              }
            />
          </div>
        </div>
        <div id="priceFilter" className="price-filter">
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            sx={{
              color: "#cc3333", // Replace with your desired color
              "& .MuiSlider-thumb": {
                border: "1px solid #cc3333",
                color: "#fff",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPriceFilter;
