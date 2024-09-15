import React, { useEffect, useState } from "react";
import { fetchCrypto } from "../../utils/tokens";
import { formatNumber } from "../../utils";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [marketCapFilter, setMarketCapFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch crypto data
  useEffect(() => {
    async function handleFetchCrypto() {
      setLoading(true);
      const response = await fetchCrypto();
      setData(response.data.data);
      setLoading(false);
    }
    handleFetchCrypto();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleMarketCapChange = (e) => {
    setMarketCapFilter(e.target.value);
    setCurrentPage(1);
  };

  // Filter by search term and market cap
  const filteredData = data.filter((crypto) => {
    const matchesSearch = crypto.name.long
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesMarketCap = (() => {
      if (marketCapFilter === "Low")
        return crypto.market_data.market_cap <= 1e9; // Below 1 billion
      if (marketCapFilter === "Medium")
        return (
          crypto.market_data.market_cap > 1e9 &&
          crypto.market_data.market_cap <= 1e11
        ); // Between 1 billion and 100 billion
      if (marketCapFilter === "High")
        return crypto.market_data.market_cap > 1e11; // Above 100 billion
      return true; // "All"
    })();

    return matchesSearch && matchesMarketCap;
  });

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
    <main className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Largest <br /> Crypto Marketplace
          </h1>
          <p className="text-sm">
            Welcome to the world's cryptocurrency marketplace.
          </p>
          <p className="text-sm">Sign up to explore more about cryptos.</p>
        </div>

        {/* Filter */}
        <div className="flex">
          {/* Search Input */}
          <div className="relative mb-8">
            <label className="block text-sm mb-2">Filter by coin name:</label>
            <input
              className="w-50 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Filter crypto..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Market Cap Filter */}
          <div className="mb-8 ml-2">
            <label className="block text-sm mb-2">Filter by market cap:</label>
            <select
              value={marketCapFilter}
              onChange={handleMarketCapChange}
              className="w-50 px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All</option>
              <option value="Low">Low (below $1B)</option>
              <option value="Medium">Medium ($1B - $100B)</option>
              <option value="High">High (above $100B)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          {loading ? (
            <div className="p-4">
              <TableSkeleton />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-400">Coin not found</p>
            </div>
          ) : (
            <table className="min-w-full bg-gray-700 text-left border border-gray-600">
              <thead className="bg-gray-600">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Coin</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">7D Change</th>
                  <th className="py-3 px-4">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((crypto, index) => (
                  <tr key={index} className="border-t border-gray-600">
                    <td className="py-3 px-4">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={crypto.logo.small}
                          alt={crypto.name.short}
                        />
                        <span className="ml-3">{crypto.name.long}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      ${formatNumber(crypto.market_data.current_price)}
                    </td>
                    <td className="py-3 px-4">
                      {crypto.market_data
                        .price_change_percentage_7d_in_currency > 0 ? (
                        <span className="text-green-400">
                          +
                          {formatNumber(
                            crypto.market_data
                              .price_change_percentage_7d_in_currency
                          )}
                          %
                        </span>
                      ) : crypto.market_data
                          .price_change_percentage_7d_in_currency < 0 ? (
                        <span className="text-red-400">
                          {formatNumber(
                            crypto.market_data
                              .price_change_percentage_7d_in_currency
                          )}
                          %
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          {formatNumber(
                            crypto.market_data
                              .price_change_percentage_7d_in_currency
                          )}
                          %
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {formatNumber(crypto.market_data.market_cap)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page numbers */}
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          ))}

          {totalPages > 3 && (
            <span className="px-4 py-2 text-gray-400">...</span>
          )}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
