
import React from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';

const Privacy = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className={`font-bold mb-8 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead mb-6">
              At Neplia, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
              <li>Create an account or user profile</li>
              <li>Purchase a subscription</li>
              <li>Participate in assessments, tests, or surveys</li>
              <li>Contact our customer support</li>
              <li>Interact with our platform</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience on our platform</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
              <li>Service providers who perform services on our behalf</li>
              <li>Third-party partners with whom we offer co-branded services</li>
              <li>Law enforcement or other parties as required by law</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect the security of your personal information. However, please be aware that no security measures are perfect or impenetrable, and we cannot guarantee the security of your data transmitted to our site.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Choices</h2>
            <p>
              You can access and update certain information about yourself by logging into your account. You can also opt out of receiving promotional emails from us by following the instructions in those emails.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. International Data Transfers</h2>
            <p>
              We may transfer information that we collect about you to affiliated entities, or to other third parties across borders and from your country or jurisdiction to other countries or jurisdictions around the world.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to this Privacy Policy</h2>
            <p>
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@neplia.com" className="text-indigo hover:underline">privacy@neplia.com</a>
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

export default Privacy;
