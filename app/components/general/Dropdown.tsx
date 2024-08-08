import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface DropdownProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // ChangeEvent<HTMLSelectElement> türü beklenir
  list: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  value,
  onChange,
  list,
  placeholder,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (value: string) => {
    const event = {
      target: {
        value
      }
    } as unknown as React.ChangeEvent<HTMLSelectElement>; // Type assertion
    onChange(event); // Call onChange with the event object
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <div className="dropdown-input" onClick={() => setOpen(!open)}>
        <div className="dropdown-label">{placeholder}</div>
        <div className="dropdown-arrow">
          <svg
            width="23"
            height="12"
            viewBox="0 0 23 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`arrow-icon ${open ? "open" : ""}`}
          >
            <path
              d="M11.1524 12C10.9172 12 10.7001 11.9616 10.5013 11.8847C10.3025 11.8075 10.1076 11.6737 9.91683 11.4833L0.32896 1.89485C0.124308 1.69056 0.0150631 1.43985 0.00122538 1.1427C-0.0129765 0.845918 0.0962684 0.581362 0.32896 0.349035C0.561287 0.116343 0.818923 0 1.10187 0C1.38481 0 1.64245 0.116343 1.87477 0.349035L11.1524 9.62611L20.43 0.349035C20.6343 0.144383 20.885 0.0351379 21.1822 0.0213002C21.4789 0.00709838 21.7435 0.116343 21.9758 0.349035C22.2085 0.581362 22.3249 0.838999 22.3249 1.12194C22.3249 1.40489 22.2085 1.66252 21.9758 1.89485L12.388 11.4833C12.1971 11.6737 12.0023 11.8075 11.8035 11.8847C11.6047 11.9616 11.3876 12 11.1524 12Z"
              fill="#999999"
            />
          </svg>
        </div>
      </div>

      <div className="list-container" style={{ display: !open ? "none" : "" }}>
        {list.map((item, index) => (
          <div
            key={index}
            className={`list-item ${
              value === item.value ? "item-selected" : ""
            }`}
            onClick={() => handleItemClick(item.value)} // Use handleItemClick
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
