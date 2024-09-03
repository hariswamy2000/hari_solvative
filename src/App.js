import React, { useState, useEffect, useCallback, useRef } from 'react'; // Add useRef import
import apiService, { fetchPlaceDistance } from './services/apiService'; // Import the API service
import debounce from 'lodash.debounce';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import './App.css'; // Import any global styles

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [limit, setLimit] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [distanceData, setDistanceData] = useState(null); // State to hold distance data
  const searchInputRef = useRef(null); // Initialize useRef for search input

  const fetchData = async (searchTerm, limit) => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.get('/cities', {
        params: { namePrefix: searchTerm, limit },
      });
      setData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);

  useEffect(() => {
    if (searchTerm !== '') {
      debouncedFetchData(searchTerm, limit);
    } else {
      setData([]);
    }
  }, [searchTerm, limit, debouncedFetchData]);

  const handleItemsPerPageChange = (e) => {
    const value = Math.min(Math.max(Number(e.target.value), 1), 10);
    setItemsPerPage(value);
  };

  const handleLimitChange = (e) => {
    const value = Math.min(Math.max(Number(e.target.value), 1), 10);
    if (value > 10) {
      setError('Limit cannot be more than 10');
    } else {
      setError('');
      setLimit(value);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Function to fetch distance data
  const getDistance = async () => {
    try {
      // Example usage: Fetch distance from 'ChIJN1t_tDeu2s' (a valid place ID) to 'Q60' with distance unit 'MI'
      const distanceData = await fetchPlaceDistance('ChIJN1t_tDeu2s', 'Q60', 'MI');
      console.log('Distance Data:', distanceData);
    } catch (error) {
      console.error('Failed to fetch distance:', error);
    }
  };
  
  getDistance();
  

  // Call getDistance on component mount (or based on some action/event)
  useEffect(() => {
    getDistance();
  }, []);

  return (
    <div className="app">
      <div className="search-and-table">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          searchInputRef={searchInputRef} 
          handleLimitChange={handleLimitChange}
        />
        {loading && <div className="spinner">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        <Table 
          data={data} 
          itemsPerPage={itemsPerPage} 
          searchTerm={searchTerm} 
        />
        <div className="pagination-controls">
          <label>
            Items per page:
            <input
              type="number"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              min="1"
              max="10"
            />
          </label>
          <label style={{ marginLeft: '20px' }}>
            Limit:
            <input
              type="number"
              value={limit}
              onChange={handleLimitChange}
              min="1"
              max="10"
            />
          </label>
        </div>
        {/* Display distance data if available */}
        {distanceData && (
          <div className="distance-info">
            <h2>Distance Information</h2>
            <pre>{JSON.stringify(distanceData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
