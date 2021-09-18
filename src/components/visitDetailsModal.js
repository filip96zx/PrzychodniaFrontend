import React, { useState } from 'react';
import { VisitDetailModalComponent } from './styles/visitDetailsModal.Style';
import visitStatuses from '../helpers/visitStatusConst';

const navigationItems = [
  { name: 'general', info: 'Informacje' },
  { name: 'findings', info: 'Wyniki badań' },
  { name: 'prescriptions', info: 'Recepty' },
  { name: 'messages', info: 'Wiadomości' },
];

const VisitDetailsModal = ({ closeModal, visit, isDoctor, cancelReservation, finishVisit, cancelVisit }) => {
  const [navigation, setNavigation] = useState({ general: true, findings: false, prescriptions: false, messages: false });
  const [showInfo, setShowInfo] = useState(false);

  const handleNavigation = (navElement) => {
    const nav = { general: false, findings: false, prescriptions: false, messages: false };
    setNavigation({ ...nav, [navElement]: true });
  };

  const handleClose = (e) => {
    if (e.target.className.includes('background')) closeModal();
  };

  const handleCancelReservation = () => {
    const data = { visitId: visit.visitId, doctorId: String(visit.doctorId) };
    if (cancelReservation) {
      cancelReservation(data);
    }
  };

  const handleFinishVisit = () => {
    const data = { visitId: visit.visitId };
    if (finishVisit) {
      finishVisit(data);
    }
  };

  const handleCancelVisit = () => {
    const data = { visitId: visit.visitId };
    if (cancelVisit) {
      cancelVisit(data);
    }
  };

  return (
    <VisitDetailModalComponent onClick={handleClose} className='background'>
      <div className='modal'>
        <div className='close-btn-container'>
          <button onClick={closeModal}>X</button>
        </div>
        <div className='modal-header'>
          <h3>
            {visit.visitId.slice(0, 10)} {visit.visitId.slice(11, 16)}
            {', '}
            {visit.visitType}
          </h3>
        </div>
        <nav>
          <ul>
            {navigationItems.map((item) => (
              <li key={item.name} className={navigation[item.name] ? 'active' : null} onClick={() => handleNavigation(item.name)}>
                {item.info}
              </li>
            ))}
          </ul>
        </nav>
        <div className='content-box'>
          {navigation.general && (
            <>
              <h3>Informacje</h3>
              <div>
                <div>specjalizacja: {visit.visitType}</div>
                {isDoctor ? (
                  <div>
                    Pacjent: <strong>{visit.patient}</strong>
                    <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'ukryj' : 'info'}</button>
                    {showInfo && (
                      <div className='info-box'>
                        <label>
                          Email: <span>{visit.patientEmail}</span>
                        </label>
                        <label>
                          Telefon: <span>{visit.patientPhoneNumber}</span>
                        </label>
                        <label>
                          Kraj: <span>{visit.patientCountry}</span>
                        </label>
                        <label>
                          Adres: <span>{visit.patientAddress}</span>
                        </label>
                        <label>
                          Płeć: <span>{visit.PatientGender === 0 ? 'Mężczyzna' : 'Kobieta'}</span>
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    Lekarz: <strong>{visit.doctor}</strong>
                    <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'ukryj' : 'info'}</button>
                    {showInfo && (
                      <div className='info-box'>
                        <label>
                          Specjalizacje:{' '}
                          <span>
                            <strong>{visit.doctorSpecialisations.map((spec) => spec + ' ')}</strong>
                          </span>
                        </label>
                        <label>
                          Email: <span>{visit.doctorEmail}</span>
                        </label>
                        <label>
                          Telefon: <span>{visit.doctorPhoneNumber}</span>
                        </label>
                      </div>
                    )}
                  </div>
                )}

                <div>Termin: {visit.visitId.slice(0, 10)}</div>
                <div>Godzina: {visit.visitId.slice(11, 16)}</div>
                <div>
                  status: <strong>{visitStatuses[visit.visitStatus]}</strong>
                </div>
              </div>
              <div className='btn-box'>
                {!isDoctor && visit.visitStatus === 1 && <button onClick={handleCancelReservation}>Anuluj rezerwację</button>}
                {isDoctor && visit.visitStatus === 1 && <button onClick={handleFinishVisit}>Zakończ wizytę</button>}
                {isDoctor && visit.visitStatus === 1 && <button onClick={handleCancelVisit}>Odwołaj wizytę</button>}
              </div>
            </>
          )}
          {navigation.findings && <h3>Wyniki badań</h3>}
          {navigation.prescriptions && <h3>Recepty</h3>}
          {navigation.messages && <h3>Wiadomości</h3>}
        </div>
      </div>
    </VisitDetailModalComponent>
  );
};

export default VisitDetailsModal;
