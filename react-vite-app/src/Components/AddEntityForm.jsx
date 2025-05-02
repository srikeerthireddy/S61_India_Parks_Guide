import React, { useState } from "react";

function AddEntityForm() {
  const [formData, setFormData] = useState({
    state: "",
    name: "",
    location: "",
    formed: "",
    notableFeatures: "",
    fauna: "",
    floraAndFauna: "",
    riversAndLakes: "",
    created_by: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });
    
    try {
      console.log("Form Data:", formData);

      const response = await fetch(
        "https://s61-india-parks-guide-1.onrender.com/api/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Entity added successfully:", data);
        setSubmitStatus({ 
          type: "success", 
          message: `Successfully added ${formData.name} to the database!` 
        });
        
        // Reset form
        setFormData({
          state: "",
          name: "",
          location: "",
          formed: "",
          notableFeatures: "",
          fauna: "",
          floraAndFauna: "",
          riversAndLakes: "",
          created_by: "",
        });
      } else {
        throw new Error(data.message || "Failed to add national park");
      }
    } catch (error) {
      console.error("Error adding entity:", error.message);
      setSubmitStatus({ 
        type: "error", 
        message: `Error: ${error.message || "Failed to add national park"}` 
      });
    } finally {
      setIsSubmitting(false);
      // Auto-clear success message after 5 seconds
      if (submitStatus.type === "success") {
        setTimeout(() => {
          setSubmitStatus({ type: "", message: "" });
        }, 5000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-emerald-700 py-6 px-8">
            <h2 className="text-3xl font-bold text-white text-center">Add New National Park</h2>
            <p className="text-emerald-100 text-center mt-2">
              Contribute to India's National Parks database by adding a new entry
            </p>
          </div>
          
          {/* Status Messages */}
          {submitStatus.message && (
            <div className={`px-6 py-4 mx-6 mt-6 rounded-md ${
              submitStatus.type === "success" 
                ? "bg-green-100 text-green-800 border border-green-300" 
                : "bg-red-100 text-red-800 border border-red-300"
            }`}>
              <div className="flex items-center">
                {submitStatus.type === "success" ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {submitStatus.message}
              </div>
            </div>
          )}
          
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Park Name */}
              <div className="col-span-1">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Park Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Jim Corbett National Park"
                  required
                />
              </div>
              
              {/* Formed Year */}
              <div className="col-span-1">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="formed">
                  Year Established
                </label>
                <input
                  type="number"
                  id="formed"
                  name="formed"
                  value={formData.formed}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. 1936"
                  required
                />
              </div>
              
              {/* Location */}
              <div className="col-span-1">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Nainital, Uttarakhand"
                  required
                />
              </div>
              
              {/* State */}
              <div className="col-span-1">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="state">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Uttarakhand"
                  required
                />
              </div>
              
              {/* Flora */}
              <div className="col-span-1">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="floraAndFauna">
                  Flora
                </label>
                <input
                  type="text"
                  id="floraAndFauna"
                  name="floraAndFauna"
                  value={formData.floraAndFauna}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Sal, Khair, Sissoo"
                />
              </div>
              
              {/* Fauna */}
              <div className="col-span-1">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="fauna">
                  Fauna
                </label>
                <input
                  type="text"
                  id="fauna"
                  name="fauna"
                  value={formData.fauna}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Tiger, Elephant, Leopard (comma separated)"
                />
                <p className="mt-1 text-sm text-gray-500">For multiple animals, separate with commas</p>
              </div>
              
              {/* Notable Features */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="notableFeatures">
                  Notable Features
                </label>
                <textarea
                  id="notableFeatures"
                  name="notableFeatures"
                  value={formData.notableFeatures}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe any special features of this national park"
                  required
                ></textarea>
              </div>
              
              {/* Rivers and Lakes */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="riversAndLakes">
                  Rivers and Lakes
                </label>
                <input
                  type="text"
                  id="riversAndLakes"
                  name="riversAndLakes"
                  value={formData.riversAndLakes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Ramganga River, Kosi River"
                  required
                />
              </div>
              
              {/* Created By */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="created_by">
                  Your Name
                </label>
                <input
                  type="text"
                  id="created_by"
                  name="created_by"
                  value={formData.created_by}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your name as contributor"
                  required
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium text-lg
                  shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 
                  focus:ring-emerald-500 focus:ring-offset-2 transition duration-300
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Add National Park'
                )}
              </button>
            </div>
          </form>
          
          {/* Form Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              All entries are reviewed for accuracy. Please provide complete and accurate information.
            </p>
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-emerald-800 mb-4">Tips for Adding a National Park</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Include the official full name of the national park</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>For fauna entries, separate different species with commas</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Add notable features that make this national park unique</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Provide your name as the contributor for proper attribution</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddEntityForm;