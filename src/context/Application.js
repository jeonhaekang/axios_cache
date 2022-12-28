import { createContext, useContext, useMemo, useRef } from "react";
import ModelContextProvider from "./Model";

const ApplicationContext = createContext();

const ApplicationContextProvider = (props) => {
  const { children } = props;

  const storage = useRef(new Map());

  const _storage = useMemo(() => {
    return {
      set: (key, value) => {
        storage.current.set(key, value);
      },
      get: (key) => {
        return storage.current.get(key);
      },
      delete: (key) => {
        storage.current.delete(key);
      },
      clear: () => {
        storage.current.clear();
      },
    };
  }, []);

  const actions = useMemo(() => {
    return {
      storage: _storage,
    };
  }, [_storage]);

  return (
    <ApplicationContext.Provider value={actions}>
      <ModelContextProvider>{children}</ModelContextProvider>
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const c = useContext(ApplicationContext);

  return c;
};

export default ApplicationContextProvider;
