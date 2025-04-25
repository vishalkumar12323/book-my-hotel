import React from "react";
import clsx from "clsx";

const AppLogo = ({ className }) => {
  return (
    <>
      <div
        className={clsx(
          `uppercase w-fit text-xl md:text-2xl font-[900] text-[20px] bg-[conic-gradient(var(--tw-gradient-stops))] from-[#f3f8ff] via-[#deecff] to-[#c6cfff]`,
          className
        )}
      >
        bookmyhotel
      </div>
    </>
  );
};

export default AppLogo;
