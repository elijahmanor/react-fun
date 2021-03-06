import React, { useEffect } from "react";
import { useLocalStorage } from "./customHooks";
import { useSettings } from "./SettingsContext";

const UNSPLASH_COLLECTION =
  "https://source.unsplash.com/collection/3802293/1600x900";

export default function Background({ children }) {
  const [url, setUrl] = useLocalStorage("backgroundImage", UNSPLASH_COLLECTION);
  const [isDarkMode] = useSettings();

  console.log({ isDarkMode });

  useEffect(() => {
    async function getUrl() {
      if (url === UNSPLASH_COLLECTION) {
        const response = await window.fetch(UNSPLASH_COLLECTION);
        setUrl(response.url);
      }
    }
    getUrl();
  }, [setUrl, url]);

  useEffect(() => {
    const handleKey = ({ key, ctrlKey, metaKey }) => {
      if (key === "b" && (metaKey || ctrlKey)) {
        setUrl(UNSPLASH_COLLECTION);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [setUrl]);

  return (
    <>
      <div
        className="Background"
        style={{
          backgroundImage: `
            radial-gradient(circle, transparent 40%, ${
              isDarkMode ? "black" : "transparent"
            } 75%),
            linear-gradient(to right, transparent, transparent),
            url(${url})
          `,
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      >
        {children}
      </div>
    </>
  );
}
