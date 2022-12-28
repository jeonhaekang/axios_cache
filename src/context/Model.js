import { createContext, useContext, useMemo } from "react";
import YesNo from "../axios/YesNo";
import { useApplicationContext } from "./Application";

const ModelContext = createContext();

const ModelContextProvider = (props) => {
  const { children } = props;

  const { storage } = useApplicationContext();

  const instance_actions = useMemo(() => {
    return {
      storage,
    };
  }, [storage]);

  const instance = useMemo(() => {
    return {
      yes_no: new YesNo(instance_actions),
    };
  }, [instance_actions]);

  return (
    <ModelContext.Provider value={instance}>{children}</ModelContext.Provider>
  );
};

export const useModelContext = () => {
  const c = useContext(ModelContext);

  return c;
};

export default ModelContextProvider;
