
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, GraduationCap, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const destinations = [
  {
    country: "United States",
    flag: "🇺🇸",
    students: "1M+",
    universities: "4,000+",
    topUniversities: ["Harvard", "MIT", "Stanford"],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1080&auto=format&fit=crop"
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    students: "600K+",
    universities: "150+",
    topUniversities: ["Oxford", "Cambridge", "Imperial"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1080&auto=format&fit=crop"
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    students: "500K+",
    universities: "43+",
    topUniversities: ["Melbourne", "Sydney", "ANU"],
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1080&auto=format&fit=crop"
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    students: "450K+",
    universities: "100+",
    topUniversities: ["Toronto", "UBC", "McGill"],
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1080&auto=format&fit=crop"
  }
];

const PopularDestinations = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Study Destinations</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover top educational destinations chosen by international students worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.country}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
              <img
                src={destination.image}
                alt={destination.country}
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{destination.flag}</span>
                  <h3 className="text-2xl font-bold">{destination.country}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-300" />
                    <span>{destination.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-indigo-300" />
                    <span>{destination.universities} Universities</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-200">Top Universities:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.topUniversities.map((uni) => (
                      <span
                        key={uni}
                        className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                      >
                        {uni}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link
                  to={`/country/${destination.country.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-4 inline-flex items-center text-indigo-300 hover:text-indigo-200"
                >
                  <span>Learn more</span>
                  <TrendingUp className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
