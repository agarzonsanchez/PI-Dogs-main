import React, { useRef } from "react";
import "../Input/Input.css";

const Input = (props) => {
  const ref = useRef(null);
  return (
    <div>
      <form>
        <input
        className="inputStyles"
          ref={ref}
          type="text"
          placeholder="Type Dogs"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <button className="btnStylesS" onClick={(e) => props.onClick(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
