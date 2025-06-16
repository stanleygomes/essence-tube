'use client';

import Header from "@shared/components/header/Header";

export default function Terms() {
  return (
    <>
      <Header
        title='Terms of Service'
        showBackButton={true}
      />
      <div className="p-6 max-w-2xl mx-auto">
        <p className="mb-4">
          By using this application, you agree to the terms described below.
          This application uses the YouTube API to provide personalized features and relies on the data provided by this API.
        </p>
        <p className="mb-4">
          You authorize access to your YouTube account data only for the purpose of displaying and modifying information related to your own account, as requested by you. We do not use your data for any other purpose.
        </p>
        <p className="mb-4">
          We are not responsible for any changes made to your YouTube account through this application, as all actions are performed with your authorization and request.
        </p>
        <p className="mb-4">
          No member of our team will have access to, consult, or modify data of users who log in and share their information with us.
        </p>
        <p>
          We reserve the right to update these terms at any time. We recommend that you review this page periodically.
        </p>
      </div>
    </>
  );
}
