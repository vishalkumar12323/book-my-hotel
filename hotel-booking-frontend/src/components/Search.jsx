import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";

const Search = ({ setQuery }) => {
  const { register, reset, handleSubmit } = useForm();

  const submitForm = useCallback(
    (data) => {
      if (data) {
        setQuery({ hotelName: data.query });
      }
      reset();
    },
    [setQuery, reset]
  );
  return (
    <div className="flex justify-between items-center space-y-2 w-full mx-auto">
      <form onSubmit={handleSubmit(submitForm)} className="w-full flex gap-2">
        <input
          type="text"
          name="query"
          id="query"
          className="w-full py-2 px-1 text-[12px] md:text-[16px] focus:ring-1 outline-none focus:ring-blue-600 transition rounded shadow border capitalize"
          placeholder="search hotels or restaurants by name..."
          {...register("query", {
            required: true,
            minLength: 4,
            maxLength: 50,
          })}
        />
        <button
          type="submit"
          className="w-[140px] text-[12px] md:text-[16px] shadow rounded border bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          update search
        </button>
      </form>
    </div>
  );
};

export default memo(Search);
