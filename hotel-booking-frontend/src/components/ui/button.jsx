import clsx from "clsx";
const Button = ({ children, buttonState = false, className = "", ...rest }) => {
  return (
    <button
      type="submit"
      className={clsx(
        `${
          buttonState
            ? "cursor-not-allowed bg-gray-300 hover:border-gray-300 text-gray-700"
            : "cursor-pointer hover:border-blue-500"
        } shadow-md border-2 px-4 py-2 rounded-lg w-fit mt-4 transition-color font-semibold  flex justify-center items-center gap-1`,
        className
      )}
      disabled={buttonState}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
