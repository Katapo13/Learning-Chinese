import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';
import './css/Tests.css';

const Tests = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>
          <CheckSquare size={32} />
          Тесты
        </h1>
      </div>

      <div className="grid">
          <div key={1} className="card">
            <div className="p-6">
              <Link 
                to={`/tests`} 
                className="btn"
              >
                Начать тест
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Tests;
