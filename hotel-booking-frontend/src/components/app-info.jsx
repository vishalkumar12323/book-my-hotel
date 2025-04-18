import { MdClose } from "react-icons/md";

const AppInfoToast = ({ setShowAppInfoToast }) => {
  return (
    <div className=" rounded-md px-4 py-3 bg-white border shadow w-fit flex items-center gap-2">
      <p className="text-[12px] md:text-[15px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
        laborum, consectetur adipisicing elit. Eveniet laborum,
      </p>

      <button
        className="cursor-pointer hover:bg-slate-300 transition-colors rounded-full p-1"
        onClick={() => setShowAppInfoToast(false)}
      >
        <MdClose size={20} />
      </button>
    </div>
  );
};

export default AppInfoToast;
