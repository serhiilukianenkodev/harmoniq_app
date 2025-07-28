import { useEffect, useRef, useState } from "react";
import styles from "./CustomSelect.module.css";

export default function CustomSelect({
  options,
  defaultSelected = "",
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  const handleKeyDown = (event, option) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={styles.customSelect}
      ref={selectRef}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <div
        className={`${styles.selectedOption} ${
          selected === "Popular"
            ? styles.selectedOptionPopular
            : styles.selectedOptionAll
        }`}
        onClick={toggleDropdown}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        {selected || "Select..."}
        <span className={styles.arrow}>▾</span>
      </div>
      {isOpen && (
        <ul className={styles.options} role="listbox">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              className={`${styles.option} ${
                selected === option ? styles.active : ""
              } ${
                option === "Popular" ? styles.optionPopular : styles.optionAll
              }`}
              role="option"
              aria-selected={selected === option}
              tabIndex={0}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
