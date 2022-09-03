import React, { useEffect } from "react";
import { useSettings } from "./SettingsContext";

export default function Background({ children }) {
  const {
    collectionBackgroundUrl,
    cachedBackgroundUrl,
    dispatch
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
          backgroundImage: `url(${cachedBackgroundUrl})`,
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      >
        {children}
      </div>
    </>
  );
}
