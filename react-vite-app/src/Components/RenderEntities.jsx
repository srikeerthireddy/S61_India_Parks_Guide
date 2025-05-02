import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RenderEntities() {
  const [entities, setEntities] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const [createdBy, setCreatedBy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch entities from the server
    setIsLoading(true);
    axios
      .get("https://s61-india-parks-guide-1.onrender.com/api/read")
      .then((response) => {
        setEntities(response.data.data); // Set the entities in the state
        const selectedCreatedBy = response.data.data.reduce((curr, item) => {
          if (!curr.includes(item.created_by)) {
            curr.push(item.created_by);
          }
          return curr;
        }, []);
        setCreatedBy(selectedCreatedBy);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching entities:", error);
        setError("Failed to load national parks. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this national park?")) {
      axios
        .delete(`https://s61-india-parks-guide-1.onrender.com/api/delete/${id}`)
        .then((response) => {
          // Update entities state after deletion
          setEntities(entities.filter((entity) => entity._id !== id));
          console.log("Entity deleted successfully:", response.data);
        })
        .catch((error) => {
          console.log("Error deleting entity:", error);
          alert("Failed to delete. Please try again.");
        });
    }
  };

  const handleUpdate = (item) => {
    navigate("/update/:id", { state: item });
  };

  const handleFilterChange = (e) => {
    setFilteredData(e.target.value);
  };

  const filteredEntities = filteredData
    ? entities.filter((item) => item.created_by === filteredData)
    : entities;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-600 border-opacity-75"></div>
          <p className="mt-4 text-lg text-emerald-800 font-medium">Loading national parks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center bg-red-100 p-8 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-800 text-lg font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Parks of India</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore our comprehensive database of India's magnificent national parks. 
            Each entry contains detailed information about location, features, and biodiversity.
          </p>
        </div>
        
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <label htmlFor="creatorFilter" className="text-gray-700 font-medium mr-3">Filter by Creator:</label>
              <select
                id="creatorFilter"
                value={filteredData}
                onChange={handleFilterChange}
                className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Contributors</option>
                {createdBy.map((creator, index) => (
                  <option key={index} value={creator}>
                    {creator}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Showing:</span>
              <span className="bg-emerald-100 text-emerald-800 py-1 px-3 rounded-full font-medium">
                {filteredEntities.length} Parks
              </span>
            </div>
          </div>
        </div>
        
        {/* Park Cards Grid */}
        {filteredEntities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntities.map((entity) => (
              <div key={entity._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                {/* Park Header */}
                <div className="bg-emerald-700 p-4">
                  <h2 className="text-xl font-bold text-white truncate">{entity.name}</h2>
                  <div className="flex justify-between items-center mt-1">
                    <span className="bg-emerald-100 text-emerald-800 text-sm py-1 px-2 rounded-full font-medium">
                      {entity.state}
                    </span>
                    <span className="text-emerald-100 text-sm">Est. {entity.formed}</span>
                  </div>
                </div>
                
                {/* Park Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">LOCATION</h3>
                      <p className="text-gray-800">{entity.location}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">NOTABLE FEATURES</h3>
                      <p className="text-gray-800">{entity.notableFeatures}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">FAUNA</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {entity.fauna && Array.isArray(entity.fauna) ? (
                          entity.fauna.map((animal, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded-full">
                              {animal}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-800">
                            {typeof entity.fauna === 'string' ? entity.fauna : JSON.stringify(entity.fauna)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">RIVERS AND LAKES</h3>
                      <p className="text-gray-800">{entity.riversAndLakes}</p>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Added by: <span className="font-medium ml-1">{entity.created_by}</span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleUpdate(entity)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition duration-300 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entity._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No national parks found</h3>
            <p className="text-gray-600 mb-4">
              {filteredData 
                ? `No parks created by ${filteredData} were found.` 
                : "There are no national parks in the database yet."}
            </p>
            <button 
              onClick={() => setFilteredData("")} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              View All Parks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RenderEntities;