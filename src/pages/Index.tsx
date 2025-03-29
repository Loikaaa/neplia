
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Globe, Award, Search, Users, BarChart3, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-indigo/5 blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] h-[400px] w-[400px] rounded-full bg-teal/5 blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-coral/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
                Your Global Exam Preparation Hub
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Ace Your English Proficiency Exams With <span className="text-indigo">Neplia</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Personalized preparation for IELTS, TOEFL, PTE, Cambridge, and Duolingo tests with country-specific resources and AI-powered learning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link to="/selection">
                <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white rounded-lg px-6 py-6 h-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-lg px-6 py-6 h-auto">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center"
            >
              {[
                { label: "Countries", value: "50+" },
                { label: "Exams", value: "6" },
                { label: "Practice Tests", value: "1000+" },
                { label: "Students", value: "100K+" }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-bold text-indigo mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">English Proficiency Exams</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Prepare for any major English language exam with our specialized resources and practice tests.
            </p>
          </div>

          {/* First row of exams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {[
              {
                title: "IELTS",
                subtitle: "Academic & General Training",
                description: "Accepted worldwide for education, migration, and employment",
                icon: "🎓",
                color: "bg-indigo",
                link: "/exams/ielts"
              },
              {
                title: "TOEFL",
                subtitle: "Test of English as a Foreign Language",
                description: "Recognized by over 11,000 universities in 150+ countries",
                icon: "🌎",
                color: "bg-teal",
                link: "/exams/toefl"
              },
              {
                title: "PTE Academic",
                subtitle: "Pearson Test of English",
                description: "Computer-based test accepted by thousands of institutions",
                icon: "💻",
                color: "bg-coral",
                link: "/exams/pte"
              },
            ].map((exam, index) => (
              <Link 
                key={index} 
                to={exam.link}
                className="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group h-full"
              >
                <div className={`${exam.color} h-2 w-full`}></div>
                <div className="p-6">
                  <div className="text-3xl mb-3">{exam.icon}</div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-indigo transition-colors">{exam.title}</h3>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{exam.subtitle}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{exam.description}</p>
                  <div className="text-indigo text-sm font-medium flex items-center">
                    Prepare Now <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Second row of exams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Cambridge English",
                subtitle: "B2 First, C1 Advanced & C2 Proficiency",
                description: "In-depth assessment recognized by top employers & universities",
                icon: "🏛️",
                color: "bg-indigo",
                link: "/selection?exam=cambridge"
              },
              {
                title: "Duolingo",
                subtitle: "Duolingo English Test",
                description: "Convenient online test accepted by thousands of institutions",
                icon: "🦉",
                color: "bg-teal",
                link: "/selection?exam=duolingo"
              },
              {
                title: "OET",
                subtitle: "Occupational English Test",
                description: "English language test for healthcare professionals",
                icon: "⚕️",
                color: "bg-coral",
                link: "/selection?exam=oet"
              }
            ].map((exam, index) => (
              <Link 
                key={index} 
                to={exam.link}
                className="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group h-full"
              >
                <div className={`${exam.color} h-2 w-full`}></div>
                <div className="p-6">
                  <div className="text-3xl mb-3">{exam.icon}</div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-indigo transition-colors">{exam.title}</h3>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{exam.subtitle}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{exam.description}</p>
                  <div className="text-indigo text-sm font-medium flex items-center">
                    Prepare Now <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Neplia</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform offers comprehensive preparation tools tailored to your specific exam and country requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Country-Specific Content",
                description: "Resources tailored to visa and immigration requirements for your target country",
                icon: Globe,
                link: "/countries"
              },
              {
                title: "AI-Powered Assessment",
                description: "Get instant feedback on your speaking and writing with advanced AI technology",
                icon: MessageSquare,
                link: "/practice"
              },
              {
                title: "Comprehensive Practice Tests",
                description: "Full-length mock exams that simulate the real testing experience",
                icon: BookOpen,
                link: "/practice/mock-tests"
              },
              {
                title: "Performance Analytics",
                description: "Track your progress with detailed insights and personalized recommendations",
                icon: BarChart3,
                link: "/dashboard"
              },
              {
                title: "Expert Guidance",
                description: "Learning strategies and tips from certified instructors and top scorers",
                icon: Award,
                link: "/resources"
              },
              {
                title: "Community Support",
                description: "Connect with fellow test-takers to share experiences and resources",
                icon: Users,
                link: "/resources"
              }
            ].map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link}
                className="block hover:scale-105 transition-transform"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-indigo" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Country Selection Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Personalized to Your Destination</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Select your target country and exam to get a customized preparation plan that matches your specific requirements.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 h-8 w-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <Search className="h-4 w-4 text-indigo" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Country-Specific Requirements</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Learn exact score requirements for your visa or university application
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 h-8 w-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <BookOpen className="h-4 w-4 text-indigo" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Targeted Practice Materials</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Focus on topics and question types relevant to your exam
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to="/selection">
                    <Button className="w-full sm:w-auto bg-indigo hover:bg-indigo/90">
                      Start Your Personalized Prep
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="relative h-64 lg:h-auto bg-indigo-50 dark:bg-indigo-900/30 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                      <h3 className="text-lg font-medium mb-3">Select Your Destination</h3>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {["🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇳🇿", "🇮🇳"].map((flag, i) => (
                          <Link key={i} to="/countries" className="aspect-square flex items-center justify-center text-2xl bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer transition-colors">
                            {flag}
                          </Link>
                        ))}
                      </div>
                      <h3 className="text-lg font-medium mb-3">Choose Your Exam</h3>
                      <div className="space-y-2">
                        {[
                          { name: "IELTS Academic", link: "/exams/ielts" },
                          { name: "TOEFL", link: "/exams/toefl" },
                          { name: "PTE Academic", link: "/exams/pte" }
                        ].map((exam, i) => (
                          <Link 
                            key={i} 
                            to={exam.link}
                            className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer transition-colors"
                          >
                            <div className="w-4 h-4 rounded-full border-2 border-indigo mr-2 flex-shrink-0"></div>
                            <span className="text-sm">{exam.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Target Score?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of successful test-takers who have prepared with Neplia and reached their goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/selection">
                <Button size="lg" className="bg-indigo hover:bg-indigo/90 w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
