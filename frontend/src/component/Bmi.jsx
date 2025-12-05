import React, { useState } from 'react';

const Bmi = () => {
  // 1. BMI 수치
  const [bmiValue, setBmiValue] = useState(23.5);

  // 2. 그래프 계산
  const maxBmi = 40;
  const percentage = Math.min((bmiValue / maxBmi) * 100, 100); // 100% 제한

  // 3. 숫자가 바뀔 때 실행
  const handleChange = (e) => {
    setBmiValue(e.target.value);
  };

  return (
    <div className="card" style={{
      height: '100%', padding: '24px', boxSizing: 'border-box', 
      background: 'white', borderRadius: '16px', 
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <h3 style={{alignSelf: 'flex-start', marginTop: 0}}>나의 BMI</h3>
      
      {/* 그래프 영역  */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        
        {/* 바깥쪽 원 */}
        <div style={{
          position: 'relative',
          width: '150px', height: '150px',
          borderRadius: '50%',
          background: `conic-gradient(#2F80ED ${percentage}%, #E0E0E0 ${percentage}% 100%)`,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          
          {/* 안쪽 원  */}
          <div style={{
            width: '120px', height: '120px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center',
            zIndex: 1
          }}>
            <span style={{fontSize: '2rem', fontWeight: 'bold', color: '#333'}}>
              {bmiValue}
            </span>
            <span style={{color: '#828282', fontSize: '0.9rem'}}>
              {bmiValue < 18.5 ? '저체중' : bmiValue < 25 ? '정상' : '비만'}
            </span>
          </div>
        </div>

        {/* 슬라이더 */}
        <div style={{marginTop: '20px', width: '100%'}}>
          <p style={{fontSize: '0.8rem', color: '#666', marginBottom: '5px'}}>
            수치 조절(0 ~ 40)
          </p>
          <input 
            type="range" 
            min="0" 
            max="40" 
            step="0.1" 
            value={bmiValue} 
            onChange={handleChange}
            style={{width: '100%', cursor: 'pointer'}}
          />
        </div>

      </div>
    </div>
  );
};

export default Bmi;



{/* 슬라이더 대신 입력칸 */ }
/* <div style={{ marginTop: '20px', width: '100%' }}>
  <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>
    수치 입력 (0 ~ 35)
  </p>
  
  <input
    type="number" 
    value={bmiValue}
    onChange={handleChange}
    min="0"
    max="35"
    step="0.1"   
    placeholder="수치 입력"
    style={{
      width: '100%',
      padding: '8px',           
      border: '1px solid #666',  
      borderRadius: '4px',       
      fontSize: '1rem',       
      boxSizing: 'border-box'    
    }}
  />
</div> 
*/