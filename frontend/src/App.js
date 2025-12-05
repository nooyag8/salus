import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import LoginPage from '../src/pages/Auth/LoginPage';  
import SignUpPage from '../src/pages/Auth/SignUpPage';  // 회원가입 페이지
import Page1 from '../src/pages/BasicInput/page1';
import Page2 from '../src/pages/BasicInput/page2';
import Page3 from '../src/pages/BasicInput/page3';
import Page4 from '../src/pages/BasicInput/page4';
import Dashboard from '../src/pages/Dashboard';
import EmotionInput from '../src/pages/DataInput/EmotionInput';
import ConditionInputForm from '../src/pages/DataInput/ConditionInputForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 맨 처음 접속하면 로그인 페이지가 뜸 */}
        <Route path="/" element={<LoginPage />} />

        {/* 회원가입 페이지 경로 설정 */}
        <Route path="/signup" element={<SignUpPage />} /> 

        {/* 로그인 성공 후 넘어갈 Page1 */}
        <Route path="/page1" element={<Page1 />} />


        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />

        {/* 메인 대시보드 */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 감정/상태 입력 */}
        <Route path="/emotion" element={<EmotionInput />} />
        <Route path="/condition" element={<ConditionInputForm />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;