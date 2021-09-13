import React, { useState, useEffect } from 'react';
import DoctorDayVisitsForm from '../../components/doctorDayVisitsForm';
import { DoctorCreateVisitsComponent } from './style/DoctorCreateVisitsPage.Style';
import doctorService from '../../services/doctor.service';
import authHeader from '../../helpers/auth-header';

const daysInfo = [
  { property: 'monday', number: 1, name: 'Poniedziałek' },
  { property: 'tuesday', number: 2, name: 'Wtorek' },
  { property: 'wednesday', number: 3, name: 'Środa' },
  { property: 'thursday', number: 4, name: 'Czwartek' },
  { property: 'friday', number: 5, name: 'Piątek' },
];

const DoctorCreateVisitsPage = () => {
  const [dayVisitsInputs, setDayVisitsInputs] = useState({ monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' });
  const [dayVisitsList, setDayVisitsLists] = useState({ monday: [], tuesday: [], wednesday: [], thursday: [], friday: [] });

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
  const [searchDate, setSearchDate] = useState(selectMonday(new Date()));

  useEffect(() => {
    getVisitsInWeek();
  }, [searchDate]);

  const getVisitsInWeek = () => {
    doctorService
      .getVisitsInWeek(new Date(searchDate))
      .then((response) => {
        clearLists();
        setVisitsToAdd([]);
        setWarning(false);
        loadDays(response.value);
      })
      .catch((err) => {
        clearLists();
        setWarning(true);
        setWarningMessage('Brak wizyt w tym tygodniu');
      });
  };

  const deleteVisit = (visitId) => {
    const confirm = window.confirm("Potwierdź usunięcie wizyty");
    if(confirm) {
      doctorService.deleteVisit(visitId).then(
        setWarning(true),
        setWarningMessage("Wizyta została usunięta"),
        setTimeout(() => {
          loadVisitsAfterDelete()
        }, 100)
      ).catch(err => {
        setWarning(true);
        setWarningMessage("Błąd");
      })
    }
  }

  const loadVisitsAfterDelete = () => {
    const notAddedVisits = visitsToAdd.map(visit => ({visitId: visit, visitStatus:5,doctor:""}))
    doctorService
      .getVisitsInWeek(new Date(searchDate))
      .then((response) => {
        clearLists();
        setWarning(false);
        loadDays([...response.value, ...notAddedVisits]);
      })
      .catch((err) => {
        clearLists();
        setWarning(true);
        setWarningMessage('Brak wizyt w tym tygodniu');
      });
  } 

  const addNewVisits = () => {
    const visitsData = visitsToAdd.map((visit) => ({ visitDate: visit }));
    if (visitsData.length > 0) {
      doctorService
        .addVisits({ visitsList: visitsData })
        .then(response => {
          setWarningMessage('Dodano nowe wizyty'); 
          setWarning(true);
          getVisitsInWeek(); 
          }
        )
        .catch((err) => {
          setWarning('Błąd podczas dodawania wizyt');
          setWarning(true);
        });
    } else {
      setWarningMessage('Brak nowych wizyt do dodania');
      setWarning(true);
    }
  };

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
    return date.toISOString().slice(0, 19);
  };

  const handleAddToVisitsToAdd = (visit) => {
    setVisitsToAdd([...visitsToAdd, visit]);
  };

  const handleDeleteFromVisitsToAdd = (visit) => {
    let newVisitList = [...visitsToAdd];
    newVisitList.splice(newVisitList.indexOf(visit, 1));
    setVisitsToAdd(newVisitList);
  };

  const clearLists = () => {
    setDayVisitsLists({ monday: [], tuesday: [], wednesday: [], thursday: [], friday: [] });
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
          monday = [...monday, [new Date(visit.visitId).toLocaleTimeString().slice(0, 5), visit.visitStatus, visit.visitId]];
          break;
        case 2:
          tuesday = [...tuesday, [new Date(visit.visitId).toLocaleTimeString().slice(0, 5), visit.visitStatus, visit.visitId]];
          break;
        case 3:
          wednesday = [...wednesday, [new Date(visit.visitId).toLocaleTimeString().slice(0, 5), visit.visitStatus, visit.visitId]];
          break;
        case 4:
          thursday = [...thursday, [new Date(visit.visitId).toLocaleTimeString().slice(0, 5), visit.visitStatus, visit.visitId]];
          break;
        case 5:
          friday = [...friday, [new Date(visit.visitId).toLocaleTimeString().slice(0, 5), visit.visitStatus, visit.visitId]];
          break;
        default:
          break;
      }
    });
    setDayVisitsLists({
      monday: monday.sort((a, b) => (a[0] > b[0] ? 1 : -1)),
      tuesday: tuesday.sort((a, b) => (a[0] > b[0] ? 1 : -1)),
      wednesday: wednesday.sort((a, b) => (a[0] > b[0] ? 1 : -1)),
      thursday: thursday.sort((a, b) => (a[0] > b[0] ? 1 : -1)),
      friday: friday.sort((a, b) => (a[0] > b[0] ? 1 : -1)),
    });
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
      {daysInfo.map((day) => (
        <div key={day.number}>
          <label>
            {day.name}
            <DoctorDayVisitsForm
              weekDay={day.number}
              dayProperty={day.property}
              setVisitsToAdd={handleAddToVisitsToAdd}
              createNewVisitId={createNewVisitId}
              handleDeleteFromVisitsToAdd={handleDeleteFromVisitsToAdd}
              handleDayinputs={setDayVisitsInputs}
              dayInputsValues={dayVisitsInputs}
              addVisitHour={setDayVisitsLists}
              daysVisits={dayVisitsList}
              setWarning={setWarning}
              setWarningMsg={setWarningMessage}
              deleteVisit={deleteVisit}
            />
          </label>
        </div>
      ))}
      {warning && (
        <div className='warning-box'>
          <span>{warningMessage}</span>
        </div>
      )}
      <div className='add-visits-box'>
        <button onClick={addNewVisits}>Zapisz nowe wizyty</button>
      </div>
    </DoctorCreateVisitsComponent>
  );
};

export default DoctorCreateVisitsPage;
