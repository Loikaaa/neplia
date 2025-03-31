
import React from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';

const Cookies = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className={`font-bold mb-8 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>Cookie Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead mb-6">
              This Cookie Policy explains how Neplia uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Neplia) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Websites. Third parties serve cookies through our Websites for advertising, analytics, and other purposes.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Types of Cookies We Use</h2>
            <p>
              The specific types of first and third-party cookies served through our Websites and the purposes they perform include:
            </p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
            </p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
            </p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at: <a href="mailto:privacy@neplia.com" className="text-indigo hover:underline">privacy@neplia.com</a>
            </p>
            
            <p className="mt-8 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;
