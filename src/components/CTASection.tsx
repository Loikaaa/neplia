
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, Users, Target } from 'lucide-react';

const features = [
  "AI-powered practice tests and feedback",
  "Personalized study plans for faster results", 
  "Real-time progress tracking and analytics",
  "Expert-designed content for all major exams",
  "24/7 support and learning resources"
];

const stats = [
  { icon: <Users className="w-6 h-6" />, value: "50,000+", label: "Active Students" },
  { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "Average Rating" },
  { icon: <Target className="w-6 h-6" />, value: "94%", label: "Score Improvement" }
];

const CTASection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Achieve Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Dream Score?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of successful students who achieved their target scores with our proven AI-powered platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-indigo-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Why Choose Neplia?
            </h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-green-900" />
                  </div>
                  <span className="text-lg text-indigo-100 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-500 text-green-50 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-current" />
                Limited Time: Free Trial Extended
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                Start Your Free Trial
              </h3>
              
              <p className="text-indigo-100 mb-6 text-lg">
                Get full access to all features for 14 days. No credit card required.
              </p>

              <div className="space-y-4">
                <Button asChild size="lg" className="w-full h-14 text-lg font-semibold bg-white text-indigo-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <Link to="/signup" className="inline-flex items-center justify-center gap-3">
                    Start Free Trial Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full h-12 border-white/30 text-white hover:bg-white/10">
                  <Link to="/pricing">View All Pricing Options</Link>
                </Button>
              </div>

              <p className="text-xs text-indigo-200 mt-4">
                Join 50,000+ students • No spam, unsubscribe anytime
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg text-white italic mb-4">
              "Neplia helped me improve my IELTS score from 6.5 to 8.5 in just 3 months. The AI feedback was incredibly detailed and helped me understand exactly what I needed to work on."
            </blockquote>
            <cite className="text-indigo-200">
              - Sarah M., University of Toronto Graduate
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
