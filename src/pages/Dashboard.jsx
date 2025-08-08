import { useState } from "react";

import ParameterCard from "../components/ParameterCard";
import HemodynamicStatus from "../components/HemodynamicStatus";
import TreatmentGuide from "../components/TreatmentGuide";

import { initialParameters } from "../data/parameters";
import { FaNotesMedical } from "react-icons/fa";

export default function Dashboard({ darkMode }) {
  const [parameters, setParameters] = useState(initialParameters);

  const [patient, setPatient] = useState({
    ageYears: "", // سال
    ageMonths: "", // ماه
    weight: "",
  });

  const handleParameterChange = (id, newValue) => {
    setParameters((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: parseFloat(newValue) } : p))
    );
  };

  const handlePatientWeightChange = (value) => {
    if (value === "" || (/^\d+\.?\d*$/.test(value) && Number(value) >= 0)) {
      setPatient((prev) => ({
        ...prev,
        weight: value,
      }));
    }
  };

  const handleAgeYearsChange = (value) => {
    // اجازه فقط اعداد 0 تا 120
    if (value === "" || (Number(value) >= 0 && Number(value) <= 120)) {
      setPatient((prev) => ({
        ...prev,
        ageYears: value,
      }));
    }
  };

  const handleAgeMonthsChange = (value) => {
    // اجازه فقط اعداد 0 تا 11
    if (value === "" || (Number(value) >= 0 && Number(value) <= 11)) {
      setPatient((prev) => ({
        ...prev,
        ageMonths: value,
      }));
    }
  };

  // تابع نمایش سن به صورت "سال و ماه"
  const formatAge = (years, months) => {
    const y = parseInt(years);
    const m = parseInt(months);
    if (isNaN(y) && isNaN(m)) return "";
    if (isNaN(y)) return `${m} ماه`;
    if (isNaN(m) || m === 0) return `${y} سال`;
    return `${y} سال و ${m} ماه`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون سمت چپ: ورودی وزن و سن + وضعیت همودینامیک */}
        <div className="lg:col-span-1 space-y-6">
          <div
            className={`p-4 rounded-lg shadow ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">اطلاعات بیمار</h2>

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
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 text-black flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={patient.ageMonths}
                  onChange={(e) => handleAgeMonthsChange(e.target.value)}
                  placeholder="ماه"
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 text-black flex-1"
                />
              </div>
              {(patient.ageYears !== "" || patient.ageMonths !== "") && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {formatAge(patient.ageYears, patient.ageMonths)}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold">وزن (کیلوگرم):</label>
              <input
                type="number"
                min="0"
                value={patient.weight}
                onChange={(e) => handlePatientWeightChange(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 text-black"
                placeholder="مثلاً 75"
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
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="شوک سپتیک">شوک سپتیک</option>
              <option value="شوک کاردیوژنیک">شوک کاردیوژنیک</option>
              <option value="هیپوولمی">هیپوولمی</option>
              <option value="دیگر">دیگر</option>
            </select>
          </div>

          <HemodynamicStatus parameters={parameters} darkMode={darkMode} />
        </div>

        {/* ستون وسط: پارامترهای همودینامیک */}
        <div className="lg:col-span-1 space-y-6">
          <div
            className={`p-4 rounded-lg shadow ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">پارامترهای همودینامیک</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parameters.map((param) => (
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

        {/* ستون سمت راست: راهنمای درمان */}
        <div className="lg:col-span-1 space-y-6">
          <TreatmentGuide
            parameters={parameters}
            patient={patient}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
}
