import React, { useEffect } from "react";
import { useLocalStorage } from "./customHooks";

const UNSPLASH_COLLECTION =
  "https://source.unsplash.com/collection/3802293/1600x900";

export default function Background({ children }) {
  const [url, setUrl] = useLocalStorage("backgroundImage", UNSPLASH_COLLECTION);

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
          backgroundImage: `url(${url})`,
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      >
        {children}
      </div>
    </>
  );
}
