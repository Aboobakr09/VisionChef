import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Calendar, Clock, Star, Video } from 'lucide-react';

const stripePromise = loadStripe('your_publishable_key');

const PremiumChefConsultation = () => {
  const [selectedChef, setSelectedChef] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const chefs = [
    {
      id: 1,
      name: "Gordon Ramsay",
      specialty: "British, French Cuisine",
      rating: 4.9,
      image: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg",
      price: 299,
    },
    {
      id: 2,
      name: "Wolfgang Puck",
      specialty: "Modern American, Austrian",
      rating: 4.8,
      image: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg",
      price: 249,
    },
    {
      id: 3,
      name: "Massimo Bottura",
      specialty: "Italian Contemporary",
      rating: 4.9,
      image: "https://images.pexels.com/photos/3298180/pexels-photo-3298180.jpeg",
      price: 279,
    }
  ];

  const handleBookSession = async (chef) => {
    setSelectedChef(chef);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    // Simulate payment process
    setTimeout(() => {
      alert('Booking confirmed! You will receive an email with the meeting details.');
      setShowPaymentModal(false);
    }, 1500);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Premium Chef Consultations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book a 30-minute one-on-one session with world-renowned chefs and learn their secrets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef) => (
            <div key={chef.id} className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{chef.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{chef.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{chef.specialty}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    30 minutes session
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Video className="w-4 h-4 mr-2" />
                    Private video call
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Flexible scheduling
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${chef.price}</span>
                  <button
                    onClick={() => handleBookSession(chef)}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showPaymentModal && selectedChef && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Book Session with {selectedChef.name}</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">30-minute consultation</p>
                <p className="text-2xl font-bold">${selectedChef.price}</p>
              </div>
              <button
                onClick={handlePayment}
                className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-3 mt-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PremiumChefConsultation;