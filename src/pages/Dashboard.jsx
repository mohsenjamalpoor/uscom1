import { useState } from 'react';

import ParameterCard from '../components/ParameterCard';
import HemodynamicStatus from '../components/HemodynamicStatus';
import TreatmentGuide from '../components/TreatmentGuide';
import WaveformDisplay from '../components/WaveformDisplay';
import { initialParameters } from '../data/parameters';
import PatientInfo from '../components/PatienInfo';
 
export default function Dashboard({ darkMode }) {
  const [parameters, setParameters] = useState(initialParameters);
  const [patient, setPatient] = useState({
    name: "محمد رضایی",
    age: 58,
    weight: 75,
    gender: "male",
    diagnosis: "شوک سپتیک"
  });
 
  const handleParameterChange = (id, newValue) => {
    setParameters(prev => prev.map(p =>
p.id === id ? { ...p, value: parseFloat(newValue) } : p
    ));
  };
 
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون سمت چپ */}
        <div className="lg:col-span-1 space-y-6">
          <PatientInfo
            patient={patient}
            setPatient={setPatient}
            darkMode={darkMode}
          />
          
          <HemodynamicStatus
            parameters={parameters}
            darkMode={darkMode}
          />
        </div>
        
        {/* ستون وسط */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-4">پارامترهای همودینامیک</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parameters.map(param => (
                <ParameterCard
key={param.id}
                  parameter={param}
                  onValueChange={handleParameterChange}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* ستون سمت راست */}
        <div className="lg:col-span-1 space-y-6">
          <TreatmentGuide
            parameters={parameters}
            patient={patient}
            darkMode={darkMode}
          />
          
          <WaveformDisplay
            parameters={parameters}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
}