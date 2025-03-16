import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const themes = [
    { name: "Ocean", class: "ocean-theme", color: "#26d0ce" },
    { name: "Purple", class: "purple-theme", color: "#4a148c" },
    { name: "Sunset", class: "sunset-theme", color: "#ff416c" },
    { name: "Northern Lights", class: "northern-lights", color: "#43cea2" },
    { name: "Midnight", class: "midnight-city", color: "#414345" },
    { name: "Cosmic", class: "cosmic-fusion", color: "#3a1c71" },
    { name: "Miami", class: "miami-sunset", color: "#fc5c7d" },
    { name: "Deep Space", class: "deep-space", color: "#004e92" },
    { name: "Twilight", class: "twilight", color: "#302b63" },
    { name: "Emerald", class: "emerald", color: "#348f50" },
  ];

  const [currentTheme, setCurrentTheme] = useState("purple-theme");

  useEffect(() => {
    // Load saved theme on component mount
    const savedTheme = localStorage.getItem("taskManagerTheme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = "purple-theme"; // Default theme
    }
  }, []);

  const changeTheme = (themeClass) => {
    setCurrentTheme(themeClass);
    document.body.className = themeClass;
    localStorage.setItem("taskManagerTheme", themeClass);
  };

  return (
    <div className="theme-switcher">
      <h3>Choose Theme</h3>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.class}
            className={`theme-button ${
              currentTheme === theme.class ? "active" : ""
            }`}
            style={{ backgroundColor: theme.color }}
            onClick={() => changeTheme(theme.class)}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
