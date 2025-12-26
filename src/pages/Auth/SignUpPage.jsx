import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const blueColor = '#298FEE';

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      localStorage.setItem('userNickname', nickname);
      console.log(`회원가입 완료. 닉네임 '${nickname}' 저장`);
      navigate('/');
    } else {
      alert('닉네임을 입력해주세요.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '18px 20px',
    fontSize: '1.2rem',
    border: '1px solid #ffffff',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    outline: 'none',
    textAlign: 'left',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '1rem',
    color: '#333',
    marginBottom: '10px',
    fontWeight: 'bold',
    textAlign: 'left',
  };

  return (
    // 전체 화면 컨테이너 (배경색 흰색)
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff', // ← 여기만 흰색으로 변경
      }}
    >
      {/* 로고 */}
      <h1
        style={{
          fontSize: '5rem',
          color: blueColor,
          marginBottom: '50px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          textShadow: '0 0 5px rgba(0,0,0,0.1)',
        }}
      >
        Salus
      </h1>

      {/* 회원가입 폼 카드 */}
      <form
        onSubmit={handleSignUp}
        style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 20px',
          boxSizing: 'border-box',
          backgroundColor: '#f7f7f7', // 살짝 회색 카드
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        {/* 닉네임 입력 */}
        <div style={{ marginBottom: '12px', width: '100%' }}>
          <label htmlFor="nickname" style={labelStyle}>
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* 이메일 입력 */}
        <div style={{ marginBottom: '12px', width: '100%' }}>
          <label htmlFor="email" style={labelStyle}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div style={{ marginBottom: '12px', width: '100%' }}>
          <label htmlFor="password" style={labelStyle}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* 비밀번호 재확인 입력 */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="confirmPassword" style={labelStyle}>
            비밀번호 재확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* "이미 계정이 있으신가요?" */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '0.9rem',
            marginBottom: '20px',
          }}
        >
          <span style={{ color: '#555', marginRight: '5px' }}>
            이미 계정이 있으신가요?
          </span>
          <Link
            to="/"
            style={{
              color: blueColor,
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            로그인 하기
          </Link>
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: blueColor,
            color: 'white',
            fontSize: '1.3rem',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(41, 143, 238, 0.3)',
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
