import React, { useState, useEffect } from 'react';
import patientService from '../../services/patient.service';
import VisitDetailsModal from '../../components/visitDetailsModal';
import { PatientRegisteredVisitComponent } from './style/PatientRegisteredVisitsPage.style';
import visitStatuses from '../../helpers/visitStatusConst';


const PatientRegisteredVisitsPage = () => {
  const [visits, setVisist] = useState([]);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setwarningMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [visitDetails, setVisitDetails] = useState({});

  useEffect(() => {
    getRegisteredVisits();
  }, []);

  const getRegisteredVisits = () => {
    setVisist([]);
    patientService
      .getRegisteredVisits()
      .then((response) => {
        loadVisits(response.value);
      })
      .catch((err) => {
        setwarningMessage('Brak wizyt');
        setWarning(true);
      });
  };

  const loadVisits = (visit) => {
    let visits = visit.map((visit) => ({
      visitId: visit.visitId,
      visitStatus: visit.visitStatus,
      visitType: visit.visitType,
      doctor: visit.doctor,
      doctorId: visit.doctorId,
    }));
    setVisist(visits);
  };

  const getVisitDetails = (visitId, doctorId) => {
    const data = { visitId, doctorId };
    setVisitDetails({});
    patientService
      .getVisitDetails(data)
      .then((response) => {
        setVisitDetails(response.value);
        setShowModal(true);
      })
      .catch((err) => console.log(err));
  };

  const handleCancelReservation = (data) => {
    patientService
      .cancelVisitRegistration(data)
      .then((response) => {
        setShowModal(false);
        setVisitDetails({});
        getRegisteredVisits();
      })
      .catch();
  };

  return (
    <PatientRegisteredVisitComponent>
      <table>
        <thead>
          <tr>
            <th>Specjalizacja</th>
            <th>Lekarz</th>
            <th>Termin</th>
            <th>Godzina</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.visitId + visit.doctorId}>
              <td>{visit.visitType}</td>
              <td>{visit.doctor}</td>
              <td>{visit.visitId.slice(0, 10)}</td>
              <td>{visit.visitId.slice(11, 16)}</td>
              <td>
                <button onClick={() => getVisitDetails(visit.visitId, visit.doctorId)}>szczegóły</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {warning && <span>{warningMessage}</span>}
      {showModal && <VisitDetailsModal isDoctor={false} closeModal={() => setShowModal(false)} visit={visitDetails} cancelReservation={handleCancelReservation} />}
    </PatientRegisteredVisitComponent>
  );
};

export default PatientRegisteredVisitsPage;
