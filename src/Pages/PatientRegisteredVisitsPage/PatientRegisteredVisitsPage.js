import React, { useState, useEffect } from 'react';
import patientService from '../../services/patient.service';
import VisitDetailsModal from '../../components/visitDetailsModal';
import { PatientRegisteredVisitComponent } from './style/PatientRegisteredVisitsPage.style';
import visitStatuses from '../../helpers/visitStatusConst';
import { Spinner } from '../../components/styles/spinner.style';

const PatientRegisteredVisitsPage = () => {
  const [visits, setVisist] = useState([]);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setwarningMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [visitDetails, setVisitDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRegisteredVisits();
  }, []);

  const getRegisteredVisits = () => {
    setIsLoading(true);
    patientService
      .getDoneVisits()
      .then((response) => {
        loadVisits(response.value);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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
      .catch((err) => err);
  };

  const handleCancelReservation = (data) => {
    patientService
      .cancelVisitRegistration(data)
      .then((response) => {
        setShowModal(false);
        setVisitDetails({});
        getRegisteredVisits();
      })
      .catch((err) => err);
  };

  return (
    <PatientRegisteredVisitComponent>
      <div className='table-box' style={showModal ? { overflowX: 'hidden' } : null}>
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
            {isLoading && (
              <tr>
                <td colSpan='6'>
                  <Spinner style={{ margin: '0 auto' }} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {warning && <span>{warningMessage}</span>}
      {showModal && <VisitDetailsModal isDoctor={false} closeModal={() => setShowModal(false)} visit={visitDetails} cancelReservation={handleCancelReservation} />}
    </PatientRegisteredVisitComponent>
  );
};

export default PatientRegisteredVisitsPage;
