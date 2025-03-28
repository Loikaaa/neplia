
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Headphones, MessageSquare, Edit, BarChart3, Calendar, CheckCircle2, Award, Shield, Laptop, Brain, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const ToeflPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 rounded-full text-sm font-medium mb-4">
                TOEFL Preparation
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Prepare for <span className="text-teal-600">TOEFL iBT</span> Success
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Comprehensive preparation for the TOEFL iBT test with personalized resources for your target score.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/selection?exam=toefl">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-6 h-auto">
                    Start TOEFL Preparation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/practice/mock-test?type=toefl">
                  <Button variant="outline" size="lg" className="rounded-lg px-6 py-6 h-auto">
                    Take Practice Test
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
              {[
                { label: "Success Rate", value: "94%" },
                { label: "100+ Score Students", value: "8K+" },
                { label: "Practice Tests", value: "300+" },
                { label: "Universities", value: "11,000+" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-3xl font-bold text-teal-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOEFL-Specific Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">TOEFL iBT Test Sections</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Prepare for all four TOEFL iBT test sections with our specialized modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Reading",
                description: "Academic passages with questions that test your comprehension skills",
                icon: BookOpen,
                color: "bg-teal-600",
                link: "/practice/reading?exam=toefl"
              },
              {
                title: "Listening",
                description: "Lectures, classroom discussions and conversations with comprehension questions",
                icon: Headphones,
                color: "bg-indigo",
                link: "/practice/listening?exam=toefl"
              },
              {
                title: "Speaking",
                description: "Express yourself clearly on academic topics and everyday experiences",
                icon: MessageSquare,
                color: "bg-coral",
                link: "/practice/speaking?exam=toefl"
              },
              {
                title: "Writing",
                description: "Write essay responses based on reading and listening tasks",
                icon: Edit,
                color: "bg-indigo-800",
                link: "/practice/writing?exam=toefl"
              }
            ].map((module, index) => (
              <Link key={index} to={module.link} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 h-full"
                >
                  <div className={`${module.color} h-2 w-full`}></div>
                  <div className="p-6">
                    <div className={`${module.color} text-white rounded-full h-12 w-12 flex items-center justify-center mb-4`}>
                      <module.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{module.description}</p>
                    <div className="mt-4 text-teal-600 text-sm font-medium flex items-center">
                      Start Practice <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Score Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">TOEFL iBT Scores</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understand what each score range means and what you need to achieve for your goals.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  range: "61-80",
                  title: "Intermediate",
                  description: "Able to communicate with limited accuracy on familiar topics",
                  color: "border-yellow-400 dark:border-yellow-500"
                },
                {
                  range: "81-100",
                  title: "Good",
                  description: "Can effectively communicate in academic settings with some errors",
                  color: "border-teal-600 dark:border-teal-400"
                },
                {
                  range: "101-120",
                  title: "Advanced",
                  description: "Near-native fluency with sophisticated grammar and vocabulary",
                  color: "border-green-500 dark:border-green-400"
                }
              ].map((scoreLevel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-t-4 ${scoreLevel.color}`}
                >
                  <div className="text-xl font-bold mb-1">{scoreLevel.range}</div>
                  <div className="text-lg font-medium mb-2">{scoreLevel.title}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{scoreLevel.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Required Scores by University Level</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { level: "Top-tier Universities", score: "100-110+" },
                  { level: "Competitive Programs", score: "90-100" },
                  { level: "Most Universities", score: "80-90" },
                  { level: "Community Colleges", score: "70-80" },
                  { level: "Conditional Admission", score: "60-70" },
                  { level: "Graduate Programs", score: "90-100+" }
                ].map((levelScore, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                    <span className="font-medium text-sm">{levelScore.level}</span>
                    <span className="text-teal-600 font-bold">{levelScore.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our TOEFL Prep Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to achieve your target TOEFL score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Computer-Based Practice",
                description: "Authentic TOEFL iBT-style interface for realistic test practice",
                icon: Laptop
              },
              {
                title: "AI Speech Recognition",
                description: "Advanced speech recognition technology to evaluate your speaking responses",
                icon: MessageSquare
              },
              {
                title: "Score Analytics",
                description: "Detailed performance analytics with section-by-section breakdown",
                icon: BarChart3
              },
              {
                title: "Personalized Study Plans",
                description: "Custom study plans based on your diagnostic results and timeline",
                icon: Calendar
              },
              {
                title: "University Requirements Database",
                description: "Comprehensive database of TOEFL score requirements for universities worldwide",
                icon: BookOpen
              },
              {
                title: "Score Guarantee",
                description: "Achieve your target score or get an extended premium subscription for free",
                icon: Shield
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-teal-50 dark:bg-teal-900/30 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Excel on Your TOEFL?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful test-takers who achieved their target scores with Neplia.
            </p>
            <Link to="/selection?exam=toefl">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 rounded-lg px-6 py-6 h-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-8 flex items-center justify-center space-x-8">
              {[
                { label: "Premium Resources", icon: CheckCircle2 },
                { label: "Expert Support", icon: Award },
                { label: "7-Day Free Trial", icon: Calendar }
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <feature.icon className="h-5 w-5 mr-2 text-white opacity-90" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ToeflPage;
