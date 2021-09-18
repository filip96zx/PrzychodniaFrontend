import React, { useState, useEffect } from 'react';
import DoctorDayVisitsForm from '../../components/doctorDayVisitsForm';
import { DoctorCreateVisitsComponent } from './style/DoctorCreateVisitsPage.Style';
import doctorService from '../../services/doctor.service';
import VisitDetailsModal from '../../components/visitDetailsModal';

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
    monday = monday.toLocaleDateString().length === 10 ? monday.toLocaleDateString() : '0' + monday.toLocaleDateString();
    return monday.slice(6, 11) + '-' + monday.slice(3, 5) + '-' + monday.slice(0, 2);
  };
  const [searchDate, setSearchDate] = useState(selectMonday(new Date()));

  const [doctorTypes, setDoctorTypes] = useState(['']);

  const [showModal, setShowModal] = useState(false);
  const [visitDetails, setVisitDetails] = useState({});

  useEffect(() => {
    getVisitsInWeek();
    getDoctorTypes();
  }, [searchDate]);

  const getDoctorTypes = () => {
    doctorService
      .getDoctorTypes()
      .then((response) => {
        setDoctorTypes(response.value);
      })
      .catch((err) => (setWarningMessage('Błąd podczas pobierania specjalizacji'), setWarning(true)));
  };

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
    const confirm = window.confirm('Potwierdź usunięcie wizyty');
    if (confirm) {
      doctorService
        .deleteVisit(visitId)
        .then(
          setTimeout(() => {
            loadVisitsAfterDelete();
          }, 200)
        )
        .catch((err) => {
          setWarning(true);
          setWarningMessage('Błąd');
        });
    }
  };

  const loadVisitsAfterDelete = () => {
    const notAddedVisits = visitsToAdd.map((visit) => ({ visitId: visit, visitStatus: 5, doctor: '' }));
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
  };

  const addNewVisits = () => {
    const visitsData = visitsToAdd.map((visit) => ({ visitDate: visit.visitId, visitType: visit.visitType }));
    if (visitsData.length > 0) {
      doctorService
        .addVisits({ visitsList: visitsData })
        .then((response) => {
          setWarningMessage('Dodano nowe wizyty');
          setWarning(true);
          getVisitsInWeek();
        })
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

  const handleDeleteFromVisitsToAdd = (visitId) => {
    let newVisitList = [...visitsToAdd];
    newVisitList = newVisitList.filter((visit) => visit.visitId !== visitId);
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
          monday = [...monday, { time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5), status: visit.visitStatus, visitId: visit.visitId, visitType: visit.visitType }];
          break;
        case 2:
          tuesday = [...tuesday, { time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5), status: visit.visitStatus, visitId: visit.visitId, visitType: visit.visitType }];
          break;
        case 3:
          wednesday = [...wednesday, { time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5), status: visit.visitStatus, visitId: visit.visitId, visitType: visit.visitType }];
          break;
        case 4:
          thursday = [...thursday, { time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5), status: visit.visitStatus, visitId: visit.visitId, visitType: visit.visitType }];
          break;
        case 5:
          friday = [...friday, { time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5), status: visit.visitStatus, visitId: visit.visitId, visitType: visit.visitType }];
          break;
        default:
          break;
      }
    });
    setDayVisitsLists({
      monday: monday.sort((a, b) => (a.time > b.time ? 1 : -1)),
      tuesday: tuesday.sort((a, b) => (a.time > b.time ? 1 : -1)),
      wednesday: wednesday.sort((a, b) => (a.time > b.time ? 1 : -1)),
      thursday: thursday.sort((a, b) => (a.time > b.time ? 1 : -1)),
      friday: friday.sort((a, b) => (a.time > b.time ? 1 : -1)),
    });
  };

  const handleDateChange = (e) => {
    const monday = selectMonday(e.target.value);
    setSearchDate(monday);
  };

  const dayDateHeader = (dayNumber) => {
    let date = new Date(new Date(searchDate).setDate(new Date(searchDate).getDate() - 1 + dayNumber)).toLocaleDateString();
    date = date.length === 10 ? date : '0' + date;
    return date.slice(0, 5);
  };

  const getVisitDetails = (visitId) => {
    const data = { visitId };
    doctorService
      .getVisitDetails(data)
      .then((response) => {
        setVisitDetails(response.value);
        setShowModal(true);
      })
      .catch((err) => console.log(err));
  };

  const handeFinishVisit = (data) => {
    doctorService
      .finishVisit(data)
      .then((response) => {
        getVisitDetails(data.visitId);
        getVisitsInWeek();
      })
      .catch((err) => console.log(err));
  };

  const handeCancelVisit = (data) => {
    doctorService
      .cancelVisit(data)
      .then((response) => {
        getVisitDetails(data.visitId);
        getVisitsInWeek();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <DoctorCreateVisitsComponent>
        <div className='date-pick-box'>
          <label>
            Wybierz tydzień{' '}
            <input type='date' onChange={handleDateChange} value={searchDate} />
          </label>
        </div>
        {daysInfo.map((day) => (
          <div className='day-column' key={day.number}>
            <div className='day-header'>
              <div>{dayDateHeader(day.number)}</div>
              <div>{day.name}</div>
            </div>
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
              doctorTypes={doctorTypes}
              getVisitDetails={getVisitDetails}
            />
          </div>
        ))}
        {warning && (
          <div className='warning-box'>
            <span>{warningMessage}</span>
          </div>
        )}
        <div className='save-visit-box'>
          <button onClick={addNewVisits}>Zapisz nowe wizyty</button>
        </div>
      </DoctorCreateVisitsComponent>
      {showModal && <VisitDetailsModal isDoctor={true} closeModal={() => setShowModal(false)} visit={visitDetails} finishVisit={handeFinishVisit} cancelVisit={handeCancelVisit} />}
    </>
  );
};

export default DoctorCreateVisitsPage;
