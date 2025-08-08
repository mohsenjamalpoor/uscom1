
import CaseStudyCard from '../components/CasestudyCard';
import NormalValuesTable from '../components/NormalValuesTable';
import { caseStudies } from '../data/caseStudies';
 
export default function CaseStudies({ darkMode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">مطالعات موردی USCOM</h1>
      
      <div className="space-y-8">
        {caseStudies.map((caseStudy, index) => (
          <CaseStudyCard
            key={index}
            caseStudy={caseStudy}
            darkMode={darkMode}
          />
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">مقادیر نرمال پارامترهای USCOM</h2>
        <NormalValuesTable darkMode={darkMode} />
      </div>
    </div>
  );
}