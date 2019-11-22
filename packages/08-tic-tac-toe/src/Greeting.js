import React, { useState, useRef, useEffect } from "react";
import greetingTime from "greeting-time";

function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export default function Greeting({ name, onChange }) {
  const [isEditing, setIsEditing] = useState(!name);
  const input = useRef();
  useEffect(() => {
    if (isEditing) {
      input.current.select();
    }
  }, [isEditing]);
  return (
    <div className="Greeting">
      {isEditing ? (
        <input
          data-testid="greeting-text"
          ref={input}
          type="text"
          value={name}
          autoFocus={!isInIframe()}
          placeholder="What's your name?"
          onChange={e => onChange(e.target.value)}
          onKeyPress={({ key }) => key === "Enter" && setIsEditing(false)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <h1
          onDoubleClick={() => setIsEditing(true)}
          data-testid="greeting-label"
        >
          {greetingTime(new Date())}{name && `, ${name}`}!
        </h1>
      )}
    </div>
  );
}
