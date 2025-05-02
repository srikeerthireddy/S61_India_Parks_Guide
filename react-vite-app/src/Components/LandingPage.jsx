import React from 'react';
import kite from '../../images/kite.svg'
import nature from '../../images/nature.jpg'

const NationalParksLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-96 md:h-150" style={{ backgroundImage: `url(${nature})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-6 py-16 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover India's Natural Treasures
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Explore the majestic national parks of India and their breathtaking biodiversity
          </p>
          <div className="mt-8">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mr-4">
              Explore Parks
            </button>
            <button className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              About Project
            </button>
          </div>
        </div>
      </header>

      {/* Mission Statement */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to our National Parks portal, a sanctuary celebrating
            the unparalleled beauty and ecological diversity found within these protected
            landscapes. From the majestic peaks of the Himalayas to the pristine shores of remote islands,
            each national park tells a unique story of nature's resilience and wonder.
          </p>
        </div>
      </section>


      {/* Project Goals */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src={kite} alt="National Park" className="rounded-lg shadow-lg mx-auto" />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Project Goals</h2>
            <p className="text-gray-700 mb-4">
              This project aims to create a comprehensive and user-friendly database of national parks in India. 
              It provides detailed information about each national park, including its location, formation date, 
              notable features, flora and fauna, and waterways.
            </p>
            <p className="text-gray-700 mb-6">
              We're committed to promoting conservation awareness and inspiring visitors to appreciate and protect 
              these natural treasures for future generations.
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>


      {/* Newsletter */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">Stay Updated</h2>
          <p className="text-gray-700 mb-8">
            Subscribe to our newsletter for the latest updates on India's national parks, 
            conservation efforts, and travel guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 sm:flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900  text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ASAP Project</h3>
              <p className="text-emerald-200">
                Celebrating and preserving India's natural heritage through comprehensive information and awareness.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-right font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-right flex justify-end gap-5 text-xl font-semibold text-emerald-200">
                <li><a href="#" className="hover:text-white transition duration-300">Home</a></li>
                <li><a href="/add-entity" className="hover:text-white transition duration-300">Add Entity</a></li>
                <li><a href="/all-entities" className="hover:text-white transition duration-300">all-entities</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 mt-10 pt-6 text-center text-emerald-200">
            <p>&copy; 2025 ASAP Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NationalParksLandingPage;