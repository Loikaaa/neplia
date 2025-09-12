import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "How accurate are the AI-powered practice tests?",
    answer: "Our AI-powered practice tests are designed to closely mirror real exam conditions with 95%+ accuracy. We continuously update our algorithms based on official exam patterns and student feedback to ensure the most realistic experience possible."
  },
  {
    question: "Can I practice for multiple exams with one account?",
    answer: "Yes! With a single Neplia account, you can access practice materials for IELTS, TOEFL, PTE, SAT, GRE, GMAT, and more. Switch between different exams anytime and track your progress across all of them."
  },
  {
    question: "How does the AI feedback system work?",
    answer: "Our advanced AI analyzes your responses in real-time, providing detailed feedback on grammar, vocabulary, structure, and content. For speaking tests, it evaluates pronunciation, fluency, and coherence. The system learns from your performance to provide personalized recommendations."
  },
  {
    question: "What's included in the free trial?",
    answer: "The free trial includes access to sample tests for all exam types, basic progress tracking, and limited AI feedback. You'll get 3 complete practice tests and 1 week of full access to experience our platform's capabilities."
  },
  {
    question: "How often are practice materials updated?",
    answer: "We update our practice materials monthly to reflect the latest exam formats and trends. Our content team works with certified instructors and analyzes recent exam patterns to ensure you're always practicing with the most current materials."
  },
  {
    question: "Is there mobile app available?",
    answer: "Yes! Our mobile app is available for both iOS and Android. You can practice on-the-go, sync your progress across devices, and receive push notifications for study reminders and new content updates."
  },
  {
    question: "What support is available if I need help?",
    answer: "We offer 24/7 chat support, email assistance, and video tutorials. Premium users also get access to live Q&A sessions with certified instructors and one-on-one study planning consultations."
  },
  {
    question: "How do I track my improvement over time?",
    answer: "Our comprehensive analytics dashboard shows detailed progress tracking, performance trends, strengths and weaknesses analysis, and personalized study recommendations. You'll see your scores improve with each practice session."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get answers to the most common questions about our exam preparation platform
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 pb-6 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              Browse Help Center
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;