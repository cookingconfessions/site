import { useCafeuContext } from '@/context/CafeuContext';
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const ShopTopSortingSection= () => {
  const {
    startIndex,
    endIndex,
    setSortingOption,
    sortingOption,
    filteredProducts,
    itemsPerPage,
  } = useCafeuContext()
  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortingOption = e.target.value;
    // Update the sorting option in the parent component's state using setSortingOption
    setSortingOption(selectedSortingOption);
  };

  // Update startIndex and endIndex whenever filteredProducts change
  useEffect(() => {
    const newEndIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
    // Update the endIndex value based on the newEndIndex
    // You should have a function or prop to update these values in the parent component
  }, [startIndex, filteredProducts]);

  return (
    <div className="shop-notice-result-wrapper mb-50">
      <div className="row align-items-center">
        <div
          className="col-md-8 text-center text-md-start"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <span className="shop-notice-result">
          {`${filteredProducts.length === 0 ? 'No Products to Show' : `Showing ${startIndex + 1}-${endIndex} of ${filteredProducts.length} Products`}`}
          </span>
        </div>
        <div
          className="col-md-4 text-center text-md-end"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <div className="shop-notice-select">
            <Form.Select value={sortingOption} onChange={handleSortingChange}>
              <option value="default">Default Sorting</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
              <option value="sortAToZ">Sort A to Z</option>
              <option value="sortZToA">Sort Z to A</option>
            </Form.Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopTopSortingSection;
