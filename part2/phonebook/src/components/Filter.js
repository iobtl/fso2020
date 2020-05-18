import React from 'react'

const Filter = ({ newFilter, handleNewFilter }) => {
  return (
    <form>
      <div>
        filter shown with <input value={newFilter} onChange={handleNewFilter} />
      </div>
    </form>
  );
};

export default Filter