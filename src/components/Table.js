import React from 'react';
import './Table.css'; // Import the CSS file for styling

const Table = ({ data, itemsPerPage, searchTerm }) => {
  const [currentPage, setCurrentPage] = React.useState(1); // State to track the current page

  // Filter data based on the search term
  const filteredData = data.filter(item =>
    item.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="table-container">
      {filteredData.length === 0 && searchTerm === '' && (
        <div className="no-results">Start searching</div>
      )}
      {filteredData.length === 0 && searchTerm !== '' && (
        <div className="no-results">No result found</div>
      )}
      {filteredData.length > 0 && (
        <>
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Place Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.place}</td>
                  <td>
                    <img
                      src={`https://flagsapi.com/${item.country}/shiny/24.png`}
                      alt={item.country}
                      className="flag"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {filteredData.length > 0 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;

