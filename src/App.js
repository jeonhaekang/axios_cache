import "./App.css";
import { useCallback, useState } from "react";
import useAxios from "./hooks/useAxios";

function App() {
  const { yes_no } = useAxios();

  const [yes_or_no, setYesOrNo] = useState(null);

  const updateYesOrNo = useCallback(async () => {
    const response = await yes_no.getYesOrNo();

    setYesOrNo(response);
  }, [yes_no]);

  return (
    <div className="root-container">
      <div>
        <button onClick={updateYesOrNo}>버튼</button>
      </div>

      {yes_or_no && (
        <div>
          <img src={yes_or_no.image} alt={"yes_or_no_image"} />
          <p>{yes_or_no.answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
