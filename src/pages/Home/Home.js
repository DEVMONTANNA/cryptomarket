import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchCrypto } from "../../utils/tokens";
import { formatNumber } from "../../utils";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    async function handleFetchCrypto() {
      setLoading(true);
      const response = await fetchCrypto();
      setData(response.data.data);
      setLoading(false);
    }
    handleFetchCrypto();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filtered data based on search
  const filteredData = data.filter((crypto) =>
    crypto.name.long.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrev = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  return (
    <main>
      <div className="displayTextContainer">
        <div className="displayContainer">
          <div className="displayText">
            <h1 className="diplayText1">
              Largest <br /> Crypto Marketplace
            </h1>
            <div className="pageDescription">
              <p>Welcome to the world's cryptocurrency marketplace.</p>
              <p>Sign up to explore more about cryptos.</p>
            </div>
          </div>

          <div className="searchContainer">
            <input
              className="searchInput"
              placeholder="Search crypto..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="searchBtn">Search</button>
          </div>

          <div className="tableContainer">
            {loading ? (
              <div cellpadding="10">
                <TableSkeleton />
              </div>
            ) : (
              <table cellpadding="10" cellspacing="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>7D Change</th>
                    <th>Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((crypto, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <div className="flex items-center">
                          <img
                            className="rounded-[50%] w-8"
                            src={crypto.logo.small}
                            alt={crypto.name.short}
                          />
                          <span className="ml-[10px]">{crypto.name.long}</span>
                        </div>
                      </td>
                      <td>${formatNumber(crypto.market_data.current_price)}</td>
                      <td>
                        {crypto.market_data
                          .price_change_percentage_7d_in_currency > 0 && (
                          <span className="text-[green]">
                            +
                            {formatNumber(
                              crypto.market_data
                                .price_change_percentage_7d_in_currency
                            )}
                            %
                          </span>
                        )}
                        {crypto.market_data
                          .price_change_percentage_7d_in_currency < 0 && (
                          <span className="text-[red]">
                            {formatNumber(
                              crypto.market_data
                                .price_change_percentage_7d_in_currency
                            )}
                            %
                          </span>
                        )}
                        {crypto.market_data
                          .price_change_percentage_7d_in_currency === 0 && (
                          <span className="text-[white]">
                            {formatNumber(
                              crypto.market_data
                                .price_change_percentage_7d_in_currency
                            )}
                            %
                          </span>
                        )}
                      </td>
                      <td>{formatNumber(crypto.market_data.market_cap)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Prev
            </button>

            {/* Show page numbers 1, 2, 3 */}
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`page-btn ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}

            {/* Show ellipsis if more than 3 pages */}
            {totalPages > 3 && <span className="ellipsis">...</span>}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
