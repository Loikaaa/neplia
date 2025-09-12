import React from 'react';
import { CheckCircle, ArrowRight, Target, BookOpen, Award, TrendingUp } from 'lucide-react';

const journeySteps = [
  {
    step: 1,
    title: "Assessment & Goal Setting",
    description: "Take our diagnostic test to identify your current level and set personalized goals based on your target score.",
    icon: <Target className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    features: ["Diagnostic Test", "Goal Setting", "Skill Assessment", "Study Plan Creation"]
  },
  {
    step: 2,
    title: "Personalized Learning Path",
    description: "Follow your customized study plan with AI-recommended practice sessions tailored to your learning style.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    features: ["Custom Study Plan", "AI Recommendations", "Progress Tracking", "Adaptive Content"]
  },
  {
    step: 3,
    title: "Intensive Practice & Feedback",
    description: "Practice with unlimited mock tests and receive instant AI feedback to improve your performance continuously.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    features: ["Mock Tests", "Instant Feedback", "Performance Analytics", "Weakness Analysis"]
  },
  {
    step: 4,
    title: "Achieve Your Target Score",
    description: "Master your skills, build confidence, and achieve your target score with our proven methodology.",
    icon: <Award className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    features: ["Score Improvement", "Confidence Building", "Exam Readiness", "Success Guarantee"]
  }
];

const StudyJourney = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our proven 4-step methodology that has helped over 50,000+ students achieve their target scores
          </p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 transform -translate-y-1/2 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {journeySteps.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Step Number Circle */}
                <div className={`mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  {step.step}
                </div>
                
                {/* Content Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} text-white mb-4`}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 -right-4 items-center justify-center z-20">
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their dreams with our proven methodology.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyJourney;