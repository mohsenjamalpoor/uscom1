import { FaUser, FaWeight, FaBirthdayCake, FaNotesMedical } from 'react-icons/fa';
 
export default function PatientInfo({ patient, setPatient, darkMode }) {
 
 
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h2 className="text-xl font-bold flex items-center">
          <FaUser className="mr-2" />
          اطلاعات بیمار
        </h2>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">نام بیمار</label>
          <input
            type="text"
            name="name"
value={patient.name}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" text-sm font-medium mb-1 flex items-center">
              <FaBirthdayCake className="mr-1" />
              سن
            </label>
            <input
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          
          <div>
            <label className=" text-sm font-medium mb-1 flex items-center">
              <FaWeight className="mr-1" />
              وزن (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={patient.weight}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
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
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          >
            <option value="شوک سپتیک">شوک سپتیک</option>
            <option value="شوک کاردیوژنیک">شوک کاردیوژنیک</option>
            <option value="هیپوولمی">هیپوولمی</option>
            <option value="دیگر">دیگر</option>
          </select>
        </div>
      </div>
    </div>
  );
}