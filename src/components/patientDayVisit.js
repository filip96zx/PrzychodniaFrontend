import React from 'react';
import visitStatuses from '../helpers/visitStatusConst';

const PatientDayVisitComponent = ({ dayProperty, daysVisits, registerToVisit }) => {
  return (
    <div>
      {daysVisits[dayProperty].map((visit) => (
        <div key={visit.visitId + visit.doctorId} className='visit-item'>
          <div>{visit.time}</div>
          <div>Spec.{" "}{visit.visitType}</div>
          <div>
            <strong>{visit.doctor}</strong>
          </div>
          <div>{visitStatuses[visit.status]}
          {visit.status === 0 && <button onClick={() => registerToVisit({ VisitId: visit.visitId, DoctorId: visit.doctorId })}>zarejestruj</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientDayVisitComponent;
