import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFoods } from '../features/foods/foodsSlice';

function Food() {
  const { isLoading, foods } = useSelector((store) => store.foods);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  return (
    <section className="flex-1 flex flex-col lg:flex-row mx-10 mb-4 gap-4 font-lato">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {foods.map((food) => (
            <div
              key={food.title}
              className="lg:w-1/3 flex flex-col justify-center items-center bg-purple-700 rounded-xl py-4 space-y-2 lg:space-y-5 text-white shadow-xl"
            >
              <h4 className="font-bold">{food.title}</h4>
              <div className="h-0.5 w-4/5 bg-mossgreen" />
              <p className="text-plum">{food.time}</p>
              <div className="h-0.5 w-4/5 bg-mossgreen" />
              <p className="text-plum">{food.food}</p>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default Food;
