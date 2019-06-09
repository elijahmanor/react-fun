import React, { useState, useEffect } from "react";

const UNSPLASH_COLLECTION =
  "https://source.unsplash.com/collection/3802293/1600x900";

export default function Background({ children }) {
  const defaultUrl =
    window.localStorage.getItem("backgroundImage") || UNSPLASH_COLLECTION;
  const [url, setUrl] = useState(defaultUrl);

  useEffect(() => {
    async function getUrl() {
      if (url === UNSPLASH_COLLECTION) {
        const response = await window.fetch(UNSPLASH_COLLECTION);
        window.localStorage.setItem("backgroundImage", response.url);
        setUrl(response.url);
      }
    }
    getUrl();
  }, [url]);

  useEffect(() => {
    const handleKey = ({ key, ctrlKey, metaKey }) => {
      if (key === "b" && (metaKey || ctrlKey)) {
        window.localStorage.removeItem("backgroundImage");
        setUrl(UNSPLASH_COLLECTION);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

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
