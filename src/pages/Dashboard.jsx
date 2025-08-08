import { useEffect, useState } from "react";

import ParameterCard from "../components/ParameterCard";
import HemodynamicStatus from "../components/HemodynamicStatus";
import TreatmentGuide from "../components/TreatmentGuide";

import { initialParameters } from "../data/parameters";
import { FaNotesMedical } from "react-icons/fa";
import getNormalRangeByAge from "../components/getNormalRangeByAg";

export default function DashboardFull({ darkMode = false }) {
  const [parameters, setParameters] = useState(initialParameters);
  const [patient, setPatient] = useState({
    ageYears: "",
    ageMonths: "",
    weight: "",
    name: "",
    diagnosis: "شوک سپتیک",
  });

  // تغییر مقدار پارامتر
  const handleParameterChange = (id, newValue) => {
    setParameters((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, value: newValue === "" ? "" : parseFloat(newValue) } : p
      )
    );
  };

  const handlePatientWeightChange = (value) => {
    if (value === "" || (/^\d+\.?\d*$/.test(value) && Number(value) >= 0)) {
      setPatient((prev) => ({ ...prev, weight: value }));
    }
  };

  const handleAgeYearsChange = (value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 120)) {
      setPatient((prev) => ({ ...prev, ageYears: value }));
    }
  };

  const handleAgeMonthsChange = (value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 11)) {
      setPatient((prev) => ({ ...prev, ageMonths: value }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const formatAge = (years, months) => {
    const y = parseInt(years);
    const m = parseInt(months);
    if (isNaN(y) && isNaN(m)) return "";
    if (isNaN(y)) return `${m} ماه`;
    if (isNaN(m) || m === 0) return `${y} سال`;
    return `${y} سال و ${m} ماه`;
  };

  // وقتی سن تغییر کند، محدوده‌های نرمال پارامترها آپدیت می‌شود
  useEffect(() => {
    const normal = getNormalRangeByAge(patient.ageYears, patient.ageMonths);
    if (!normal) return;

    setParameters((prev) =>
      prev.map((param) => {
        const updated = { ...param };

        // تعیین رنج نرمال برای پارامترهای مرتبط
        if (/Cardiac Output|CO/i.test(param.title)) {
          updated.normalRange = normal.co;
        }
        if (/Stroke Volume|Stroke Volume Index|SVI|SV/i.test(param.title)) {
          updated.normalRange = normal.sv;
        }
        if (/Heart Rate|HR/i.test(param.title)) {
          updated.normalRange = normal.hr;
        }

        // محاسبه isCritical بر اساس رنج جدید اگر مقدار عددی موجود باشد
        const parsed = (updated.normalRange || "")
          .split("-")
          .map((s) => parseFloat(s.replace(/[^\d.]/g, "").trim()));
        if (
          parsed.length === 2 &&
          !Number.isNaN(parsed[0]) &&
          !Number.isNaN(parsed[1]) &&
          typeof updated.value === "number"
        ) {
          updated.isCritical = updated.value < parsed[0] || updated.value > parsed[1];
        }
        return updated;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.ageYears, patient.ageMonths]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون چپ: اطلاعات بیمار + وضعیت */}
        <div className="lg:col-span-1 space-y-6">
          <div
            className={`p-4 rounded-lg shadow ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">اطلاعات بیمار</h2>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">نام:</label>
              <input
                name="name"
                value={patient.name}
                onChange={handleChange}
                className="p-2 rounded border w-full"
                placeholder="نام بیمار"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">سن:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={patient.ageYears}
                  onChange={(e) => handleAgeYearsChange(e.target.value)}
                  placeholder="سال"
                  className="p-2 rounded border text-black flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={patient.ageMonths}
                  onChange={(e) => handleAgeMonthsChange(e.target.value)}
                  placeholder="ماه"
                  className="p-2 rounded border text-black flex-1"
                />
              </div>
              {(patient.ageYears !== "" || patient.ageMonths !== "") && (
                <p className="mt-1 text-sm text-gray-600">{formatAge(patient.ageYears, patient.ageMonths)}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold">وزن (کیلوگرم):</label>
              <input
                type="number"
                min="0"
                value={patient.weight}
                onChange={(e) => handlePatientWeightChange(e.target.value)}
                className="w-full p-2 rounded border"
                placeholder="وزن را وارد کنید..."
              />
            </div>
          </div>

          <div>
            <label className=" text-sm font-medium mb-1 flex items-center">
              <FaNotesMedical className="mr-1" />
              تشخیص اولیه
            </label>
            <select
              name="diagnosis"
              value={patient.diagnosis}
              onChange={handleChange}
              className="w-full p-2 rounded border"
            >
              <option value="شوک سپتیک">شوک سپتیک</option>
              <option value="شوک کاردیوژنیک">شوک کاردیوژنیک</option>
              <option value="هیپوولمی">هیپوولمی</option>
              <option value="دیگر">دیگر</option>
            </select>
          </div>

          <HemodynamicStatus parameters={parameters} darkMode={darkMode} />
        </div>

        {/* ستون وسط: پارامترها */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-bold mb-4">پارامترهای همودینامیک</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parameters.map((param) => (
                <ParameterCard key={param.id} parameter={param} onValueChange={handleParameterChange} darkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>

        {/* ستون راست: راهنمای درمان */}
        <div className="lg:col-span-1 space-y-6">
          <TreatmentGuide parameters={parameters} patient={patient} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}