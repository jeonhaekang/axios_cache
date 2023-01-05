import { useMemo } from "react";
import YesNo from "../axios/YesNo";
import { useApplicationContext } from "../context/Application";

const useAxios = () => {
  const { storage } = useApplicationContext();

  const instance = useMemo(() => {
    return {
      yes_no: new YesNo(storage),
    };
  }, [storage]);

  return instance;
};

export default useAxios;
