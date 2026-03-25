import FooterLinks from "@app/components/FooterLinks";
import DefaultPageHeader from "../components/DefaultPageHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-secondary-background">
      <DefaultPageHeader />
      <div className="pt-48 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="mb-4">
          <strong>1. Data Accessed</strong>
          <br />
          This application accesses your Google account information, including
          your name, email address, profile picture, and YouTube data (such as
          playlists, videos, and subscriptions), through the YouTube API and
          Google OAuth services.
        </p>
        <p className="mb-4">
          <strong>2. How We Use Your Data</strong>
          <br />
          The data accessed from your Google and YouTube accounts is used
          exclusively to provide the core features of the application, such as
          displaying your playlists, videos, subscriptions, and allowing you to
          manage your own YouTube content. We do not use your data for
          advertising or any other unrelated purposes.
        </p>
        <p className="mb-4">
          <strong>3. Data Sharing and Disclosure</strong>
          <br />
          We do not share, transfer, or disclose your Google or YouTube data
          with any third parties. Your data is only used within this application
          to provide the requested features. No member of our team will access,
          consult, or modify your data.
        </p>
        <p className="mb-4">
          <strong>4. Data Protection</strong>
          <br />
          We implement industry-standard security measures to protect your data,
          including the use of secure HTTPS connections and encrypted storage
          for authentication tokens. Access to your data is strictly limited to
          the functionalities you authorize.
        </p>
        <p className="mb-4">
          <strong>5. Data Retention and Deletion</strong>
          <br />
          We do not store your personal Google or YouTube data on our servers.
          Any temporary data (such as authentication tokens) is deleted when you
          log out or revoke access. You can revoke the application&apos;s access
          to your Google account at any time via your Google Account settings,
          which will immediately delete all access and any temporary data.
        </p>
        <p>
          If you have any questions about this policy or wish to request
          deletion of any data, please contact us.
        </p>
      </div>
      <div className="flex justify-center p-6">
        <FooterLinks />
      </div>
    </div>
  );
}
