import React, { useState } from 'react';
import { toast } from 'react-toastify';

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      // Input is empty, show error toast
      toast.error('Please enter a search keyword.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      // Input is not empty, perform search or other actions here
      toast.success('Please wait, searching.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSearchQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="hero4-search mb-15" data-aos="fade-up" data-aos-duration="2000">
          <input
            type="text"
            placeholder="Search Keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="icofont-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
