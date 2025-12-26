import React, { useState } from 'react';


const PlanList = () => {
  // 추천들
  const aiDataPool = {
    exercises: [
      { text: '러닝 20분', detail: '유산소로 살 빼자' },
      { text: '스쿼트 3세트', detail: '하체!.' },
      { text: '요가 스트레칭', detail: '몸을 다시 정렬.' },
      { text: '계단 오르기', detail: '수명 늘리자.' },
      { text: '헬스장', detail: '근육!.' }
    ],
    supplements: [
      { text: '비타민 D', detail: '필수.' },
      { text: '마그네슘', detail: '눈 떨림 방지하자.' },
      { text: '유산균', detail: '장 건강!' },
      { text: '오메가 3', detail: '혈당 개선에 도움을 줍니다.' }
    ],
    sleep: [
      { text: '7시간 이상', detail: '오늘은 빨리.' },
      { text: '낮잠 20분', detail: '피로 회복이 필요.' },
      { text: '11시 취침', detail: '키 크자.' }
    ]
  };

  // 현재 화면에 보여줄 데이터 상태
  const [plans, setPlans] = useState([
    { id: 1, icon: '💪', title: '추천 활동', desc: '추천중..' },
    { id: 2, icon: '💊', title: '추천 영양', desc: '추천중..' },
    { id: 3, icon: '💤', title: '추천 수면시간', desc: '추천중..' },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // 3. "AI 분석" 버튼을 눌렀을 때 실행되는 함수
  const handleAiRefresh = () => {
    setIsLoading(true); // 로딩

    setTimeout(() => {
      // 하나씩 뽑기
      const randomExercise = aiDataPool.exercises[Math.floor(Math.random() * aiDataPool.exercises.length)];
      const randomSupple = aiDataPool.supplements[Math.floor(Math.random() * aiDataPool.supplements.length)];
      const randomSleep = aiDataPool.sleep[Math.floor(Math.random() * aiDataPool.sleep.length)];

      setPlans([
        { id: 1, icon: '💪', title: '추천 활동 : ' + randomExercise.text, desc: randomExercise.detail },
        { id: 2, icon: '💊', title: '추천 영양 : ' + randomSupple.text, desc: randomSupple.detail },
        { id: 3, icon: '💤', title: '추천 수면시간 : ' + randomSleep.text, desc: randomSleep.detail },
      ]);
      
      setIsLoading(false); // 로딩 끝
    }, 800);
  };

  return (
    <div className="card" style={{
      height: '100%', padding: '24px', boxSizing: 'border-box', 
      background: 'white', borderRadius: '16px', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '15px'}}>
        <h3 style={{margin: 0}}>오늘의 PLAN</h3>
        
        {/* 새로고침 버튼 */}
        <button 
          onClick={handleAiRefresh}
          style={{
            fontSize:'0.8rem', background: '#F2F2F2', 
            color: '#333', border:'none', borderRadius:'20px', 
            padding: '6px 12px', cursor:'pointer', fontWeight: 'bold',
            display: 'flex', alignItems: 'center', gap: '5px'
          }}
        >
          {isLoading ? '분석' : '재추천'}
        </button>
      </div>

      <ul style={{
        listStyle: 'none', padding: 0, margin: 0, flex: 1, 
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}>
        {plans.map((plan) => (
          <li key={plan.id} style={{
            background: '#F8F9FA', borderRadius: '12px', padding: '16px',
            display: 'flex', alignItems: 'center', gap: '15px',
            transition: 'all 0.3s ease', 
            opacity: isLoading ? 0.5 : 1 
          }}>
            <span style={{fontSize: '1.8rem'}}>{plan.icon}</span>
            <div>
              <strong style={{fontSize: '0.95rem', display: 'block', marginBottom: '4px'}}>{plan.title}</strong>
              <div style={{fontSize: '0.85rem', color: '#666'}}>{plan.desc}</div>
            </div>
            
            {/* 완료 체크박스 */}
            <div style={{marginLeft: 'auto'}}>
              <input type="checkbox" style={{width: '20px', height: '20px', cursor: 'pointer', accentColor: '#298FEE'}} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanList;