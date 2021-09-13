import React, { useState, useEffect } from 'react';
import DoctorDayVisitsForm from '../../components/doctorDayVisitsForm';
import { DoctorCreateVisitsComponent } from './style/DoctorCreateVisitsPage.Style';
import doctorService from '../../services/doctor.service';
import authHeader from '../../helpers/auth-header';

const DoctorCreateVisitsPage = () => {
  const [mondayInput, setMondayInput] = useState('');
  const [mondayVisits, setMondayVisits] = useState([]);

  const [tuesdayInput, setTuesdayInput] = useState('');
  const [tuesdayVisits, setTuesdayVisits] = useState([]);

  const [wednesdayInput, setWednesdayInput] = useState('');
  const [wednesdayVisits, setWednesdayVisits] = useState([]);

  const [thursdayInput, setThursdayInput] = useState('');
  const [thursdayVisits, setThursdayVisits] = useState([]);

  const [fridayInput, setFridayInput] = useState('');
  const [fridayVisits, setFridayVisits] = useState([]);

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const [visitsToAdd, setVisitsToAdd] = useState([]);

  const selectMonday = (date) => {
    let monday = new Date(date);
    switch (monday.getDay()) {
      case 2:
        monday.setDate(monday.getDate() - 1);
        break;
      case 3:
        monday.setDate(monday.getDate() - 2);
        break;
      case 4:
        monday.setDate(monday.getDate() - 3);
        break;
      case 5:
        monday.setDate(monday.getDate() - 4);
        break;
      case 6:
        monday.setDate(monday.getDate() - 5);
        break;
      case 0:
        monday.setDate(monday.getDate() - 6);
        break;
      default:
        break;
    }
    return monday.toISOString().slice(0, 10);
  };
  const [searchDate, setSearchDate] = useState(selectMonday(new Date().toISOString().slice(0, 10)));

  useEffect(() => {
    doctorService
      .getVisitsInWeek(new Date(searchDate))
      .then((response) => {
        clearLists();
        setWarning(false);
        loadDays(response.value);
      })
      .catch((err) => {
        clearLists();
        setWarning(true);
        setWarningMessage('Brak wizyt w tym tygodniu');
      });
  }, [searchDate]);

  const createNewVisitId = (hour, weekDay) => {
    let date = new Date(searchDate);
    switch (weekDay) {
      case 1:
        date.setUTCHours(hour.slice(0, 2) * 1, hour.slice(3, 5) * 1);
        break;
      case 2:
        date.setDate(date.getDate() + 1);
        date.setUTCHours(hour.slice(0, 2) * 1, hour.slice(3, 5) * 1);
        break;
      case 3:
        date.setDate(date.getDate() + 2);
        date.setUTCHours(hour.slice(0, 2) * 1, hour.slice(3, 5) * 1);
        break;
      case 4:
        date.setDate(date.getDate() + 3);
        date.setUTCHours(hour.slice(0, 2) * 1, hour.slice(3, 5) * 1);
        break;
      case 5:
        date.setDate(date.getDate() + 4);
        date.setUTCHours(hour.slice(0, 2) * 1, hour.slice(3, 5) * 1);
        break;
      default:
        break;
    }
    return date.toISOString().slice(0,19)
  };

  const handleDeleteFromVisitsToAdd = (visit) => {
    let newVisitList = [...visitsToAdd];
    newVisitList.splice(newVisitList.indexOf(visit,1));
    setVisitsToAdd(newVisitList);
  }

  const clearLists = () => {
    setMondayVisits([]);
    setTuesdayVisits([]);
    setWednesdayVisits([]);
    setThursdayVisits([]);
    setFridayVisits([]);
  };

  const loadDays = (visits) => {
    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];
    visits.forEach((visit) => {
      switch (new Date(visit.visitId).getDay()) {
        case 1:
          monday = [...monday, [new Date(visit.visitId).toISOString().slice(11, 16), visit.visitStatus, visit.visitId]];
          break;
        case 2:
          tuesday = [...tuesday, [new Date(visit.visitId).toISOString().slice(11, 16), visit.visitStatus, visit.visitId]];
          break;
        case 3:
          wednesday = [...wednesday, [new Date(visit.visitId).toISOString().slice(11, 16), visit.visitStatus, visit.visitId]];
          break;
        case 4:
          thursday = [...thursday, [new Date(visit.visitId).toISOString().slice(11, 16), visit.visitStatus, visit.visitId]];
          break;
        case 5:
          friday = [...friday, [new Date(visit.visitId).toISOString().slice(11, 16), visit.visitStatus, visit.visitId]];
          break;
        default:
          break;
      }
    });
    setMondayVisits([...monday.sort((a, b) => (a[0] > b[0] ? 1 : -1))]);
    setTuesdayVisits([...tuesday.sort((a, b) => (a[0] > b[0] ? 1 : -1))]);
    setWednesdayVisits([...wednesday.sort((a, b) => (a[0] > b[0] ? 1 : -1))]);
    setThursdayVisits([...thursday.sort((a, b) => (a[0] > b[0] ? 1 : -1))]);
    setFridayVisits([...friday.sort((a, b) => (a[0] > b[0] ? 1 : -1))]);
  };

  const handleDateChange = (e) => {
    const monday = selectMonday(e.target.value);
    setSearchDate(monday);
  };

  return (
    <DoctorCreateVisitsComponent>
      <div className='date-pick-box'>
        <label>
          Wybierz tydzień
          <input type='date' onChange={handleDateChange} value={searchDate} />
        </label>
      </div>
      <div>
        <label>
          Poniedziałek
          <DoctorDayVisitsForm
            weekDay={1}
            createNewVisitId={createNewVisitId}
            handleDeleteFromVisitsToAdd={handleDeleteFromVisitsToAdd}
            handleDayinput={setMondayInput}
            dayInputValue={mondayInput}
            setHour={setMondayVisits}
            dayVisits={mondayVisits}
            setWarning={setWarning}
            setWarningMsg={setWarningMessage}
          />
        </label>
      </div>
      <div>
        <label>
          Wtorek
          <DoctorDayVisitsForm
            weekDay={2}
            createNewVisitId={createNewVisitId}
            handleDeleteFromVisitsToAdd={handleDeleteFromVisitsToAdd}
            handleDayinput={setTuesdayInput}
            dayInputValue={tuesdayInput}
            setHour={setTuesdayVisits}
            dayVisits={tuesdayVisits}
            setWarning={setWarning}
            setWarningMsg={setWarningMessage}
          />
        </label>
      </div>
      <div>
        <label>
          Środa
          <DoctorDayVisitsForm
            weekDay={3}
            createNewVisitId={createNewVisitId}
            handleDeleteFromVisitsToAdd={handleDeleteFromVisitsToAdd}
            handleDayinput={setWednesdayInput}
            dayInputValue={wednesdayInput}
            setHour={setWednesdayVisits}
            dayVisits={wednesdayVisits}
            setWarning={setWarning}
            setWarningMsg={setWarningMessage}
          />
        </label>
      </div>

      <div>
        <label>
          Czwartek
          <DoctorDayVisitsForm
            weekDay={4}
            createNewVisitId={createNewVisitId}
            handleDeleteFromVisitsToAdd={handleDeleteFromVisitsToAdd}
            handleDayinput={setThursdayInput}
            dayInputValue={thursdayInput}
            setHour={setThursdayVisits}
            dayVisits={thursdayVisits}
            setWarning={setWarning}
            setWarningMsg={setWarningMessage}
          />
        </label>
      </div>

      <div>
        <label>
          Piątek
          <DoctorDayVisitsForm
            weekDay={5}
            createNewVisitId={createNewVisitId}
            handleDeleteFromVisitsToAdd={handleDeleteFromVisitsToAdd}
            handleDayinput={setFridayInput}
            dayInputValue={fridayInput}
            setHour={setFridayVisits}
            dayVisits={fridayVisits}
            setWarning={setWarning}
            setWarningMsg={setWarningMessage}
          />
        </label>
      </div>
      {warning && (
        <div className='warning-box'>
          <span>{warningMessage}</span>
        </div>
      )}
    </DoctorCreateVisitsComponent>
  );
};

export default DoctorCreateVisitsPage;
