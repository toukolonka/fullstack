import React from "react";

const Filter = (props) => {

  return (
    <div>
      Find countries
      <input value={props.checkName} onChange={props.checkChange} />
    </div>
  );
};

export default Filter;
