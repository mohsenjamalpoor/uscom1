import { FaTint, FaSyringe, FaHeartbeat } from 'react-icons/fa';
import useHemodynamic from '../hooks/useHemodynamic';
 
export default function TreatmentGuide({ parameters, patient, darkMode }) {
  const { status, parameters: { md, svr, ci, smii, ftc, spO2 } } = useHemodynamic(parameters);
 
  const calculateDose = (doseRange) => {
    const [min, max] = doseRange.split('-').map(Number);
    const patientWeight = patient.weight || 70;
    return {
      min: (min * patientWeight).toFixed(1),
      max: (max * patientWeight).toFixed(1)
    };
  };
 
  const recommendations = {
    fluids: {
      icon: <FaTint className="text-blue-500" />,
      title: "مایع درمانی",
      getRecommendation: () => {
        if (status.type === 'Hypodynamic' && ftc < 350) {
          const dose = calculateDose('10-20 ml/kg');
          return {
            text: "نیاز فوری به مایع درمانی",
            dose: `${dose.min}-${dose.max} ml نرمال سالین`,
            rationale: `FTC پایین (${ftc}ms) و وضعیت ${status.text}`
          };
        }
        if (status.type === 'Hyperdynamic' && svr < 800) {
          return {
            text: "مایع درمانی محافظه‌کارانه",
            dose: "حفظ تعادل مایع",
            rationale: `SVR پایین (${svr}) و وضعیت ${status.text}`
          };
        }
        return {
          text: "وضعیت مایع کافی",
          dose: "مایع نگهدارنده",
          rationale: "پارامترها در محدوده نرمال"
        };
      }
    },
    noradrenaline: {
      icon: <FaSyringe className="text-red-500" />,
      title: "نوراپی‌نفرین",
      getRecommendation: () => {
        if (status.type === 'Hyperdynamic' && svr < 800) {
          const dose = calculateDose('0.05-0.3 mcg/kg/min');
          return {
            text: "شروع نوراپی‌نفرین",
            dose: `${dose.min}-${dose.max} mcg/min`,
            rationale: `SVR پایین (${svr}) و وضعیت ${status.text}`
          };
        }
        if (status.type === 'Hypodynamic' && smii > 1.2 && svr > 1600) {
          const dose = calculateDose('0.02-0.1 mcg/kg/min');
          return {
            text: "ممکن است نیاز باشد",
            dose: `${dose.min}-${dose.max} mcg/min`,
            rationale: `SVR بالا (${svr}) و SMII مناسب (${smii})`
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های واضح برای وازوپرسور"
        };
      }
    },
    dopamine: {
      icon: <FaHeartbeat className="text-purple-500" />,
      title: "دوپامین",
      getRecommendation: () => {
        if (status.type === 'Hypodynamic' && smii < 1.0) {
          const dose = calculateDose('5-10 mcg/kg/min');
          return {
            text: "شروع دوپامین",
            dose: `${dose.min}-${dose.max} mcg/min`,
            rationale: `SMII پایین (${smii}) و وضعیت ${status.text}`
          };
        }
        if (status.type === 'Hypodynamic' && ci < 2.0) {
          const dose = calculateDose('2-5 mcg/kg/min');
          return {
            text: "دوپامین ممکن است مفید باشد",
            dose: `${dose.min}-${dose.max} mcg/min`,
            rationale: `CI پایین (${ci}) و وضعیت ${status.text}`
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های واضح برای اینوتروپ"
        };
      }
    }
  };
 
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h2 className="text-xl font-bold flex items-center">
          <FaSyringe className="mr-2" />
راهنمای درمانی برای بیمار {patient.name}
        </h2>
      </div>
      
      <div className="p-4 space-y-6">
        {Object.entries(recommendations).map(([key, { icon, title, getRecommendation }]) => {
          const { text, dose, rationale } = getRecommendation();
          return (
            <div key={key} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center mb-3">
                {icon}
                <h3 className="text-lg font-semibold ml-2">{title}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">توصیه</p>
                  <p className="font-medium">{text}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">دوز پیشنهادی</p>
                  <p className="font-medium">{dose}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">دلیل</p>
                  <p className="text-sm">{rationale}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}