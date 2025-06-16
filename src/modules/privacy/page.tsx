'use client';

import Header from "@shared/components/header/Header";

export default function Privacy() {
  return (
    <>
      <Header
        title='Privacy Policy'
        showBackButton={true}
      />
      <div className="p-6 max-w-2xl mx-auto">
        <p className="mb-4">
          This application uses the YouTube API to provide personalized features to users. We only collect the data provided by the YouTube API that is necessary to offer the best possible experience.
        </p>
        <p className="mb-4">
          The data accessed from your YouTube account is used exclusively to display relevant information and allow you to change information in your own YouTube account, as requested by you.
        </p>
        <p className="mb-4">
          We do not collect, store, or use any other personal data beyond what is provided by the YouTube API. No member of our team will have access to, consult, or modify data of users who log in and share their information with us.
        </p>
        <p>
          If you have any questions about this policy, please contact us.
        </p>
      </div>
    </>
  );
}
