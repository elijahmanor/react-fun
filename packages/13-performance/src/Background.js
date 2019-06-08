import React, { useEffect } from "react";
import { useSettings } from "./SettingsContext";

export default function Background({ children }) {
  const {
    collectionBackgroundUrl,
    cachedBackgroundUrl,
    dispatch,
    isDarkMode
  } = useSettings();

  useEffect(() => {
    async function getUrl() {
      if (!cachedBackgroundUrl) {
        const response = await window.fetch(collectionBackgroundUrl);
        dispatch({ type: "SET_BACKGROUND_URL", backgroundUrl: response.url });
      }
    }
    getUrl();
  }, [dispatch, cachedBackgroundUrl, collectionBackgroundUrl]);

  useEffect(() => {
    const handleKey = ({ key, ctrlKey }) => {
      if (key === "b" && ctrlKey) {
        dispatch({ type: "RESET_BACKGROUND_URL" });
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [dispatch]);

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
            url(${cachedBackgroundUrl})
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
