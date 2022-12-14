import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSummit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSummit}
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
    >
      <div className="flex flex-row justify-start items-center ">
        <FiSearch
          className="w-5 h-5 ml-4 cursor-pointer"
          onClick={(e) => handleSummit(e)}
        />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="검색"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white  p-2.5"
        />
      </div>
    </form>
  );
};

export default Searchbar;
