import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import Score from '../component/Score';
import PlanList from '../component/PlanList';
import Bmi from '../component/Bmi';
import Stats from '../component/Stats';
import Header from '../component/Header';
import '../component/Header.css';

const Dashboard = () => {
  
  return (
    <div className="dashboard-container">
      {/* 헤더 */}
      <Header />
    <div className="dashboard-layout">
    
      {/* 왼쪽 구역 */}
      <section className="main-zone">
        
        {/* 스코어 구역 */}
        <div className="top-card-zone">
          <Score /> 
        </div>

        {/* 플랜리스트와 bmi */}
        <div className="bottom-split-zone">
          <div className="plan-zone">
            <PlanList /> 
          </div>
          <div className="bmi-zone">
            <Bmi />     
          </div>
        </div>

      </section>

      {/* 오른쪽 Stats 구역 */}
      <aside className="sidebar-zone">
        <Stats />
      </aside>

      </div>
    </div>
  );
};

export default Dashboard;