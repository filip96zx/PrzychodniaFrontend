import React, { useState, useEffect } from 'react';
import patientService from '../../services/patient.service';
import PatientDayVisitComponent from '../../components/patientDayVisit';
import { PatientRegisterPageComponent } from './style/PatientRegisterPage.Style';

const daysInfo = [
  { property: 'monday', number: 1, name: 'Poniedziałek' },
  { property: 'tuesday', number: 2, name: 'Wtorek' },
  { property: 'wednesday', number: 3, name: 'Środa' },
  { property: 'thursday', number: 4, name: 'Czwartek' },
  { property: 'friday', number: 5, name: 'Piątek' },
];

const PatientRegisterPage = () => {
  const [doctorType, setDoctorType] = useState('');
  const [doctorTypes, setDoctorTypes] = useState([]);
  const [doctorsInType, setDoctorsInType] = useState([]);
  const [doctor, setDoctor] = useState('');

  //

  const [dayVisitsList, setDayVisitsLists] = useState({ monday: [], tuesday: [], wednesday: [], thursday: [], friday: [] });

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
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

  useEffect(() => {
    patientService.getDoctorsTypes().then((response) => setDoctorTypes(response.value));
  }, []);

  useEffect(() => {
    const data = { doctorType: doctorType };
    if (doctorType !== '') {
      patientService.getDoctorsInType(data).then((response) => {
        setDoctorsInType(response.value);
        setDoctor('');
      });
    }
  }, [doctorType]);

  useEffect(() => {
    loadWeekVisits();
  }, [doctor, searchDate, doctorType]);

  const loadWeekVisits = () => {
    if (doctor === '' && doctorType !== '') {
      patientService
        .getDoctorAllVisits({ WeekDay: searchDate, doctorType: doctorType })
        .then((response) => {
          clearLists();
          loadDays(response.value);
        })
        .catch((err) => clearLists());
    }
    if (doctor !== '' && doctorType !== '') {
      patientService
        .getDoctorVisits({ WeekDay: searchDate, doctorId: doctor, doctorType: doctorType })
        .then((response) => {
          clearLists();
          loadDays(response.value);
        })
        .catch((err) => clearLists());
    }
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
          monday = [
            ...monday,
            {
              time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5),
              status: visit.visitStatus,
              visitId: visit.visitId,
              visitType: visit.visitType,
              doctor: visit.doctor,
              doctorId: visit.doctorId,
            },
          ];
          break;
        case 2:
          tuesday = [
            ...tuesday,
            {
              time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5),
              status: visit.visitStatus,
              visitId: visit.visitId,
              visitType: visit.visitType,
              doctor: visit.doctor,
              doctorId: visit.doctorId,
            },
          ];
          break;
        case 3:
          wednesday = [
            ...wednesday,
            {
              time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5),
              status: visit.visitStatus,
              visitId: visit.visitId,
              visitType: visit.visitType,
              doctor: visit.doctor,
              doctorId: visit.doctorId,
            },
          ];
          break;
        case 4:
          thursday = [
            ...thursday,
            {
              time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5),
              status: visit.visitStatus,
              visitId: visit.visitId,
              visitType: visit.visitType,
              doctor: visit.doctor,
              doctorId: visit.doctorId,
            },
          ];
          break;
        case 5:
          friday = [
            ...friday,
            {
              time: new Date(visit.visitId).toLocaleTimeString().slice(0, 5),
              status: visit.visitStatus,
              visitId: visit.visitId,
              visitType: visit.visitType,
              doctor: visit.doctor,
              doctorId: visit.doctorId,
            },
          ];
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

  const registerToVisit = (data) => {
    patientService
      .registerToVisit(data)
      .then((response) => {
        loadWeekVisits();
      })
      .catch((err) => console.log(err));
  };

  return (
    <PatientRegisterPageComponent>
      <div className='select-visit-box'>
        <div>
          <label>
            Wybierz typ wizyty{' '}
            <select onChange={(e) => setDoctorType(e.target.value)} value={doctorType}>
              <option value=''> </option>
              {doctorTypes?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Wybierz lekarza{' '}
            <select onChange={(e) => setDoctor(e.target.value)} value={doctor}>
              <option value=''> </option>
              {doctorsInType?.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.name + ' ' + doctor.surname}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='date-pick-box'>
          <label>
            Wybierz tydzień <input type='date' onChange={handleDateChange} value={searchDate} />
          </label>
        </div>
      </div>
      <div className='week-visit-box'>
        {daysInfo.map((day) => (
          <div className='day-column'key={day.number}>
            <div className='day-header'>
              <div>{dayDateHeader(day.number)}</div>
              <div>{day.name}</div>
            </div>
            <PatientDayVisitComponent
              weekDay={day.number}
              dayProperty={day.property}
              addVisitHour={setDayVisitsLists}
              daysVisits={dayVisitsList}
              setWarning={setWarning}
              setWarningMsg={setWarningMessage}
              registerToVisit={registerToVisit}
            />
          </div>
        ))}
      </div>
    </PatientRegisterPageComponent>
  );
};

export default PatientRegisterPage;
