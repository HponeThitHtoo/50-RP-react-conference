import { configureStore } from '@reduxjs/toolkit';
import speakersReducer from './features/speakers/speakersSlice';
import locationReducer from './features/location/locationSlice';
import foodsReducer from './features/foods/foodsSlice';
import scheduleReducer from './features/schedule/scheduleSlice';
import rulesReducer from './features/rules/rulesSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    speakers: speakersReducer,
    location: locationReducer,
    foods: foodsReducer,
    schedule: scheduleReducer,
    rules: rulesReducer,
    user: userReducer,
  },
});
