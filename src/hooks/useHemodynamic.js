import { useMemo } from 'react';
 
export default function useHemodynamic(parameters) {
  return useMemo(() => {
    const getParam = (name) => parameters.find(p => p.title.includes(name))?.value || 0;
    
    const md = getParam('Minute Distance');
    const svr = getParam('SVR');
    const ci = getParam('Cardiac Index');
    const smii = getParam('SMII');
    const ftc = getParam('FTC');
    const spO2 = getParam('SpO2');
    
    const status = (() => {
      if (md < 14) return { type: 'Hypodynamic', color: 'red', text: 'هایپودینامیک' };
      if (md > 22) return { type: 'Hyperdynamic', color: 'yellow', text: 'هایپر دینامیک' };
      return { type: 'Normodynamic', color: 'green', text: 'نرمودینامیک' };
    })();
    
    const issues = [];
    if (ci < 2.5) issues.push('کاهش برون ده قلبی');
    if (svr < 800) issues.push('وازودیلاسیون');
    if (svr > 1600) issues.push('وازوکانستریکشن');
    if (smii < 1.2) issues.push('اختلال عملکرد میوکارد');
    if (ftc < 350) issues.push('کمبود حجم');
    if (spO2 < 92) issues.push('هیپوکسمی');
    
    return {
      status,
      issues,
      parameters: { md, svr, ci, smii, ftc, spO2 }
    };
  }, [parameters]);
}