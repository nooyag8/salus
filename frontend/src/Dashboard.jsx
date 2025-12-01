import React from 'react';
import './Dashboard.css';

import Score from './component/Score';
import PlanList from './component/PlanList';
import Bmi from './component/Bmi';
import Stats from './component/Stats'; // dashboard에 위 4개와 연결

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      
      {/* 왼쪽 구역 */}
      <section className="main-zone">
        
        {/* 스코어 구역 */}
        <div className="top-card-zone">
          <Score /> 
        </div>

        {/* 밑에 구역 플랜리스트와 bmi */}
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
  );
};


export default Dashboard;
