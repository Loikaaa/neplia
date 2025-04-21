
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, Bookmark, ShieldCheck, Scale, FileText } from 'lucide-react';

const Terms = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <Layout>
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-purple-50/30 to-pink-50/20 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-pink-950/10 -z-10"></div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-purple-700 dark:opacity-10 -z-10"></div>
        <div className="absolute top-10 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-cyan-700 dark:opacity-10 -z-10"></div>
        
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className={`font-bold mb-4 ${isMobile ? 'text-3xl' : 'text-5xl'} bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                Terms of Service
              </h1>
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <span>Home</span>
                <ChevronRight size={14}/>
                <span className="text-primary">Terms</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-indigo-600 dark:text-indigo-400" size={24} />
                <h2 className="text-xl font-semibold">Your Privacy Matters</h2>
              </div>
              <p className="lead text-lg text-gray-700 dark:text-gray-300">
                Welcome to Neplia. By accessing or using our services, you agree to be bound by these Terms of Service.
                We've designed them to be clear, fair, and transparent.
              </p>
            </motion.div>
            
            <Card className="overflow-hidden mb-10">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/30 dark:to-purple-900/30 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <FileText className="text-indigo-600 dark:text-indigo-400" size={20} />
                    <h2 className="text-xl font-semibold">Terms Summary</h2>
                  </div>
                  <div className="text-xs px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">
                    Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                
                <motion.div 
                  className="prose prose-lg dark:prose-invert max-w-none p-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-6 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">1</span>
                      Acceptance of Terms
                    </h2>
                    <p className="pl-10">
                      By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you don't agree to these Terms, you may not access or use the Services.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">2</span>
                      Description of Services
                    </h2>
                    <p className="pl-10">
                      Neplia provides an online platform for English language exam preparation, including practice tests, resources, and learning materials for IELTS, TOEFL, and other standardized tests.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">3</span>
                      User Accounts
                    </h2>
                    <p className="pl-10">
                      To access certain features of our Services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">4</span>
                      User Content
                    </h2>
                    <p className="pl-10">
                      Our Services may allow you to upload, submit, store, send, or receive content. By providing content to our Services, you grant Neplia a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">5</span>
                      Prohibited Uses
                    </h2>
                    <p className="pl-10">
                      You agree not to misuse our Services. For example, you must not, and must not attempt to:
                    </p>
                    <ul className="list-disc ml-16 mt-2 mb-4 space-y-2">
                      <li>Use our Services for any unlawful purposes or activities</li>
                      <li>Probe, scan, or test the vulnerability of any system or network</li>
                      <li>Breach or otherwise circumvent any security or authentication measures</li>
                      <li>Access, tamper with, or use non-public areas of the Services</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">6</span>
                      Intellectual Property Rights
                    </h2>
                    <p className="pl-10">
                      The Services and their original content, features, and functionality are and will remain the exclusive property of Neplia and its licensors. The Services are protected by copyright, trademark, and other laws.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">7</span>
                      Termination
                    </h2>
                    <p className="pl-10">
                      We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">8</span>
                      Changes to Terms
                    </h2>
                    <p className="pl-10">
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold">9</span>
                      Contact Us
                    </h2>
                    <p className="pl-10">
                      If you have any questions about these Terms, please contact us at: <a href="mailto:legal@neplia.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">legal@neplia.com</a>
                    </p>
                  </motion.div>
                  
                  <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bookmark size={16} />
                      <span>Save for reference</span>
                    </motion.div>
                    
                    <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                      Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-6 border border-indigo-100 dark:border-indigo-900/50 shadow-sm mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-indigo-600 dark:text-indigo-400" size={24} />
                <h3 className="text-xl font-semibold">Legal Compliance</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Our Terms of Service are designed to comply with relevant laws and regulations, 
                including data protection standards. We strive to make our terms clear, fair and 
                transparent for all users.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
