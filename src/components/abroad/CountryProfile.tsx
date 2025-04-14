
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, Globe2, BookOpen, GraduationCap, Users, Briefcase, Award } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// This will eventually come from an API or database
const countriesData = {
  "united-states": {
    name: "United States",
    flag: "🇺🇸",
    overview: "The United States hosts the largest number of international students in the world. American universities are widely known for their quality and diverse offerings.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1080&auto=format&fit=crop",
    capital: "Washington D.C.",
    population: "331 million",
    language: "English",
    currency: "US Dollar (USD)",
    timezone: "UTC-5 to UTC-10",
    livingCost: "$10,000 - $18,000 per year (varies by location)",
    topUniversities: [
      { name: "Harvard University", rank: "#1", tuition: "$51,925/year", image: "https://images.unsplash.com/photo-1600325829439-800c9adba95f?q=80&w=600&auto=format&fit=crop" },
      { name: "MIT", rank: "#2", tuition: "$53,790/year", image: "https://images.unsplash.com/photo-1581093588777-3bad49084695?q=80&w=600&auto=format&fit=crop" },
      { name: "Stanford University", rank: "#3", tuition: "$56,169/year", image: "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?q=80&w=600&auto=format&fit=crop" },
    ],
    requirements: {
      academic: ["High School Diploma or equivalent", "GPA of 3.0 or higher (for top universities)", "College entrance exams (SAT/ACT)"],
      english: ["TOEFL: 80-100 iBT", "IELTS: 6.5-7.0", "Duolingo: 110-120"],
      visa: ["F-1 Student Visa", "Proof of financial support", "Acceptance letter from a SEVP-approved school"]
    },
    scholarships: [
      { name: "Fulbright Program", amount: "Varies", link: "#" },
      { name: "Hubert Humphrey Fellowship", amount: "Full tuition + stipend", link: "#" },
      { name: "Global Undergraduate Exchange Program", amount: "Full tuition", link: "#" }
    ],
    jobProspects: ["Optional Practical Training (OPT) for 12 months", "STEM OPT Extension for additional 24 months", "Excellent opportunities in tech, healthcare, and finance"]
  },
  "united-kingdom": {
    name: "United Kingdom",
    flag: "🇬🇧",
    overview: "The UK has a long-standing tradition of excellence in education, with some of the oldest and most prestigious universities in the world.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1080&auto=format&fit=crop",
    capital: "London",
    population: "67 million",
    language: "English",
    currency: "Pound Sterling (GBP)",
    timezone: "UTC+0",
    livingCost: "£12,000 - £15,000 per year (varies by location)",
    topUniversities: [
      { name: "University of Oxford", rank: "#1", tuition: "£26,770-£37,510/year", image: "https://images.unsplash.com/photo-1580106815433-a5b1d1d53d85?q=80&w=600&auto=format&fit=crop" },
      { name: "University of Cambridge", rank: "#2", tuition: "£22,227-£58,038/year", image: "https://images.unsplash.com/photo-1597127523723-2ede4ba16511?q=80&w=600&auto=format&fit=crop" },
      { name: "Imperial College London", rank: "#3", tuition: "£34,500-£45,300/year", image: "https://images.unsplash.com/photo-1607013407627-6848efb2d68d?q=80&w=600&auto=format&fit=crop" },
    ],
    requirements: {
      academic: ["A-Levels or equivalent", "Strong academic record", "Personal statement"],
      english: ["IELTS: 6.5-7.0", "TOEFL: 90-100 iBT", "PTE Academic: 60-70"],
      visa: ["Student visa (previously Tier 4)", "Proof of finances", "Confirmation of Acceptance for Studies (CAS)"]
    },
    scholarships: [
      { name: "Chevening Scholarships", amount: "Full tuition + stipend", link: "#" },
      { name: "Commonwealth Scholarships", amount: "Varies", link: "#" },
      { name: "GREAT Scholarships", amount: "£10,000", link: "#" }
    ],
    jobProspects: ["Graduate visa for 2 years", "Skilled Worker visa pathway", "Strong opportunities in finance, engineering, and healthcare"]
  },
  "australia": {
    name: "Australia",
    flag: "🇦🇺",
    overview: "Australia offers a relaxed, high-quality lifestyle and world-class education. Its universities rank among the best in the world.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1080&auto=format&fit=crop",
    capital: "Canberra",
    population: "25.7 million",
    language: "English",
    currency: "Australian Dollar (AUD)",
    timezone: "UTC+8 to UTC+11",
    livingCost: "AUD 20,000 - 25,000 per year (varies by location)",
    topUniversities: [
      { name: "University of Melbourne", rank: "#1", tuition: "AUD 30,000-45,000/year", image: "https://images.unsplash.com/photo-1629619066127-00d42ba26050?q=80&w=600&auto=format&fit=crop" },
      { name: "University of Sydney", rank: "#2", tuition: "AUD 38,000-48,000/year", image: "https://images.unsplash.com/photo-1527266237111-a4989d028b4b?q=80&w=600&auto=format&fit=crop" },
      { name: "Australian National University", rank: "#3", tuition: "AUD 36,000-48,000/year", image: "https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=600&auto=format&fit=crop" },
    ],
    requirements: {
      academic: ["Year 12 or equivalent", "Academic transcripts", "Statement of purpose"],
      english: ["IELTS: 6.0-7.0", "TOEFL: 78-94 iBT", "PTE Academic: 50-65"],
      visa: ["Student visa (subclass 500)", "Genuine Temporary Entrant (GTE) requirement", "Health insurance (OSHC)"]
    },
    scholarships: [
      { name: "Australia Awards", amount: "Full tuition + benefits", link: "#" },
      { name: "Destination Australia", amount: "AUD 15,000/year", link: "#" },
      { name: "Research Training Program", amount: "Tuition + stipend", link: "#" }
    ],
    jobProspects: ["Post-study work visa for 2-4 years", "Strong opportunities in mining, healthcare, and education", "Pathway to permanent residency"]
  },
  "canada": {
    name: "Canada",
    flag: "🇨🇦",
    overview: "Canada is known for its friendly culture, safety, and excellent education system. It also offers great post-study work opportunities and immigration pathways.",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1080&auto=format&fit=crop",
    capital: "Ottawa",
    population: "38 million",
    language: "English, French",
    currency: "Canadian Dollar (CAD)",
    timezone: "UTC-3.5 to UTC-8",
    livingCost: "CAD 12,000 - 18,000 per year (varies by location)",
    topUniversities: [
      { name: "University of Toronto", rank: "#1", tuition: "CAD 30,000-58,000/year", image: "https://images.unsplash.com/photo-1558010089-f0b456172351?q=80&w=600&auto=format&fit=crop" },
      { name: "University of British Columbia", rank: "#2", tuition: "CAD 24,000-55,000/year", image: "https://images.unsplash.com/photo-1554417063-ea30ae60f4ad?q=80&w=600&auto=format&fit=crop" },
      { name: "McGill University", rank: "#3", tuition: "CAD 20,000-50,000/year", image: "https://images.unsplash.com/photo-1566159995201-1d55c0a423c6?q=80&w=600&auto=format&fit=crop" },
    ],
    requirements: {
      academic: ["High School Diploma or equivalent", "Academic transcripts", "Letter of intent"],
      english: ["IELTS: 6.0-6.5", "TOEFL: 80-90 iBT", "CELPIP: 7-9"],
      visa: ["Study permit", "Biometrics", "Proof of financial support"]
    },
    scholarships: [
      { name: "Vanier Canada Graduate Scholarships", amount: "CAD 50,000/year", link: "#" },
      { name: "Banting Postdoctoral Fellowships", amount: "CAD 70,000/year", link: "#" },
      { name: "University-specific scholarships", amount: "Varies", link: "#" }
    ],
    jobProspects: ["Post-Graduation Work Permit (PGWP) for up to 3 years", "Express Entry for permanent residency", "Strong opportunities in tech, healthcare, and engineering"]
  }
};

const CountryProfile = () => {
  const { countrySlug } = useParams();
  const country = countriesData[countrySlug as keyof typeof countriesData];
  
  if (!country) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Country not found</h1>
          <p className="mb-8">The country profile you are looking for doesn't exist or is under development.</p>
          <Link to="/abroad">
            <Button>Return to Study Abroad</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 lg:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
        <img 
          src={country.image} 
          alt={country.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl md:text-5xl">{country.flag}</span>
              <h1 className="text-3xl md:text-5xl font-bold">{country.name}</h1>
            </div>
            <p className="text-lg md:text-xl max-w-3xl">{country.overview}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with Country Info */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">Country Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Globe2 className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Capital</p>
                    <p className="font-medium">{country.capital}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
                    <p className="font-medium">{country.population}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Language</p>
                    <p className="font-medium">{country.language}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                    <p className="font-medium">{country.currency}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Living Cost (Est.)</p>
                    <p className="font-medium">{country.livingCost}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="w-full">Apply Now</Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <Tabs defaultValue="universities" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="universities">Universities</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                <TabsTrigger value="jobs">Job Prospects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="universities" className="space-y-8">
                <h2 className="text-2xl font-bold">Top Universities</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {country.topUniversities.map((uni, index) => (
                    <motion.div 
                      key={uni.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={uni.image} 
                          alt={uni.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{uni.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Rank: {uni.rank} in {country.name}</p>
                        <p className="text-sm font-medium mt-2">Tuition: {uni.tuition}</p>
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          Learn More
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="space-y-8">
                <h2 className="text-2xl font-bold">Study Requirements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                      Academic
                    </h3>
                    <ul className="space-y-3">
                      {country.requirements.academic.map((req, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Globe2 className="h-5 w-5 mr-2 text-indigo-500" />
                      English Proficiency
                    </h3>
                    <ul className="space-y-3">
                      {country.requirements.english.map((req, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-indigo-500" />
                      Visa Requirements
                    </h3>
                    <ul className="space-y-3">
                      {country.requirements.visa.map((req, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="scholarships" className="space-y-8">
                <h2 className="text-2xl font-bold">Available Scholarships</h2>
                
                <div className="space-y-4">
                  {country.scholarships.map((scholarship, index) => (
                    <motion.div 
                      key={scholarship.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-bold">{scholarship.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount: {scholarship.amount}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 md:mt-0">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="jobs" className="space-y-8">
                <h2 className="text-2xl font-bold">Job Prospects after Graduation</h2>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                  <ul className="space-y-4">
                    {country.jobProspects.map((prospect, i) => (
                      <li key={i} className="flex items-start">
                        <Briefcase className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{prospect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CountryProfile;
