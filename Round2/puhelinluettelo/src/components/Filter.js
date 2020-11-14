import React from "react";

const Filter = (props) => {
  return (
    <div>
      Filter shown with
      <input value={props.checkName} onChange={props.checkChange} />
    </div>
  );
};

export default Filter;
