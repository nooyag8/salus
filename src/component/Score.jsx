import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Score = () => {
  const navigate = useNavigate();

  // 닉네임 상태
  const [nickname, setNickname] = useState('[닉네임]');
  const [isEditing, setIsEditing] = useState(false);

  const [scoreData, setScoreData] = useState({
    score: 0,
    diff: 0,
    message: ''
  });

  useEffect(() => {
    const storedNickname = localStorage.getItem('userNickname'); // SignUpPage에서 저장한 key
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  // 점수 효과 
  useEffect(() => {
    setTimeout(() => {
      setScoreData({
        score: 50,
        diff: 10,
        message: '오늘의 건강 상태를 확인해보세요!'
      });
    }, 800);
  }, []);

  return (
    <div className="card" style={{
      display: 'flex', alignItems: 'center', gap: '30px', height: '100%', 
      padding: '24px', boxSizing: 'border-box', background: 'white', borderRadius: '16px'
    }}>
      {/* 점수 원형 그래프 */}
      <div style={{
        minWidth: '200px', height: '200px', 
        borderRadius: '50%', 
        background: `conic-gradient(#2F80ED ${scoreData.score}%, #f0f0f0 ${scoreData.score}% 100%)`,
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <div style={{
          width: '100px', height: '100px', background: 'white', borderRadius: '500%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontSize: '2rem', fontWeight: 'bold'
        }}>
          {scoreData.score}<span style={{fontSize: '1rem'}}>점</span>
        </div>
      </div>

      {/* 가운데: 텍스트 정보 영역 */}
      <div style={{flex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
          {isEditing ? (
            <div style={{display: 'flex', gap: '5px'}}>
              <input 
                type="text" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)}
                autoFocus
                style={{
                  fontSize: '1.5rem', fontWeight: 'bold', width: '120px',
                  border: 'none', borderBottom: '2px solid #298FEE', outline: 'none'
                }}
              />
              <button 
                onClick={() => setIsEditing(false)}
                style={{
                  background: '#298FEE', color: 'white', border: 'none', 
                  borderRadius: '4px', cursor: 'pointer', padding: '0 10px'
                }}
              >
                확인
              </button>
            </div>
          ) : (
            <h2 style={{margin: 0, fontSize: '3rem'}}>
              안녕하세요, {nickname}님!
              <span 
                onClick={() => setIsEditing(true)}
                style={{
                  fontSize: '1.3rem', marginLeft: '10px', cursor: 'pointer', 
                  opacity: 0.3 
                }}
                title="닉네임 수정"
              >
                ✔️
              </span>
            </h2>
          )}
        </div>

        <p style={{
          margin: '16px 0',      
          color: '#706f6fff', 
          fontSize: '1.7rem', 
        }}>
          {scoreData.message}
        </p>
        
        {scoreData.score > 0 && (
          <div style={{margin: '10px 0 0 0', color: '#2ecc70ff', fontSize: '1rem'}}>
            <p>▲ 어제보다 +{scoreData.diff} 증가 했어요!</p>
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate('/emotion')} 
        style={{
          backgroundColor: '#298FEE', color: 'white',
          border: 'none', padding: '10px 25px', borderRadius: '30px',
          fontWeight: 'bold', cursor: 'pointer'
        }}>
        기록
      </button>
    </div>
  );
};

export default Score;
