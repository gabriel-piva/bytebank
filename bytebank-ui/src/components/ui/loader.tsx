import React from "react";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-t-transparent"
        role="status"
        aria-label="Carregando..."
      ></div>
    </div>
  );
};

export default Loader;
