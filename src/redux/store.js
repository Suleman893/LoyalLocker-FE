import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import adminReducer from "../redux/admin/adminSlice";
import authReducer from "../redux/auth/authSlice";
import companyReducer from "../redux/company/companySlice";
import consumerReducer from "../redux/consumer/consumerSlice";

const persistConfig = {
  key: "root",
  version: 1,
  timeout: 100,
  whitelist: ["auth"],
  storage,
};

const reducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  company: companyReducer,
  consumer: consumerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
