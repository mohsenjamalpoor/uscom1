import { useMemo } from 'react';

export default function useHemodynamic(parameters, patientAge) {
  return useMemo(() => {
    const getParam = (name) => parameters.find(p => p.title.includes(name))?.value || 0;
    
    // پارامترهای اصلی
    const md = getParam('Minute Distance');
    const svr = getParam('SVR');
    const ci = getParam('Cardiac Index');
    const smii = getParam('SMII');
    const ftc = getParam('FTC');
    const spO2 = getParam('SpO2');
    const sv = getParam('Stroke Volume');
    const hr = getParam('Heart Rate');
    const map = getParam('MAP');
    const do2 = getParam('DO2');
    
    // تعیین محدوده نرمال بر اساس سن
    const isNeonate = patientAge?.ageYears === 0 && patientAge?.ageMonths < 1;
    const isChild = patientAge?.ageYears < 16;
    
    // مقادیر نرمالیزه شده بر اساس سن
    const normalMdRange = isNeonate ? [16, 28] : [14, 22];
    const normalCiRange = isNeonate ? [3.0, 5.0] : isChild ? [2.8, 4.2] : [2.5, 4.0];
    const normalSvrRange = isNeonate ? [1500, 3500] : isChild ? [1000, 2000] : [800, 1600];
    
    // وضعیت همودینامیک
    const status = (() => {
      if (md < normalMdRange[0]) {
        return { type: 'Hypodynamic', color: 'red', text: 'هایپودینامیک' };
      }
      if (md > normalMdRange[1]) {
        return { type: 'Hyperdynamic', color: 'yellow', text: 'هایپر دینامیک' };
      }
      return { type: 'Normodynamic', color: 'green', text: 'نرمودینامیک' };
    })();
    
    // تشخیص مشکلات
    const issues = [];
    
    // ارزیابی پارامترهای حیاتی
    if (ci < normalCiRange[0]) issues.push('کاهش برون ده قلبی');
    if (ci > normalCiRange[1]) issues.push('افزایش برون ده قلبی');
    if (svr < normalSvrRange[0]) issues.push('وازودیلاسیون');
    if (svr > normalSvrRange[1]) issues.push('وازوکانستریکشن');
    if (smii < 1.2) issues.push('اختلال عملکرد میوکارد (کاهش اینوتروپی)');
    if (smii > 2.0) issues.push('افزایش اینوتروپی');
    if (ftc < 330) issues.push('کمبود حجم (هایپوولمی)');
    if (ftc > 440) issues.push('حجم بیش از حد (هایپرولمی)');
    if (spO2 < 92) issues.push('هیپوکسمی');
    if (map < 65) issues.push('هیپوتانسیون');
    if (map > 110) issues.push('هایپرتانسیون');
    
    // ارزیابی نسبت SV/SVR
    const svrRatio = sv / svr;
    if (svrRatio < 0.04) issues.push('افزایش بار بعدی قلب');
    if (svrRatio > 0.08) issues.push('کاهش بار بعدی قلب');
    
    // ارزیابی اکسیژن رسانی
    const do2i = do2 / (patientAge?.weight || 70);
    if (do2i < 400) issues.push('کاهش اکسیژن رسانی بافتی');
    
    return {
      status,
      issues,
      parameters: { 
        md, 
        svr, 
        ci, 
        smii, 
        ftc, 
        spO2,
        sv,
        hr,
        map,
        do2,
        do2i
      },
      normalRanges: {
        md: normalMdRange,
        ci: normalCiRange,
        svr: normalSvrRange,
        smii: [1.2, 2.0],
        ftc: [330, 440],
        spO2: [92, 100]
      }
    };
  }, [parameters, patientAge]);
}