import Main from "@modules/main/page";
import RequireAuth from "@shared/components/require-auth/RequireAuth";

export default function HomePage() {
  return (
    <RequireAuth>
      <Main activeTabDefault="tab-home" />
    </RequireAuth>
  );
}
