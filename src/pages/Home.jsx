import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BsTwitter,
  BsInstagram,
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
} from 'react-icons/bs';
import { CgFacebook } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';

import { getSpeakers } from '../features/speakers/speakersSlice';

function Home() {
  const { isLoading, speakers } = useSelector((store) => store.speakers);
  const dispatch = useDispatch();

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      // console.log('Scroll Offset', carousel.current.offsetWidth * currentIndex);
      // console.log('MaxScrollWidth', maxScrollWidth.current);
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  const movePrev = () => {
    // alert(isDisabled('prev'));
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const moveNext = () => {
    // alert(isDisabled('next'));
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    dispatch(getSpeakers());
  }, [dispatch]);

  useEffect(() => {
    // console.log("scrollWidth: ",carousel.current.scrollWidth);
    // console.log("offsetWidth: ", carousel.current.offsetWidth);

    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;

    // console.log('useEffect MaxScrollWidth', maxScrollWidth.current);
  }, [speakers]);

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  return (
    <div className="relative flex-1 bg-purple-700 clip-custom-rectangle flex flex-col justify-center items-center gap-y-10">
      <div className="mx-6">
        <h1 className="font-lato text-xl text-white">React Barcamp 2023</h1>
        <p className="font-lato text-gray-200">
          React Barcamp of Myanmar will be held on 11<sup>th</sup> October, 2023
          at MICT Park. You are welcome to execute.
        </p>
      </div>

      {/* TODO: Speakers */}
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="flex justify-center gap-x-2 md:gap-x-4">
          <button
            type="button"
            className="text-4xl text-mossgreen disabled:cursor-not-allowed"
            onClick={movePrev}
            disabled={isDisabled('prev')}
          >
            <BsFillCaretLeftFill />
          </button>
          <div
            ref={carousel}
            className="flex w-2/5 gap-x-3 lg:gap-x-9 xl:gap-x-7 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x"
          >
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="snap-start basis-20 flex-grow-0 flex-shrink-0"
              >
                <img
                  src={speaker.image}
                  alt="speaker"
                  className="rounded-full border-4 border-mossgreen"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="text-4xl text-mossgreen disabled:cursor-not-allowed"
            onClick={moveNext}
            disabled={isDisabled('next')}
          >
            <BsFillCaretRightFill />
          </button>
        </div>
      )}

      {/* Social Icons */}
      <div className="absolute top-2/3 md:top-1/2 left-0 -translate-y-2/3 md:-translate-y-1/2 flex flex-col justify-center items-center bg-black space-y-4">
        <Link
          to="https://www.facebook.com"
          className="text-xl text-white p-2 hover:text-purple-600 duration-300"
        >
          <CgFacebook />
        </Link>
        <Link
          to="https://www.twitter.com"
          className="text-xl text-white p-2 hover:text-purple-600 duration-300"
        >
          <BsTwitter />
        </Link>
        <Link
          to="https://www.instagram.com"
          className="text-xl text-white p-2 hover:text-purple-600 duration-300"
        >
          <BsInstagram />
        </Link>
      </div>
    </div>
  );
}

export default Home;
