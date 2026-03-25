import FooterLinks from "@app/components/FooterLinks";
import DefaultPageHeader from "../components/DefaultPageHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-secondary-background">
      <DefaultPageHeader />
      <div className="pt-48 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="mb-4">
          By using this application, you agree to the terms described below.
          This application uses the YouTube API to provide personalized features
          and relies on the data provided by this API.
        </p>
        <p className="mb-4">
          You authorize access to your YouTube account data only for the purpose
          of displaying and modifying information related to your own account,
          as requested by you. We do not use your data for any other purpose.
        </p>
        <p className="mb-4">
          We are not responsible for any changes made to your YouTube account
          through this application, as all actions are performed with your
          authorization and request.
        </p>
        <p className="mb-4">
          No member of our team will have access to, consult, or modify data of
          users who log in and share their information with us.
        </p>
        <p>
          We reserve the right to update these terms at any time. We recommend
          that you review this page periodically.
        </p>
      </div>
      <div className="flex justify-center p-6">
        <FooterLinks />
      </div>
    </div>
  );
}
