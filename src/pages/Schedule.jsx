import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTopicsWithSpeaker } from '../features/schedule/scheduleSlice';

// https://dribbble.com/shots/16579956-Productivity-Dashboard-Design

function Schedule() {
  const { isLoading, topicsWithSpeaker } = useSelector(
    (store) => store.schedule
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopicsWithSpeaker());
  }, [dispatch]);

  return (
    <section className="flex-1 flex flex-col gap-3 mx-10 mb-4 font-lato overflow-y-scroll">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {topicsWithSpeaker.map((topic) => (
            <div
              key={topic.id}
              className="flex flex-col md:flex-row gap-4 p-10 bg-purple-700 rounded-md"
            >
              <div className="w-16 h-16">
                <img
                  src={topic.speaker.image}
                  alt="speaker"
                  className="w-full h-full rounded-full border-4 border-mossgreen shadow-xl"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm lg:text-base text-white">
                  {topic.speaker.name}
                </p>
                <p className="text-xs lg:text-sm text-plum">
                  {topic.speaker.occupation}
                </p>
              </div>
              <div className="flex-1">
                <h5 className="inline-block px-2.5 py-0.5 bg-mossgreen rounded-xl text-xs">
                  title
                </h5>
                <p className="text-sm lg:text-base text-white">{topic.title}</p>
              </div>
              <div className="md:basis-40">
                <h5 className="inline-block px-2.5 py-0.5 bg-mossgreen rounded-xl text-xs">
                  time
                </h5>
                <p className="text-sm lg:text-base text-white">
                  {topic.startTime} - {topic.endTime}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default Schedule;
