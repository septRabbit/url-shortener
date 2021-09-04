import React, { useState } from "react";

function Card({ children, className }) {
  function clsx(...className) {
    return className.filter(Boolean).join(" ");
  }

  return (
    <div className={clsx("p-4 rounded-lg bg-white shadow-lg", className)}>
      {children}
    </div>
  );
}

export default Card;
