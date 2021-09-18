import React, { useState, useEffect } from 'react';
import visitStatuses from '../helpers/visitStatusConst';

const DoctorDayVisitsForm = ({
  weekDay,
  dayProperty,
  setVisitsToAdd,
  createNewVisitId,
  handleDeleteFromVisitsToAdd,
  handleDayinputs,
  dayInputsValues,
  addVisitHour,
  daysVisits,
  setWarning,
  setWarningMsg,
  deleteVisit,
  doctorTypes,
  getVisitDetails,
}) => {
  const [visitTypeInput, setVisitTypeInput] = useState('');
  useEffect(() => {
    if (visitTypeInput === '') setVisitTypeInput(doctorTypes[0]);
  }, [doctorTypes]);

  const addVisitTimeToDay = (hour) => {
    let visitList = [...daysVisits[dayProperty], hour].sort((a, b) => (a.time > b.time ? 1 : -1));
    addVisitHour({ ...daysVisits, [dayProperty]: visitList });
  };

  const addHourtoList = (time) => {
    if (time === '') return;
    const visit = {
      time: time,
      status: 5,
      visitId: createNewVisitId(time, weekDay),
      visitType: visitTypeInput,
    };
    let isUnique = true;
    daysVisits[dayProperty].forEach((x) => (x.time.includes(dayInputsValues[dayProperty]) ? (isUnique = false) : null));
    if (daysVisits[dayProperty].length === 0) {
      addVisitTimeToDay(visit);
      setVisitsToAdd({ visitId: visit.visitId, visitType: visit.visitType });
    } else if (isUnique) {
      addVisitTimeToDay(visit);
      setVisitsToAdd({ visitId: visit.visitId, visitType: visit.visitType });
    } else {
      setWarning(true);
      setWarningMsg('Masz już wizytę o tej godzinie');
    }
  };

  const cancelHourFromList = (visit) => {
    let list = [...daysVisits[dayProperty]];
    handleDeleteFromVisitsToAdd(visit.visitId);
    list = list.filter((x) => x.time !== visit.time);
    addVisitHour({ ...daysVisits, [dayProperty]: list });
  };

  const handleInputChange = (e) => {
    handleDayinputs({ ...dayInputsValues, [dayProperty]: e.target.value });
    setWarning(false);
  };

  const handleAddHourBtn = (e) => {
    e.preventDefault();
    addHourtoList(dayInputsValues[dayProperty]);
  };

  return (
    <>
      <div className='add-visit-box'>
        <input type='time' onChange={handleInputChange} value={dayInputsValues[dayProperty]} />
        <div>
          <select onChange={(e) => setVisitTypeInput(e.target.value)} value={visitTypeInput}>
            {doctorTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button type='submit' onClick={handleAddHourBtn}>
            dodaj
          </button>
        </div>
      </div>
      {daysVisits[dayProperty].map((visit) => (
        <div className={visit.status === 5 ? 'waiting-visit visit-item' : 'visit-item'} key={visit.visitId}>
          <div>{visit.time}</div>
          <div>spec. {visit.visitType}</div>
          status: <strong>{visitStatuses[visit.status]}</strong>
          <div>
            {(visit.status === 1 || visit.status === 2) && <button onClick={() => getVisitDetails(visit.visitId)}>szczegóły</button>}
            <div className='cancel-delete-box'>
              {visit.status === 0 && <button onClick={() => deleteVisit(visit.visitId)}>usuń</button>}
              {visit.status === 5 && <button onClick={() => cancelHourFromList(visit)}>anuluj</button>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DoctorDayVisitsForm;
