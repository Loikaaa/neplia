
import React from 'react';
import { Headphones, BookOpen, Edit, MessageSquare, BarChart3, Calendar } from 'lucide-react';

const features = [
  {
    icon: Headphones,
    title: "Listening Practice",
    description: "Master listening with authentic audio samples and interactive question formats.",
    color: "bg-purple-600 text-white"
  },
  {
    icon: BookOpen,
    title: "Reading Tests",
    description: "Improve comprehension with diverse reading passages and timed exercises.",
    color: "bg-teal-500 text-white"
  },
  {
    icon: Edit,
    title: "Writing Evaluation",
    description: "Get AI-powered feedback on Task 1 and Task 2 writing with detailed scoring.",
    color: "bg-pink-500 text-white"
  },
  {
    icon: MessageSquare,
    title: "Speaking Assessment",
    description: "Practice speaking with voice recording and detailed pronunciation analysis.",
    color: "bg-indigo-600 text-white"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your improvement with detailed analytics and performance insights.",
    color: "bg-cyan-500 text-white"
  },
  {
    icon: Calendar,
    title: "Study Planning",
    description: "Get personalized study schedules tailored to your target test date.",
    color: "bg-coral-500 text-white"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete IELTS Preparation Suite
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to prepare for your IELTS exam in one comprehensive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`rounded-full p-3 w-12 h-12 flex items-center justify-center mb-5 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
