
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe2, GraduationCap, Award } from 'lucide-react';

const stats = [
  {
    label: "Global Students",
    value: "5.6M+",
    icon: Globe2,
    color: "text-blue-500",
    description: "International students worldwide"
  },
  {
    label: "Universities",
    value: "10K+",
    icon: GraduationCap,
    color: "text-purple-500",
    description: "Top-ranked institutions"
  },
  {
    label: "Success Rate",
    value: "94%",
    icon: TrendingUp,
    color: "text-green-500",
    description: "Student visa approval rate"
  },
  {
    label: "Programs",
    value: "50K+",
    icon: Award,
    color: "text-indigo-500",
    description: "Available study programs"
  }
];

const StudyStats = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${stat.color} mb-4`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {stat.label}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyStats;
