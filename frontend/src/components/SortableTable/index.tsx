import React from "react";
import lang from '../../locales/en.json';

import './sortableTable.css';

const SortableTable: React.FC = () => {
  return (
    <main id="sortableTable">
      <h1>{lang.sortableTable.title}</h1>
    </main>
  );
};

export default SortableTable;
