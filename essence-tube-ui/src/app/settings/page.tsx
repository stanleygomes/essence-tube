import Settings from "@modules/settings/page";
import RequireAuth from "@shared/components/require-auth/RequireAuth";

export default function SettingsPage() {
  return (
    <RequireAuth>
      <Settings />
    </RequireAuth>
  );
}
