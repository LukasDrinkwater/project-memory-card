import { useState } from "react";

function Dropdown(props) {
  const data = props.options;

  const [selectedValue, setSelectedvalue] = useState("");

  return (
    <div>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedvalue(e.target.value)}
      >
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <p>{selectedValue}</p>
    </div>
  );
}

export { Dropdown };
