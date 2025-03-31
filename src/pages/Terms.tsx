
import React from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';

const Terms = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className={`font-bold mb-8 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>Terms of Service</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead mb-6">
              Welcome to Neplia. By accessing or using our services, you agree to be bound by these Terms of Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you don't agree to these Terms, you may not access or use the Services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Services</h2>
            <p>
              Neplia provides an online platform for English language exam preparation, including practice tests, resources, and learning materials for IELTS, TOEFL, and other standardized tests.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p>
              To access certain features of our Services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>
              Our Services may allow you to upload, submit, store, send, or receive content. By providing content to our Services, you grant Neplia a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Uses</h2>
            <p>
              You agree not to misuse our Services. For example, you must not, and must not attempt to:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
              <li>Use our Services for any unlawful purposes or activities</li>
              <li>Probe, scan, or test the vulnerability of any system or network</li>
              <li>Breach or otherwise circumvent any security or authentication measures</li>
              <li>Access, tamper with, or use non-public areas of the Services</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Intellectual Property Rights</h2>
            <p>
              The Services and their original content, features, and functionality are and will remain the exclusive property of Neplia and its licensors. The Services are protected by copyright, trademark, and other laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: <a href="mailto:legal@neplia.com" className="text-indigo hover:underline">legal@neplia.com</a>
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

export default Terms;
