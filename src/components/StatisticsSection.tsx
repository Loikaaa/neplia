
import React from 'react';

const stats = [
  { value: "30k+", label: "Active Users" },
  { value: "500+", label: "Practice Tests" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "Support" }
];

const StatisticsSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl overflow-hidden">
          <div className="px-6 py-10 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              Join Thousands of Successful IELTS Test-Takers
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-xl text-white font-bold">{index + 1}</span>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
