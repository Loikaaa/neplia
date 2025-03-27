
import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, BookOpen, Edit, MessageSquare, Quote, ArrowRight, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const practiceOptions = [
  {
    icon: Headphones,
    title: "Listening Practice",
    description: "Improve your ability to understand spoken English in various contexts.",
    path: "/practice/listening",
    fact: "Did you know? The IELTS Listening test includes a variety of accents from native English speakers.",
    color: "bg-indigo text-white"
  },
  {
    icon: BookOpen,
    title: "Reading Practice",
    description: "Enhance your reading comprehension with academic and general training texts.",
    path: "/practice/reading",
    fact: "IELTS Reading tests contain texts totaling 2,150-2,750 words. Practice makes perfect!",
    color: "bg-teal text-white"
  },
  {
    icon: Edit,
    title: "Writing Practice",
    description: "Develop your written English skills for academic and general purposes.",
    path: "/practice/writing",
    fact: "In the IELTS Writing test, Task 2 contributes twice as much to your writing score as Task 1.",
    color: "bg-coral text-white"
  },
  {
    icon: MessageSquare,
    title: "Speaking Practice",
    description: "Build confidence in your spoken English through interactive exercises.",
    path: "/practice/speaking",
    fact: "The IELTS Speaking test is a face-to-face interview that lasts between 11-14 minutes.",
    color: "bg-indigo text-white"
  },
  {
    icon: Trophy,
    title: "Full Mock Test",
    description: "Complete a full IELTS test under timed conditions to simulate the real exam.",
    path: "/practice/mock-test",
    fact: "Taking full mock tests is one of the most effective ways to prepare for the real IELTS exam.",
    color: "bg-yellow-500 text-white"
  }
];

const quotes = [
  {
    text: "The more you practice, the more you realize what you need to improve.",
    author: "Sarah, Band 8 IELTS achiever"
  },
  {
    text: "Consistent practice is the secret to IELTS success. I practiced daily for three months.",
    author: "Michael, Band 7.5 IELTS achiever"
  },
  {
    text: "IELTS isn't just a test of English; it's a test of your preparation strategy.",
    author: "Priya, IELTS Instructor"
  }
];

const PracticeSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] -right-[20%] h-[400px] w-[400px] rounded-full bg-indigo/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[10%] h-[300px] w-[300px] rounded-full bg-teal/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Practice IELTS Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Our comprehensive practice modules help you prepare for all sections of the IELTS exam
          </p>
          <Link to="/practice">
            <Button className="bg-indigo hover:bg-indigo-600">
              View All Practice Options <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {practiceOptions.map((option, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-none shadow-lg"
            >
              <CardHeader className={`${option.color} p-6`}>
                <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-3">
                  <option.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                  {option.description}
                </CardDescription>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm italic text-gray-700 dark:text-gray-300">
                  <p>✨ {option.fact}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link 
                  to={option.path}
                  className="w-full py-2.5 px-4 text-center rounded-lg border-2 border-indigo text-indigo dark:text-indigo-300 dark:border-indigo-300 font-medium hover:bg-indigo hover:text-white dark:hover:bg-indigo-800 transition-colors"
                >
                  Start Practice
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {quotes.map((quote, index) => (
                <CarouselItem key={index}>
                  <div className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <Quote className="h-8 w-8 text-indigo" />
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
                      "{quote.text}"
                    </blockquote>
                    <cite className="text-gray-600 dark:text-gray-400 not-italic">— {quote.author}</cite>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        <div className="flex justify-center mt-8">
          <Link 
            to="/practice" 
            className="btn-primary inline-flex items-center text-lg px-8 py-3"
          >
            Explore All Practice Tests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;
