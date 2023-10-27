// ShopTagFilter.tsx
import { useCafeuContext } from "@/context/CafeuContext";
import React from "react";

const ShopTagFilter = () => {
  const { selectedTags, handleTagChange } = useCafeuContext()
   const categories = [
    'Appetizers',
    'Salads',
    'Entrees',
    'Sides',
    'Beverages',
    'Desserts',
    'Specials',
  ];

  return (
    <div className="sidebar-single mb-50" data-aos="fade-up" data-aos-duration="3000">
      <h4 className="sidebar-title mb-25">Product Tags</h4>
      <ul className="sidebar-tags">
        {categories.map((category) => (
          <li
          key={category}
          className={selectedTags.includes(category) ? 'active' : ''}
          onClick={() => handleTagChange(category)} // Change this line
        >
          {category}
        </li>
        
        ))}
      </ul>
    </div>
  );
};

export default ShopTagFilter;
