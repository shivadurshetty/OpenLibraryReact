import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './Search';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://openlibrary.org/search.json?author=tolkien&limit=10&page=1")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); 
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data) {
    return null;
  }

  const array = data.docs;

  const searchHandler = (search) => {
    setSearch(search);
    if (search !== "") {
      const newBookList = array.filter((book) =>
        Object.values(book)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setSearchResults(newBookList);
    } else {
      setSearchResults(array);
    }
  };

  return (
    <div className='Container' style={{ textAlign: "center" }}>
      <Search term={search} searchKeyword={searchHandler} />
      
      <ul className='list'>
        {searchResults.map((item, i) => (
          <li key={i} className='list-item'>
            <i className='fa fa-book'></i> &nbsp;
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
