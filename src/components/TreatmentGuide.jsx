import { 
  FaTint, 
  FaSyringe, 
  FaHeartbeat, 
  FaBolt,
  FaHeart,
  FaProcedures,
  FaVial,
  FaPills,
  FaFlask
} from 'react-icons/fa';
import useHemodynamic from '../hooks/useHemodynamic';

export default function TreatmentGuide({ parameters, patient, darkMode }) {
  
  const { 
    status, 
    parameters: { 
      md, 
      svr, 
      ci, 
      smii, 
      ftc, 
      spO2,
      hr,
      map,
      do2
    } 
  } = useHemodynamic(parameters);

  // بررسی معتبر بودن وزن بیمار
  const isValidWeight = () => {
    const weight = parseFloat(patient.weight);
    return !isNaN(weight) && weight > 0;
  };

  const calculateDose = (doseRange) => {
    if (!isValidWeight()) return null;

    const cleanRange = doseRange.replace(/[^\d\-\.]/g, '');
    const [minStr, maxStr] = cleanRange.split('-');
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    const patientWeight = parseFloat(patient.weight);
    const minDose = min * patientWeight;
    const maxDose = max * patientWeight;

    const formatValue = (val) => {
      if (val === 0) return "";
      if (val < 1) return val.toFixed(1);
      return parseFloat(val.toFixed(1));
    };

    return {
      min: formatValue(minDose),
      max: formatValue(maxDose)
    };
  };

  const getDoseText = (dose, unit) => {
    if (!dose) return "وزن بیمار را وارد کنید";
    return `${dose.min} - ${dose.max} ${unit}`;
  };

  const recommendations = {
    fluids: {
      icon: <FaTint className="text-blue-500" />,
      title: "مایع درمانی",
      getRecommendation: () => {
        if (status.type === 'Hypodynamic' && ftc < 330) {
          const dose = calculateDose('10-20 ml/kg');
          return {
            text: "نیاز فوری به مایع درمانی",
            dose: getDoseText(dose, "ml نرمال سالین"),
            rationale: `FTC پایین (${ftc} ms) و وضعیت ${status.text}`,
            priority: 1
          };
        }
        if (status.type === 'Hyperdynamic' && svr < 800) {
          return {
            text: "مایع درمانی محافظه‌کارانه",
            dose: "حفظ تعادل مایع",
            rationale: `SVR پایین (${svr}) و وضعیت ${status.text}`,
            priority: 2
          };
        }
        return {
          text: "وضعیت مایع کافی",
          dose: "مایع نگهدارنده",
          rationale: "پارامترها در محدوده نرمال",
          priority: 3
        };
      }
    },

    noradrenaline: {
      icon: <FaSyringe className="text-red-500" />,
      title: "نوراپی‌نفرین",
      getRecommendation: () => {
        if (status.type === 'Hyperdynamic' && svr < 800 && map < 65) {
          const dose = calculateDose('0.05-0.3 mcg/kg/min');
          return {
            text: "شروع نوراپی‌نفرین فوری",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SVR پایین (${svr}), MAP پایین (${map}) و وضعیت ${status.text}`,
            priority: 1
          };
        }
        if (status.type === 'Hypodynamic' && smii > 1.2 && svr > 1600) {
          const dose = calculateDose('0.02-0.1 mcg/kg/min');
          return {
            text: "نوراپی‌نفرین ممکن است نیاز باشد",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SVR بالا (${svr}) و SMII مناسب (${smii})`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های واضح برای وازوپرسور",
          priority: 3
        };
      }
    },

    dobutamine: {
      icon: <FaHeart className="text-pink-500" />,
      title: "دوبوتامین",
      getRecommendation: () => {
        if (status.type === 'Hypodynamic' && smii < 1.2 && svr > 1200) {
          const dose = calculateDose('2-20 mcg/kg/min');
          return {
            text: "شروع دوبوتامین",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SMII پایین (${smii}) و SVR بالا (${svr})`,
            priority: 1
          };
        }
        if (ci < 2.2 && smii < 1.4) {
          const dose = calculateDose('5-10 mcg/kg/min');
          return {
            text: "دوبوتامین ممکن است مفید باشد",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `CI پایین (${ci}) و SMII پایین (${smii})`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عملکرد قلبی کافی",
          priority: 3
        };
      }
    },

    dopamine: {
      icon: <FaHeartbeat className="text-purple-500" />,
      title: "دوپامین",
      getRecommendation: () => {
        if (status.type === 'Hypodynamic' && smii < 1.0 && hr < 60) {
          const dose = calculateDose('5-20 mcg/kg/min');
          return {
            text: "شروع دوپامین",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SMII پایین (${smii}) و برادی کاردی (HR: ${hr})`,
            priority: 1
          };
        }
        if (status.type === 'Hypodynamic' && ci < 2.0) {
          const dose = calculateDose('2-10 mcg/kg/min');
          return {
            text: "دوپامین با دوز پایین",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `CI پایین (${ci}) و وضعیت ${status.text}`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های واضح برای اینوتروپ",
          priority: 3
        };
      }
    },

    adrenaline: {
      icon: <FaBolt className="text-yellow-500" />,
      title: "اپی‌نفرین",
      getRecommendation: () => {
        if (status.type === 'Hypodynamic' && ci < 1.8 && smii < 1.0) {
          const dose = calculateDose('0.01-0.1 mcg/kg/min');
          return {
            text: "شروع اپی‌نفرین فوری",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `CI بسیار پایین (${ci}) و SMII پایین (${smii})`,
            priority: 1
          };
        }
        if (status.type === 'Hypodynamic' && spO2 < 90 && do2 < 300) {
          const dose = calculateDose('0.05-0.2 mcg/kg/min');
          return {
            text: "اپی‌نفرین برای اکسیژن رسانی",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `DO2 پایین (${do2}) و SpO2 پایین (${spO2}%)`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های واضح برای اپی‌نفرین",
          priority: 3
        };
      }
    },

    milrinone: {
      icon: <FaFlask className="text-green-500" />,
      title: "میلرینون",
      getRecommendation: () => {
        if (status.type === 'Hypodynamic' && smii < 1.2 && svr > 1800) {
          const dose = calculateDose('0.25-0.75 mcg/kg/min');
          return {
            text: "شروع میلرینون",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SMII پایین (${smii}) با SVR بسیار بالا (${svr})`,
            priority: 1
          };
        }
        if (ci < 2.0 && smii < 1.4) {
          const dose = calculateDose('0.1-0.5 mcg/kg/min');
          return {
            text: "میلرینون ممکن است مفید باشد",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `CI پایین (${ci}) و SMII پایین (${smii})`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عملکرد قلبی کافی",
          priority: 3
        };
      }
    },

    vasopressin: {
      icon: <FaProcedures className="text-indigo-500" />,
      title: "وازوپرسین",
      getRecommendation: () => {
        if (status.type === 'Hyperdynamic' && svr < 700 && map < 60) {
          return {
            text: "وازوپرسین به نوراپی‌نفرین اضافه شود",
            dose: "0.01-0.04 units/min",
            rationale: `SVR بسیار پایین (${svr}) و MAP پایین (${map})`,
            priority: 1
          };
        }
        if (svr < 800 && status.type === 'Hyperdynamic') {
          return {
            text: "وازوپرسین ممکن است کمک کند",
            dose: "0.01-0.02 units/min",
            rationale: `SVR پایین (${svr}) و وضعیت ${status.text}`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "مقاومت عروقی کافی",
          priority: 3
        };
      }
    },

    nitroglycerin: {
      icon: <FaPills className="text-cyan-500" />,
      title: "نیتروگلیسیرین",
      getRecommendation: () => {
        if (svr > 2000 && map > 100) {
          const dose = calculateDose('0.1-0.5 mcg/kg/min');
          return {
            text: "شروع نیتروگلیسیرین",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SVR بسیار بالا (${svr}) و هایپرتانسیون (MAP: ${map})`,
            priority: 1
          };
        }
        if (svr > 1600 && smii > 1.4) {
          const dose = calculateDose('0.1-0.3 mcg/kg/min');
          return {
            text: "نیتروگلیسیرین ممکن است کمک کند",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SVR بالا (${svr}) با عملکرد قلبی مناسب`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های هایپرتانسیون یا SVR بالا",
          priority: 3
        };
      }
    },

    furosemide: {
      icon: <FaVial className="text-orange-500" />,
      title: "فوروزماید",
      getRecommendation: () => {
        if (ftc > 440 && status.type === 'Hyperdynamic') {
          const dose = calculateDose('0.5-1 mg/kg');
          return {
            text: "تجویز فوروزماید",
            dose: getDoseText(dose, "mg"),
            rationale: `FTC بالا (${ftc} ms) نشان‌دهنده حجم بیش از حد`,
            priority: 1
          };
        }
        if (ftc > 400 && ci > 3.5) {
          const dose = calculateDose('0.3-0.6 mg/kg');
          return {
            text: "فوروزماید ممکن است نیاز باشد",
            dose: getDoseText(dose, "mg"),
            rationale: `پرکردن بیش از حد بطنی (FTC: ${ftc} ms)`,
            priority: 2
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "تعادل حجمی مناسب",
          priority: 3
        };
      }
    }
  };

  // مرتب‌سازی توصیه‌ها بر اساس اولویت
  const sortedRecommendations = Object.entries(recommendations)
    .map(([key, value]) => ({
      key,
      ...value,
      recommendation: value.getRecommendation()
    }))
    .sort((a, b) => a.recommendation.priority - b.recommendation.priority);

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h2 className="text-xl font-bold flex items-center">
          <FaSyringe className="mr-2" />
          راهنمای درمانی بر اساس USCOM
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {sortedRecommendations.map(({ key, icon, title, recommendation }) => (
          <div key={key} className={`border-b pb-4 last:border-b-0 last:pb-0 ${
            recommendation.priority === 1 ? 'border-l-4 border-red-500 pl-3' :
            recommendation.priority === 2 ? 'border-l-4 border-yellow-500 pl-3' : ''
          }`}>
            <div className="flex items-center mb-3">
              {icon}
              <h3 className="text-lg text-blue-500 font-semibold ml-2">{title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">توصیه</p>
                <p className={`font-medium ${
                  recommendation.priority === 1 ? 'text-red-500' :
                  recommendation.priority === 2 ? 'text-yellow-500' : ''
                }`}>
                  {recommendation.text}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">دوز پیشنهادی</p>
                <p className="font-medium">
                  {recommendation.dose}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">دلیل</p>
                <p className="text-sm">{recommendation.rationale}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}