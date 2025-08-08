export default function WaveformDisplay({ parameters, darkMode }) {
  const md = parameters.find(p => p.title.includes('Minute Distance'))?.value || 0;
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h2 className="text-xl font-bold">نمایش موج USCOM</h2>
      </div>
      
      <div className="p-4">
        <div className="waveform h-40 w-full relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold">Minute Distance: {md} m/min</p>
              <p className="text-sm">Velocity-Time Integral</p>
            </div>
          </div>
          
          {/* شبیه‌سازی موج USCOM */}
          <svg
            viewBox="0 0 500 100"
            className="absolute bottom-0 w-full h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C50,10 100,90 150,30 C200,70 250,10 300,50 C350,90 400,10 450,50 C500,90 550,10 600,50"
              fill="none"
              stroke={darkMode ? "#3b82f6" : "#2563eb"}
              strokeWidth="2"
            />
          </svg>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm">Peak Velocity</p>
            <p className="font-bold">1.2 m/s</p>
          </div>
          <div>
            <p className="text-sm">Mean Velocity</p>
            <p className="font-bold">0.8 m/s</p>
          </div>
          <div>
            <p className="text-sm">VTI</p>
            <p className="font-bold">24 cm</p>
          </div>
        </div>
      </div>
    </div>
  );
}