// Stats.jsx
import React, { useState, useEffect } from 'react';

const Stats = () => {
  const [stats, setStats] = useState({
    steps: 0,     // 걸음 수
    workout: 0,   // 운동 시간(분)
    sleep: 0,     // 수면 시간(시)
  });

  useEffect(() => {
    const saved = localStorage.getItem('todayStats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStats({
          steps: parsed.steps || 0,
          workout: parsed.workout || 0,
          sleep: parsed.sleep || 0,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // 목표값 (운동은 분 단위)
  const goals = { steps: 30000, workout: 5 * 60, sleep: 24 };

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (type, value) => {
    const numValue = Math.max(0, Number(value));
    const newStats = { ...stats, [type]: numValue };
    setStats(newStats);
    localStorage.setItem('todayStats', JSON.stringify(newStats));
  };

  const getPercent = (current, goal) => {
    const percent = (current / goal) * 100;
    return Math.min(percent, 100) + '%';
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #000000ff',
    borderRadius: '8px',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  };

  return (
    <div
      className="card"
      style={{
        height: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        background: 'white',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '30px' }}>달성률</h3>

      <div
        style={{
          background: '#f0f0f0 ',
          borderRadius: '12px',
          padding: '70px',
          marginBottom: '15px',
          textAlign: 'center',
        }}
      >
        <strong>December 2025</strong>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            fontSize: '0.8rem',
            background: isEditing ? '#298FEE' : 'white',
            color: isEditing ? 'white' : '#666',
            border: '1px solid #f0f0f0 ',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          {isEditing ? '완료' : '수정'}
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* 걸음 수 */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              marginBottom: '5px',
            }}
          >
            <span>걸음 수</span>
            <span style={{ color: '#999' }}>
              {stats.steps} / {goals.steps}
            </span>
          </div>
          <div
            style={{
              height: '8px',
              background: '#eee',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: getPercent(stats.steps, goals.steps),
                height: '100%',
                background: '#2F80ED',
                transition: 'width 0.5s ease',
              }}
            ></div>
          </div>

          {isEditing && (
            <input
              type="number"
              value={stats.steps}
              onChange={(e) => handleChange('steps', e.target.value)}
              placeholder="걸음 수"
              style={inputStyle}
            />
          )}
        </div>

        {/* 수면 시간(시) */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              marginBottom: '5px',
            }}
          >
            <span>수면 시간(시)</span>
            <span style={{ color: '#999' }}>
              {stats.sleep} / {goals.sleep}
            </span>
          </div>
          <div
            style={{
              height: '8px',
              background: '#eee',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: getPercent(stats.sleep, goals.sleep),
                height: '100%',
                background: '#298FEE ',
                transition: 'width 0.5s ease',
              }}
            ></div>
          </div>

          {isEditing && (
            <input
              type="number"
              value={stats.sleep}
              onChange={(e) => handleChange('sleep', e.target.value)}
              placeholder="수면 시간(시)"
              style={inputStyle}
            />
          )}
        </div>

        {/* 운동 시간(분) */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              marginBottom: '5px',
            }}
          >
            <span>운동 시간(분)</span>
            <span style={{ color: '#999' }}>
              {stats.workout} / {goals.workout}
            </span>
          </div>
          <div
            style={{
              height: '8px',
              background: '#eee',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: getPercent(stats.workout, goals.workout),
                height: '100%',
                background: '#2F80ED',
                transition: 'width 0.5s ease',
              }}
            ></div>
          </div>

          {isEditing && (
            <input
              type="number"
              value={stats.workout}
              onChange={(e) => handleChange('workout', e.target.value)}
              placeholder="운동 시간(분)"
              style={inputStyle}
            />
          )}
        </div>
      </div>

      <button
        style={{
          marginBottom: '80px',
          marginTop: '100px',
          width: '100%',
          padding: '30px',
          border: '3px solid #298FEE ',
          color: '#298FEE ',
          background: 'white',
          borderRadius: '12px',
          cursor: 'pointer',
        }}
      >
        리포트 보기
      </button>
    </div>
  );
};

export default Stats;
