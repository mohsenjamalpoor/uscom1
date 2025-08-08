export default function Documentation({ darkMode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">مستندات فنی USCOM</h1>
      
      <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
        <h2>مقدمه</h2>
        <p>
          دستگاه USCOM (Ultrasonic Cardiac Output Monitor) یک سیستم غیرتهاجمی برای مانیتورینگ همودینامیک است که از امواج اولتراسوند برای اندازه‌گیری برون‌ده قلبی و سایر پارامترهای حیاتی استفاده می‌کند.
        </p>
        
        <h2>پارامترهای کلیدی</h2>
        <h3>Minute Distance (MD)</h3>
        <p>
          مسافت طی شده توسط گلبول‌های قرمز در یک دقیقه (m/min). مقادیر نرمال:
        </p>
        <ul>
          <li>بزرگسالان: 14-22 m/min</li>
          <li>کودکان: 16-28 m/min</li>
        </ul>
        
        <h3>شاخص‌های درمانی</h3>
        <p>
          بر اساس پارامترهای USCOM می‌توان تصمیم‌گیری‌های درمانی زیر را انجام داد:
        </p>
        <ul>
          <li>مایع درمانی: زمانی که FTC کمتر از 350ms باشد</li>
          <li>نوراپی‌نفرین: زمانی که SVR کمتر از 800 dyn·s/cm5 باشد</li>
          <li>دوپامین: زمانی که SMII کمتر از 1.0 W/m2 باشد</li>
        </ul>
      </div>
    </div>
  );
}