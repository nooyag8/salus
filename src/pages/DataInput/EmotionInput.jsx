import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import './EmotionInput.css';

// 컨디션 데이터
const conditions = [
  { label: '아주 좋음', english: 'well', emoji: '🤩' }, 
  { label: '좋음', english: 'good', emoji: '😊' }, 
  { label: '피곤함', english: 'tired', emoji: '😴' }, 
  { label: '매우 피곤함', english: 'exhausted', emoji: '😩' }, 
  { label: '소화불량', english: 'indigestion', emoji: '🤢' }, 
  { label: '두통', english: 'headache', emoji: '🤕' }, 
  { label: '몸살', english: 'cold', emoji: '🤒' }, 
  { label: '감기', english: 'flu', emoji: '🤧' }, 
];

function EmotionInput() {
  const navigate = useNavigate();
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    console.log('선택함:', condition.label);
  };

  const handleNextClick = () => {
    if (selectedCondition) {
      console.log('다음으로 이동!');
      
      navigate('/condition', { state: { condition: selectedCondition } });
      
    } else {
      alert('오늘의 컨디션을 선택해주세요.');
    }
  };

  return (
    <div className="emotion-input-container">
      <h2>오늘의 컨디션은 어떠신가요?</h2>
      
      <div className="emotion-options">
        {conditions.map((condition, index) => (
          <div 
            key={index} 
            className={`emotion-option ${selectedCondition?.label === condition.label ? 'selected' : ''}`}
            onClick={() => handleConditionSelect(condition)}
          >
            <span className="emoji">{condition.emoji}</span>
            <span className="label">{condition.label}</span>
          </div>
        ))}
      </div>

      <button className="next-button" onClick={handleNextClick}>
        다음
      </button>
    </div>
  );
}

export default EmotionInput;