import React from 'react';
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 font-serif">
      <div className="bg-white/80 dark:bg-gray-900/90 rounded-2xl shadow-2xl max-w-2xl p-10 m-8 border border-indigo-100">
        <h1 className="text-4xl font-bold mb-6 text-center font-serif">Terms of Service</h1>
        <hr className="mb-6 border-indigo-200" />
        <div className="space-y-5 text-gray-700 dark:text-gray-200 leading-8 text-lg font-serif">
          <p>
            Welcome to Neplia! These terms of service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
          </p>
          <p>
            <strong>1. Acceptance of Terms</strong>
            <br />
            By using Neplia, you agree to these Terms and our Privacy Policy. If you do not agree, do not use our services.
          </p>
          <p>
            <strong>2. Description of Service</strong>
            <br />
            Neplia provides language learning resources, including practice tests, lessons, and community forums.
          </p>
          <p>
            <strong>3. User Accounts</strong>
            <br />
            You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account and password.
          </p>
          <p>
            <strong>4. Acceptable Use</strong>
            <br />
            You agree not to use our services for any unlawful purpose or in a way that violates these Terms.
          </p>
          <p>
            <strong>5. Intellectual Property</strong>
            <br />
            All content on Neplia is owned by us or our licensors and is protected by copyright laws.
          </p>
          <p>
            <strong>6. Disclaimer of Warranties</strong>
            <br />
            Our services are provided "as is" without any warranties, express or implied.
          </p>
          <p>
            <strong>7. Limitation of Liability</strong>
            <br />
            We are not liable for any damages arising from your use of our services.
          </p>
          <p>
            <strong>8. Changes to Terms</strong>
            <br />
            We may update these Terms at any time. Your continued use of our services constitutes acceptance of the new Terms.
          </p>
          <p>
            <strong>9. Governing Law</strong>
            <br />
            These Terms are governed by the laws of the State of [Your State].
          </p>
          <p>
            <strong>10. Contact Us</strong>
            <br />
            If you have any questions, please contact us at support@neplia.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
