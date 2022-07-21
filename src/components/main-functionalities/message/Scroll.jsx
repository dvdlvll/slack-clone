// react libraries //
import React, { useRef, useEffect } from "react";

// components //
function Scroll() {
  const elementRef = useRef();

  useEffect(() => {
    elementRef.current.scrollIntoView();
  });

  return <div ref={elementRef}></div>;
}

export default Scroll;
