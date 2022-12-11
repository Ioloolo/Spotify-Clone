import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer } from './components';
import {
  Discover,
  Search,
} from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#0c0c0c]">
        <Searchbar />

        <div className="px-6 pb-16 h-[calc(100vh-60px)] overflow-y-scroll hide-scrollbar flex flex-row">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
        </div>
      </div>

      {activeSong.title && (
        <div className="absolute sm:h-[93px] h-[140px] bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#141440] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
