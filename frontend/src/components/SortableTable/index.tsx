import React from 'react';
import lang from "../../locales/en.json";

const SortableTable: React.FC = () => {
  return (
    <main id="sortableTable">
      <Typography variant="h4" gutterBottom ref={titleRef}>
        {lang.sortableTable.title}
      </Typography>
    </main>
  );
};

export default SortableTable;
