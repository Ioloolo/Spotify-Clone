const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <h1 className="font-bold text-2xl text-white mt-2">
      {title || '불러오는 중...'}
    </h1>
  </div>
);

export default Loader;
