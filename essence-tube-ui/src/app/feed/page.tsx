import Main from "@modules/main/page";
import RequireAuth from "@shared/components/require-auth/RequireAuth";

export default function FeedPage() {
  return (
    <RequireAuth>
      <Main activeTabDefault="tab-feed" />
    </RequireAuth>
  );
}
