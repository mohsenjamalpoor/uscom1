import useHemodynamic from '../hooks/useHemodynamic';
 
export default function HemodynamicStatus({ parameters, darkMode }) {
  const { status, issues } = useHemodynamic(parameters);
 
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h2 className="text-xl font-bold">وضعیت همودینامیک</h2>
      </div>
      
      <div className="p-4">
        <div className={`flex items-center justify-center p-4 rounded-lg mb-4 ${
          status.type === 'Hypodynamic' ? 'bg-red-100 text-red-800' :
          status.type === 'Hyperdynamic' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          <span className="text-lg font-bold">{status.text}</span>
        </div>
        
        {issues.length > 0 ? (
          <div>
            <h3 className="font-medium mb-2">مشکلات شناسایی شده:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>هیچ مشکل همودینامیک مهمی شناسایی نشد</p>
        )}
      </div>
    </div>
  );
}
 