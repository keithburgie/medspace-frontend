import React from "react";
import { Select } from "react-select-virtualized";
import random from "generate-random-data";
import "./styles.css";

export const optionsDefault = new Array(1000).fill(null).map(() => ({
  value: random.guid(),
  label: `${random.maleFirstName()} - ${random.email("test.com.au")}`,
  lang: random.language()
}));

function App() {
  return (
    <div className="App">
      <h1>React Select Virtualize Example</h1>
      <Select options={optionsDefault} />
    </div>
  );
}