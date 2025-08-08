import { FaUserInjured, FaStethoscope, FaHeartbeat, FaVial, FaChartLine } from 'react-icons/fa';
 
export default function CaseStudyCard({ caseStudy, darkMode }) {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
        <h2 className="text-xl font-bold flex items-center">
          <FaUserInjured className="mr-2" />
          {caseStudy.title}
        </h2>
        <p className="mt-1 text-sm">{caseStudy.description}</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className="font-medium flex items-center mb-2">
            <FaChartLine className="mr-1" />
            پارامترهای همودینامیک:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(caseStudy.parameters).map(([key, value]) => (
              <div
                key={key}
                className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <div className="text-sm font-medium">{key}</div>
                <div className="font-bold">{value}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium flex items-center mb-2">
              <FaStethoscope className="mr-1" />
              تشخیص:
            </h3>
            <p className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
              {caseStudy.diagnosis}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium flex items-center mb-2">
              <FaVial className="mr-1" />
              درمان:
            </h3>
            <p className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              {caseStudy.treatment}
            </p>
          </div>
        </div>
        
        {caseStudy.outcome && (
          <div className="mt-4">
            <h3 className="font-medium flex items-center mb-2">
              <FaHeartbeat className="mr-1" />
              نتیجه:
            </h3>
            <p className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              {caseStudy.outcome}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}