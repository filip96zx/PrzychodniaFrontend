import React, { useState } from 'react';

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
  deleteVisit
}) => {
  const addVisitTimeToDay = (hour) => {
    let visitList = [...daysVisits[dayProperty], hour].sort((a, b) => (a[0] > b[0] ? 1 : -1));
    addVisitHour({ ...daysVisits, [dayProperty]: visitList });
  };


  const addHourtoList = (time) => {
    if (time === '') return;
    const visit = [time, 5, createNewVisitId(time, weekDay)];
    let isUnique=true;
    daysVisits[dayProperty].forEach(x => x[0].includes(dayInputsValues[dayProperty])? isUnique = false : null);
    if (daysVisits[dayProperty].length === 0) {
    addVisitTimeToDay(visit);
    setVisitsToAdd(visit[2]);
    } else if(isUnique){
      addVisitTimeToDay(visit);
      setVisitsToAdd(visit[2]);
    } else {

      setWarning(true);
      setWarningMsg('Masz już wizytę o tej godzinie');
    }
  };

  const cancelHourFromList = (hour) => {
    let list = [...daysVisits[dayProperty]];
    handleDeleteFromVisitsToAdd(createNewVisitId(hour, weekDay));
    list = list.filter((x) => x[0] !== hour);
    addVisitHour({ ...daysVisits, [dayProperty]: list });
  };

  const handleInputChange = (e) => {
    handleDayinputs({ ...dayInputsValues, [dayProperty]: e.target.value });
    setWarning(false);
  };

  return (
    <div>
      <input type='time' onChange={handleInputChange} value={dayInputsValues[dayProperty]} />
      <button onClick={() => addHourtoList(dayInputsValues[dayProperty])}>dodaj</button>
      {daysVisits[dayProperty].map((visit) => (
        <div key={visit}>
          {visit[0]} status:{visit[1]}
          {visit[1] === 0 && <button onClick={() => deleteVisit(visit[2])}>usuń</button>}
          {visit[1] === 5 && <button onClick={() => cancelHourFromList(visit[0])}>anuluj</button>}
        </div>
      ))}
    </div>
  );
};

export default DoctorDayVisitsForm;
