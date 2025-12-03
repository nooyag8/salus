import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/step.css";

function Page3() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");

  const handleNext = () => {
    if (!age) {
      alert("나이를 입력해주세요!");
      return;
    }
    navigate("/page4");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">몇살이신가요?</h1>

      <input
        className="input-box"
        type="number"
        placeholder="나이를 입력해주세요."
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="next-btn" onClick={handleNext}>
        다음
      </button>
    </div>
  );
}

export default Page3;
