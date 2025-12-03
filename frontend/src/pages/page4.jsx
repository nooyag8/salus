import { useState } from "react";
import "../style/step.css";

function Page4() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleNext = () => {
    if (!height || !weight) {
      alert("키와 몸무게를 모두 입력해주세요!");
      return;
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">키와 몸무게를 입력해주세요!</h1>

      <input
        className="input-box"
        type="number"
        placeholder="키 입력 (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <input
        className="input-box"
        type="number"
        placeholder="몸무게 입력 (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <button className="next-btn" onClick={handleNext}>
        다음
      </button>
    </div>
  );
}

export default Page4;
