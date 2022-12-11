import { configureStore } from '@reduxjs/toolkit';

import { BackendBridge } from './services/backendBridge';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [BackendBridge.reducerPath]: BackendBridge.reducer,
    player: playerReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BackendBridge.middleware),
});
