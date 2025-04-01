
import React from 'react';
import { Headphones, BookOpen, Edit, MessageSquare, BarChart3, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Headphones,
    title: "Listening Practice",
    description: "Master listening with authentic audio samples and interactive question formats.",
    color: "bg-gradient-to-br from-purple-600 to-purple-800 text-white",
    delay: 0.1
  },
  {
    icon: BookOpen,
    title: "Reading Tests",
    description: "Improve comprehension with diverse reading passages and timed exercises.",
    color: "bg-gradient-to-br from-teal-500 to-teal-700 text-white",
    delay: 0.2
  },
  {
    icon: Edit,
    title: "Writing Evaluation",
    description: "Get AI-powered feedback on Task 1 and Task 2 writing with detailed scoring.",
    color: "bg-gradient-to-br from-pink-500 to-pink-700 text-white",
    delay: 0.3
  },
  {
    icon: MessageSquare,
    title: "Speaking Assessment",
    description: "Practice speaking with voice recording and detailed pronunciation analysis.",
    color: "bg-gradient-to-br from-indigo-600 to-indigo-800 text-white",
    delay: 0.4
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your improvement with detailed analytics and performance insights.",
    color: "bg-gradient-to-br from-cyan-500 to-cyan-700 text-white",
    delay: 0.5
  },
  {
    icon: Calendar,
    title: "Study Planning",
    description: "Get personalized study schedules tailored to your target test date.",
    color: "bg-gradient-to-br from-orange-500 to-orange-700 text-white",
    delay: 0.6
  }
];

const benefitsList = [
  "24/7 access to all practice materials",
  "Personalized feedback on every test",
  "Real exam-like environment",
  "Detailed performance analytics",
  "Regular content updates",
  "Mobile compatibility for on-the-go learning"
];

const FeatureAnimation = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-1/4 -right-24 w-80 h-80 bg-teal-200 dark:bg-teal-900/20 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="relative">
          <FeatureAnimation delay={0}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Complete Preparation Suite
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Everything You Need to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Master IELTS</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Our comprehensive platform provides all the tools and resources you need to excel in your IELTS exam
              </p>
            </div>
          </FeatureAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureAnimation key={index} delay={feature.delay}>
                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full"
                >
                  <div className={`${feature.color} p-6`}>
                    <div className="rounded-full bg-white/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    <Button 
                      variant="ghost" 
                      className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-0 hover:bg-transparent"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </FeatureAnimation>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <FeatureAnimation delay={0.2}>
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Our IELTS Preparation Platform?</h3>
                  <p className="text-indigo-100 mb-6">Join thousands of successful test-takers who have achieved their target scores with our comprehensive preparation system.</p>
                  
                  <ul className="space-y-3">
                    {benefitsList.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-8 bg-white text-indigo-600 hover:bg-indigo-50">
                    Start Your Preparation
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </FeatureAnimation>
              
              <FeatureAnimation delay={0.4}>
                <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                    alt="Students studying" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-gray-900 dark:text-white font-medium">
                      "I improved my IELTS score from 6.5 to 8.0 in just 6 weeks using this platform!"
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">— Sarah, IELTS 8.0</p>
                  </div>
                </div>
              </FeatureAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
