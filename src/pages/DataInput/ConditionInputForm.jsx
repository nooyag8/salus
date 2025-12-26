// ConditionInputForm.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ConditionInputForm.css';

function ConditionInputForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // EmotionInput에서 넘겨준 감정 데이터
  const emotionData = location.state?.condition;

  const [formData, setFormData] = useState({
    weight: '',
    steps: '',
    sleepHours: '',
    sleepMinutes: '',
    isExercising: null,
    exerciseMinutes: '',
    exerciseType: 'none',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExerciseToggle = (isExercising) => {
    setFormData((prevData) => ({
      ...prevData,
      isExercising,
      exerciseMinutes: isExercising ? prevData.exerciseMinutes : '',
      exerciseType: isExercising ? prevData.exerciseType : 'none',
    }));
  };

  const handleExerciseTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      exerciseType: type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 + 감정 데이터
    const finalData = {
      ...formData,
      emotion: emotionData,
    };

    console.log('최종 저장할 데이터:', finalData);

    const steps = Number(formData.steps) || 0;
    const workoutMinutes = formData.isExercising ? Number(formData.exerciseMinutes) || 0 : 0;
    const sleepHours =
      (Number(formData.sleepHours) || 0) +
      (Number(formData.sleepMinutes) || 0) / 60;

    const todayStats = {
      steps,
      workout: workoutMinutes, // 분
      sleep: Number(sleepHours.toFixed(2)), // 시
    };

    localStorage.setItem('todayStats', JSON.stringify(todayStats));

    alert('기록되었습니다');
    navigate('/dashboard');
  };

  const exerciseTypes = ['걷기', '달리기', '요가', '유산소', '근력', '스트레칭'];

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="condition-form">
        <h1>오늘의 컨디션을 입력해주세요!</h1>

        {/* 선택한 감정 표시 */}
        {emotionData && (
          <div
            style={{
              background: '#eaf4ff',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              border: '1px solid #4A90E2',
            }}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>
              {emotionData.emoji}
            </span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>
              오늘의 기분: {emotionData.label}
            </span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="weight">몸무게</label>
          <div className="input-group">
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              min="0"
              placeholder="0"
            />
            <span className="unit">Kg</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="steps">걸음 수</label>
          <div className="input-group">
            <input
              type="number"
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleInputChange}
              min="0"
              placeholder="0"
            />
            <span className="unit">보</span>
          </div>
        </div>

        <div className="form-group">
          <label>수면 시간</label>
          <div className="input-group sleep-time">
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleInputChange}
              min="0"
              placeholder="0"
            />
            <span className="unit">시간</span>
            <input
              type="number"
              name="sleepMinutes"
              value={formData.sleepMinutes}
              onChange={handleInputChange}
              min="0"
              placeholder="0"
            />
            <span className="unit">분</span>
          </div>
        </div>

        <div className="form-group">
          <label>운동 여부</label>
          <div className="radio-group">
            <button
              type="button"
              className={`toggle-button ${
                formData.isExercising === true ? 'active' : ''
              }`}
              onClick={() => handleExerciseToggle(true)}
            >
              <span className="check-icon">✅</span> 운동함
            </button>
            <button
              type="button"
              className={`toggle-button ${
                formData.isExercising === false ? 'active-disabled' : ''
              }`}
              onClick={() => handleExerciseToggle(false)}
            >
              <span className="cross-icon">❌</span> 운동 안 함
            </button>

            {formData.isExercising === true && (
              <div className="exercise-time-input">
                <input
                  type="number"
                  name="exerciseMinutes"
                  value={formData.exerciseMinutes}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="분"
                />
                <span className="unit">분</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-group exercise-type-group">
          <label>운동</label>
          <div className="exercise-buttons-row">
            <button
              type="button"
              className={`type-button ${
                formData.exerciseType === 'none' ? 'selected' : ''
              }`}
              onClick={() => handleExerciseTypeChange('none')}
            >
              없음
            </button>
            {exerciseTypes.slice(0, 3).map((type) => (
              <button
                key={type}
                type="button"
                className={`type-button ${
                  formData.exerciseType === type ? 'selected' : ''
                }`}
                onClick={() => handleExerciseTypeChange(type)}
                disabled={formData.isExercising === false}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="exercise-buttons-row">
            {exerciseTypes.slice(3).map((type) => (
              <button
                key={type}
                type="button"
                className={`type-button ${
                  formData.exerciseType === type ? 'selected' : ''
                }`}
                onClick={() => handleExerciseTypeChange(type)}
                disabled={formData.isExercising === false}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">
          저장하기
        </button>
      </form>
    </div>
  );
}

export default ConditionInputForm;
