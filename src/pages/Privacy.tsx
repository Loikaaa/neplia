import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 font-serif">
      <div className="bg-white/80 dark:bg-gray-900/90 rounded-2xl shadow-2xl max-w-2xl p-10 m-8 border border-indigo-100">
        <h1 className="text-4xl font-bold mb-6 text-center font-serif">Privacy Policy</h1>
        <hr className="mb-6 border-indigo-200" />
        <div className="space-y-5 text-gray-700 dark:text-gray-200 leading-8 text-lg font-serif">
          <p>
            Your privacy is important to us. It is Neplia's policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://neplia.com">https://neplia.com</a>, and other sites we own and operate.
          </p>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>
          <p>
            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
          </p>
          <p>
            We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
          </p>
          <p>
            Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
          </p>
          <p>
            You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
          </p>
          <p>
            Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
          </p>
          <p>This policy is effective as of 25 October 2023.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
