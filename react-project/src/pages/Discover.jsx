import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetChartQuery } from '../redux/services/backendBridge';

const Discover = () => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player,
  );

  const { data, isFetching, error } = useGetChartQuery();

  if (isFetching) return <Loader title="실시간 차트 불러오는 중..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-center">
          실시간 한국 순위
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
