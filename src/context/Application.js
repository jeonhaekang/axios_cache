import { createContext, useContext, useMemo, useRef } from "react";

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

  const values = useMemo(() => {
    return {
      storage: _storage,
    };
  }, [_storage]);

  return (
    <ApplicationContext.Provider value={values}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  return useContext(ApplicationContext);
};

export default ApplicationContextProvider;
