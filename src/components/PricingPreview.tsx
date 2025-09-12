import React from 'react';
import { Check, Star, Crown, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "Forever",
    description: "Perfect for getting started with exam preparation",
    icon: <Zap className="w-6 h-6" />,
    color: "from-gray-500 to-gray-600",
    borderColor: "border-gray-200",
    bgColor: "bg-white",
    features: [
      "3 Practice Tests per month",
      "Basic progress tracking",
      "Limited AI feedback",
      "Access to study materials",
      "Community support"
    ],
    limitations: ["Limited test attempts", "Basic analytics"],
    popular: false
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "Most popular choice for serious exam preparation",
    icon: <Star className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-600",
    borderColor: "border-indigo-200",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
    features: [
      "Unlimited practice tests",
      "Advanced AI feedback",
      "Detailed performance analytics",
      "Personalized study plans",
      "Priority support",
      "Mobile app access",
      "Score prediction",
      "Study reminders"
    ],
    limitations: [],
    popular: true,
    savings: "Save 20% annually"
  },
  {
    name: "Elite",
    price: "$39",
    period: "per month", 
    description: "Ultimate package with 1-on-1 expert guidance",
    icon: <Crown className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    borderColor: "border-orange-200",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    features: [
      "Everything in Premium",
      "1-on-1 tutor sessions",
      "Expert essay reviews",
      "Speaking practice with instructors",
      "Guaranteed score improvement",
      "Priority scheduling",
      "Custom study materials",
      "University application guidance"
    ],
    limitations: [],
    popular: false,
    guarantee: "Score improvement guarantee"
  }
];

const PricingPreview = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start with our free plan or upgrade to unlock advanced features and personalized guidance
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Monthly
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm">
              Annual
            </button>
            <span className="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative group ${plan.popular ? 'transform scale-105 z-10' : ''}`}>
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg z-20">
                  Most Popular
                </div>
              )}

              <div className={`h-full ${plan.bgColor} dark:bg-gray-800 rounded-2xl p-8 border-2 ${plan.borderColor} dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} text-white mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-gray-600 dark:text-gray-400 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  
                  {plan.savings && (
                    <div className="text-green-600 dark:text-green-400 text-sm font-medium">{plan.savings}</div>
                  )}
                  {plan.guarantee && (
                    <div className="text-orange-600 dark:text-orange-400 text-sm font-medium">{plan.guarantee}</div>
                  )}
                </div>

                {/* Features List */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button asChild className={`w-full h-12 font-semibold ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' : 'variant-outline'}`}>
                  <Link to="/pricing" className="inline-flex items-center justify-center gap-2">
                    {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                {/* Additional Info */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {plan.price === "Free" ? "No credit card required" : "Cancel anytime"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Not sure which plan is right for you?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Start with our free plan and upgrade anytime as your preparation needs grow. All plans include our core features to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="px-6 py-3">
                <Link to="/pricing">Compare All Features</Link>
              </Button>
              <Button asChild className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;