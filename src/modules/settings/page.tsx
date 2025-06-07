"use client";

import {
  Page,
  List,
  ListItem,
  Button,
} from "konsta/react";
import Header from "@shared/components/header/Header";
import { removeAuth } from "../../services/authService";

export default function Settings() {

  const handleLogout = () => {
    removeAuth();
    window.location.href = "/login";
  };

  return (
    <>
      <Header
        title="Settings"
        showBackButton={true}
      />
      <div>
        <Page className="min-h-screen flex flex-col bg-white dark:bg-black safe-page-content">
          <div className="max-w-md w-full mx-auto flex-1 flex flex-col gap-8 py-8 px-8">
            <section>
              <List strong inset className="rounded-xl shadow-sm">
                <ListItem
                  link
                  title="Termos de Serviço"
                  href="/terms"
                  className="py-4 px-4"
                />
                <ListItem
                  link
                  title="Política de Privacidade"
                  href="/privacy"
                  className="py-4 px-4"
                />
              </List>
            </section>

            <section className="mt-8">
              <Button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white text-base py-3 rounded-lg"
              >
                Logout
              </Button>
            </section>
          </div>
        </Page>
      </div>
    </>
  );
}
