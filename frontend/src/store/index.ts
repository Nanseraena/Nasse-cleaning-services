import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./auth/reducer";
import uiReducer from "./ui/reducer";
import rootSaga from "./rootSaga";

const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async (_key: string, value: string) => value,
  removeItem: async () => undefined,
});
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootReducer = combineReducers({ auth: authReducer, ui: uiReducer });
const persistedReducer = persistReducer({ key: "nasse", version: 1, storage, whitelist: ["ui"] }, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: false,
    serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
  }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
