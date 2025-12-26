import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // 입력값 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 
    console.log("로그인 성공");
    navigate('/page1'); 
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* 로고*/}
      <h1 style={{
        fontSize: '5rem',
        color: '#298FEE',  
        marginBottom: '50px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        margin: '0 0 50px 0'
      }}>
        Salus
      </h1>

      <form 
        onSubmit={handleLogin} 
        style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}
      >
        
        {/* 이메일  */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="email" style={{
            display: 'block',
            fontSize: '1rem',
            color: '#333',
            marginBottom: '10px',
            fontWeight: 'bold',
            textAlign: 'left'
          }}>
            이메일
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '18px 20px',
              fontSize: '1.2rem',
              border: '1px solid #ddd',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box',
              outline: 'none',
              textAlign: 'left'
            }}
          />
        </div>

        {/* 비밀번호 */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="password" style={{
            display: 'block',
            fontSize: '1rem',
            color: '#333',
            marginBottom: '10px',
            fontWeight: 'bold',
            textAlign: 'left'
          }}>
            비밀번호
          </label>
          <input 
            type="password" 
            id="password" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '18px 20px',
              fontSize: '1.2rem',
              border: '1px solid #ddd',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box',
              outline: 'none',
              textAlign: 'left'
            }}
          />
        </div>

        {/* 회원가입 링크 */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '30px'
        }}>
          <a href="/signup" style={{
            fontSize: '0.95rem',
            color: '#aaa',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}>
            회원가입
          </a>
        </div>

        {/* 2. 로그인 버튼 */}
        <button type="submit" style={{
          width: '100%',
          padding: '18px',
          backgroundColor: '#298FEE', 
          color: 'white',
          fontSize: '1.3rem',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(41, 143, 238, 0.3)' 
        }}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;