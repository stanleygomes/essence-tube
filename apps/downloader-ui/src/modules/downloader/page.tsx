"use client";

import { useState } from "react";
import { downloadMedia } from "@services/downloadService";

type Format = "mp3" | "mp4";
type Status = "idle" | "loading" | "success" | "error";

export default function Downloader() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<Format>("mp4");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownload = async () => {
    if (!url.trim()) {
      setErrorMessage("Please enter a YouTube URL.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await downloadMedia(url.trim(), format);
      setStatus("success");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "An unexpected error occurred.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          letterSpacing: "-0.5px",
        }}
      >
        YouTube Downloader
      </h1>
      <p
        style={{
          fontSize: "0.875rem",
          marginBottom: "2rem",
          opacity: 0.7,
        }}
      >
        Download videos or playlists as MP4 or MP3.
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            fontSize: "0.875rem",
            border: "2px solid var(--foreground)",
            background: "transparent",
            color: "var(--foreground)",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["mp4", "mp3"] as Format[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              style={{
                flex: 1,
                padding: "0.6rem",
                fontSize: "0.875rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "2px solid var(--foreground)",
                background: format === f ? "var(--foreground)" : "transparent",
                color: format === f ? "var(--background)" : "var(--foreground)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={handleDownload}
          disabled={status === "loading"}
          style={{
            padding: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: "bold",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            border: "2px solid var(--foreground)",
            background: "var(--foreground)",
            color: "var(--background)",
            opacity: status === "loading" ? 0.6 : 1,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          {status === "loading" ? "Downloading..." : "Download"}
        </button>

        {status === "success" && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#2f7c4a",
              textAlign: "center",
            }}
          >
            Download started successfully.
          </p>
        )}

        {status === "error" && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#7c2f2f",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </main>
  );
}
