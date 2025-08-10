import { pulmonaryData_0_6, pulmonaryData_7_16 } from "../data/pulmonary";

export default function getNormalRangeByAge(ageYears, ageMonths) {
  const totalMonths =
    (parseInt(ageYears) || 0) * 12 + (parseInt(ageMonths) || 0);

  if (totalMonths <= 72) {
    // تا 6 سال
    const dataset = pulmonaryData_0_6;
    // پیدا کردن نزدیک‌ترین رکورد
    let match = dataset[0];
    for (let i = 0; i < dataset.length; i++) {
      const itemAge = dataset[i].age;
      if (itemAge.includes("ماه")) {
        const monthNum = parseInt(itemAge);
        if (monthNum && totalMonths <= monthNum) {
          match = dataset[i];
          break;
        }
      } else if (itemAge.includes("سال")) {
        const yearNum = parseInt(itemAge);
        if (yearNum && totalMonths <= yearNum * 12) {
          match = dataset[i];
          break;
        }
      }
    }
    return match;
  }

  if (totalMonths <= 192) {
    // 7 تا 16 سال
    const dataset = pulmonaryData_7_16;
    let match = dataset[0];
    for (let i = 0; i < dataset.length; i++) {
      const yearNum = parseInt(dataset[i].age);
      if (yearNum && totalMonths <= yearNum * 12) {
        match = dataset[i];
        break;
      }
    }
    return match;
  }

  // بزرگسال
  return {
    age: "بزرگسال",
    co: "4.0 - 8.0",
    sv: "60 - 100",
    hr: "60 - 100",
  };
}
