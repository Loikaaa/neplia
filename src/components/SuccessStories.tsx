import React from 'react';
import { Quote, Star, ArrowRight, Trophy, TrendingUp } from 'lucide-react';

const successStories = [
  {
    id: 1,
    name: "Sarah Mitchell",
    exam: "IELTS",
    initialScore: 6.5,
    finalScore: 8.5,
    improvement: "+2.0",
    timeframe: "3 months",
    country: "Canada",
    story: "I was struggling with IELTS Writing and Speaking. Neplia's AI feedback helped me identify my weaknesses and improve systematically. The practice tests were incredibly realistic!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    achievement: "Accepted to University of Toronto",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "David Chen",
    exam: "TOEFL",
    initialScore: 85,
    finalScore: 110,
    improvement: "+25",
    timeframe: "2 months",
    country: "USA",
    story: "The personalized study plan was a game-changer. I could focus on my weak areas while maintaining my strengths. The speaking practice with AI was incredibly helpful.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    achievement: "Admitted to MIT Graduate Program",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    exam: "GRE",
    initialScore: 315,
    finalScore: 335,
    improvement: "+20",
    timeframe: "4 months",
    country: "Spain",
    story: "The quantitative reasoning section was my biggest challenge. Neplia's adaptive practice helped me master complex problems step by step. Highly recommend!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    achievement: "PhD in Computer Science at Stanford",
    color: "from-green-500 to-emerald-500"
  }
];

const stats = [
  { value: "50,000+", label: "Success Stories", icon: <Trophy className="w-6 h-6" /> },
  { value: "94%", label: "Score Improvement", icon: <TrendingUp className="w-6 h-6" /> },
  { value: "2.5x", label: "Faster Results", icon: <Star className="w-6 h-6" /> },
  { value: "150+", label: "Countries", icon: <Quote className="w-6 h-6" /> }
];

const SuccessStories = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Success Stories That Inspire
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real students, real results. See how Neplia helped thousands achieve their dream scores and unlock opportunities worldwide.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {successStories.map((story) => (
            <div key={story.id} className="group relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Score Improvement Badge */}
                <div className={`absolute -top-4 right-4 px-4 py-2 bg-gradient-to-r ${story.color} text-white rounded-full text-sm font-bold shadow-lg`}>
                  {story.improvement} points
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{story.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{story.country}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-indigo-300 mb-3" />
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    "{story.story}"
                  </p>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="text-sm text-red-600 dark:text-red-400 font-medium">Before</div>
                    <div className="text-2xl font-bold text-red-700 dark:text-red-300">{story.initialScore}</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">After</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">{story.finalScore}</div>
                  </div>
                </div>

                {/* Achievement */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Achievement</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{story.achievement}</p>
                </div>

                {/* Exam & Timeframe */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{story.exam} Exam</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{story.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-xl mb-6 text-indigo-100 max-w-2xl mx-auto">
              Join thousands of students who transformed their futures with our proven methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
                View More Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;