const Loading = () => {
  return (
    <div
      role="loading"
      className="w-full h-[80vh] justify-center items-center flex"
    >
      <div className="inline w-8 h-8 animate-spin bg-[conic-gradient(var(--tw-gradient-stops))] from-[#0cd3ff] via-[#00d9ff] to-[#0059ff] rounded-full"></div>
    </div>
  );
};

export default Loading;
