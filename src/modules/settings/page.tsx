"use client";

import { useState, useEffect } from "react";
import {
  Page,
  BlockTitle,
  List,
  ListItem,
  Block,
  Button,
  Checkbox,
  ListInput,
} from "konsta/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Header from "@shared/components/header/Header";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(
    theme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    setSelectedTheme(theme === "dark" ? "dark" : "light");
  }, [theme]);

  const handleThemeChange = (value: "light" | "dark") => {
    setTheme(value);
    setSelectedTheme(value);
  };

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  const [group, setGroup] = useState(['Books']);
  const toggleGroupValue = (value: string) => {
    if (group.includes(value)) group.splice(group.indexOf(value), 1);
    else group.push(value);
    setGroup([...group]);
  };

  return (
    <>
      <Header title="Settings" />
      <Page className="min-h-screen flex flex-col bg-white dark:bg-black">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col gap-8 py-8 px-8">
          <section>
            <BlockTitle className="mb-2 text-lg">Links úteis</BlockTitle>
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
    </>
  );
}
