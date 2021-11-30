import React, { useState} from 'react';
import { VisitDetailModalComponent } from './styles/visitDetailsModal.Style';
import visitStatuses from '../helpers/visitStatusConst';
import doctorService from '../services/doctor.service';
import patientService from '../services/patient.service';

const navigationItems = [
  { name: 'general', info: 'Informacje' },
  { name: 'findings', info: 'Wyniki badań' },
  { name: 'prescriptions', info: 'Recepty' },
  { name: 'messages', info: 'Wiadomości' },
];

const VisitDetailsModal = ({ closeModal, visit, isDoctor, cancelReservation, finishVisit, cancelVisit }) => {
  const [navigation, setNavigation] = useState({ general: true, findings: false, prescriptions: false, messages: false });
  const [showInfo, setShowInfo] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const [prescriptions, setPrescriptions] = useState([]);
  const [findings, setFindings] = useState([]);

  const [medicineInput, setMedicineInput] = useState('');
  const [dosageInput, setDosageInput] = useState('');
  const [prescriptionNumber, setPrescriptionNumber] = useState('');
  const [medicineList, setMedicineList] = useState([]);
  const [prescriptionCode, setPrescriptionCode] = useState('');
  const [prescriptionErrorMessage, setPrescriptionErrorMessage] = useState('');
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const [findingTitleInput, setFindingTitleInput] = useState('');
  const [findingDescriptionInput, setFindingDescriptionInput] = useState('');
  const [findingErrorMessage, setFindingErrorMessage] = useState('');
  const [showFindingForm, setShowFindingForm] = useState(false);

  const handleNavigation = (navElement) => {
    const nav = { general: false, findings: false, prescriptions: false, messages: false };
    if (navElement === 'messages') {
      getMessages();
    }
    if (navElement === 'prescriptions') {
      getPrescritpions();
    }
    if (navElement === 'findings') {
      getFindings();
    }
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

  const getMessages = () => {
    let messages = [];
    if (isDoctor) {
      const data = { visitId: visit.visitId };
      doctorService
        .getMessages(data)
        .then((response) => {
          messages = response.value.map((message) => JSON.parse(message));
          messages.sort((a, b) => (a.date < b.date ? 1 : -1));
          setMessages(messages);
        })
        .catch((err) => err);
    } else {
      const data = { visitId: visit.visitId, doctorId: String(visit.doctorId) };
      patientService
        .getMessages(data)
        .then((response) => {
          messages = response.value.map((message) => JSON.parse(message));
          messages.sort((a, b) => (a.date < b.date ? 1 : -1));
          setMessages(messages);
        })
        .catch((err) => err);
    }
  };

  const returnMessageClass = (msgType) => {
    if (isDoctor) {
      return msgType === 'doctor' ? 'message-line my-message' : 'message-line';
    } else {
      return msgType === 'doctor' ? 'message-line' : 'message-line my-message';
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput === '') return;

    let messages = [];
    if (isDoctor) {
      const data = { visitId: visit.visitId, message: messageInput.trim() };
      setMessageInput('');
      doctorService
        .sendMessage(data)
        .then((response) => {
          messages = response.value.map((message) => JSON.parse(message));
          messages.sort((a, b) => (a.date < b.date ? 1 : -1));
          setMessages(messages);
        })
        .catch((err) => err);
    } else {
      const data = { visitId: visit.visitId, message: messageInput.trim(), doctorId: String(visit.doctorId) };
      setMessageInput('');
      patientService
        .sendMessage(data)
        .then((response) => {
          messages = response.value.map((message) => JSON.parse(message));
          messages.sort((a, b) => (a.date < b.date ? 1 : -1));
          setMessages(messages);
        })
        .catch((err) => err);
    }
  };

  const handleShowPrescritpion = (number) => {
    let list = [...prescriptions];
    let toShow = list.find((x) => x.number === number);
    toShow.showDetails = !toShow.showDetails;
    list = list.filter((x) => x.number !== number);
    list = [...list, toShow].sort((a, b) => (a.number > b.number ? 1 : -1));
    setPrescriptions(list);
  };

  const handleShowFindings = (number) => {
    let list = [...findings];
    let toShow = list.find((x) => x.number === number);
    toShow.showDetails = !toShow.showDetails;
    list = list.filter((x) => x.number !== number);
    list = [...list, toShow].sort((a, b) => (a.number > b.number ? 1 : -1));
    setFindings(list);
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (dosageInput !== '' && medicineInput !== '') {
      setPrescriptionErrorMessage('');
      setMedicineList([...medicineList, { id: medicineList.length, name: medicineInput.trim(), dosage: dosageInput.trim() }]);
      setDosageInput('');
      setMedicineInput('');
    }
  };
  const handleDeleteMedicine = (id) => {
    setMedicineList(medicineList.filter((x) => x.id !== id));
  };

  const handleSendPrescription = () => {
    if (medicineList.length === 0) {
      setPrescriptionErrorMessage('Uzupełnij listę leków');
    } else if (prescriptionCode === '') {
      setPrescriptionErrorMessage('Wpisz kod recepty');
    } else {
      const medicines = medicineList.map((x) => ({ name: x.name, dosage: x.dosage }));
      const prescription = { code: prescriptionCode.trim(), medicines: medicines.trim() };
      const data = { visitId: visit.visitId, prescription: JSON.stringify(prescription) };
      setPrescriptionCode('');
      setMedicineList([]);
      doctorService
        .sendPrescription(data)
        .then((response) => {
          loadPrescriptions(response.value);
        })
        .catch((err) => console.log(err));
    }
  };

  const getPrescritpions = () => {
    if (isDoctor) {
      const data = { visitId: visit.visitId };
      doctorService
        .getPrescritpions(data)
        .then((response) => {
          loadPrescriptions(response.value);
        })
        .catch((err) => {
          setPrescriptions([]);
        });
    } else {
      const data = { visitId: visit.visitId, doctorId: String(visit.doctorId) };
      patientService
        .getPrescritpions(data)
        .then((response) => {
          loadPrescriptions(response.value);
        })
        .catch((err) => {
          setPrescriptions([]);
        });
    }
  };

  const loadPrescriptions = (list) => {
    if (list.length === 0) {
      setPrescriptions([]);
      return;
    }
    const prescList = list?.map((x) => JSON.parse(x));
    setPrescriptions(prescList);
  };

  const handleDeletePrescription = (prescNumber) => {
    if (isDoctor) {
      const data = { visitId: visit.visitId, prescriptionNumber: prescNumber };
      doctorService
        .deletePrescription(data)
        .then((response) => {
          loadPrescriptions(response.value);
        })
        .catch((err) => err);
    }
  };

  const handleSendFinding = (e) => {
    e.preventDefault();
    if (findingTitleInput === '') {
      setFindingErrorMessage('Wpisz nazwę badania');
    } else if (findingDescriptionInput === '') {
      setFindingErrorMessage('Wpisz opis badania');
    } else {
      const finding = { title: findingTitleInput.trim(), description: findingDescriptionInput.trim() };
      const data = { visitId: visit.visitId, finding: JSON.stringify(finding) };
      setFindingErrorMessage('');
      setFindingTitleInput('');
      setFindingDescriptionInput('');
      doctorService
        .sendFinding(data)
        .then((response) => {
          loadFindings(response.value);
        })
        .catch((err) => err);
    }
  };

  const loadFindings = (list) => {
    if (list.length === 0) {
      setFindings([]);
      return;
    }
    const findings = list.map((x) => JSON.parse(x));
    setFindings(findings);
  };

  const getFindings = () => {
    if (isDoctor) {
      const data = { visitId: visit.visitId };
      doctorService
        .getFindings(data)
        .then((response) => {
          loadFindings(response.value);
        })
        .catch((err) => {
          setFindings([]);
        });
    } else {
      const data = { visitId: visit.visitId, doctorId: String(visit.doctorId) };
      patientService
        .getFindings(data)
        .then((response) => {
          loadFindings(response.value);
        })
        .catch((err) => {
          setFindings([]);
        });
    }
  };

  const handleDeleteFinding = (findingNumber) => {
    if (isDoctor) {
      const data = { visitId: visit.visitId, findingNumber: findingNumber };
      console.log(data);
      doctorService
        .deleteFinding(data)
        .then((response) => {
          loadFindings(response.value);
        })
        .catch((err) => err);
    }
  };

  return (
    <VisitDetailModalComponent onClick={handleClose} className='background'>
      <div className='modal'>
        <div className='close-btn-container'>
          <button onClick={closeModal}><strong>&#10005;</strong></button>
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
            <div className='general-box'>
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
                          Płeć: <span>{visit.patientGender === 0 ? 'Mężczyzna' : 'Kobieta'}</span>
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
            </div>
          )}
          {navigation.findings && (
            <div className='findings-box'>
              <h3>Wyniki badań</h3>
              {findings.length === 0 && <span>Brak wyników</span>}
              {findings?.map((item) => (
                <div key={item.number} className='finding-item'>
                  <div className='prescription-header'>
                    <strong>{item.title}</strong>
                    <button onClick={() => handleShowFindings(item.number)}>{item.showDetails ? 'ukryj' : 'pokaż'}</button>
                  </div>
                  {item.showDetails && (
                    <div className='finding-description'>
                      szczegóły:
                      <p>{item.description}</p>
                      {isDoctor && <button onClick={() => handleDeleteFinding(item.number)}>usuń badanie</button>}
                    </div>
                  )}
                </div>
              ))}
              {isDoctor && (
                <button className='new-finding-btn' onClick={() => setShowPrescriptionForm(!showFindingForm)}>
                  {!showFindingForm ? 'Nowe badanie' : 'ukryj'}
                </button>
              )}
              {isDoctor && showFindingForm && (
                <form className='new-finding-box'>
                  <div>
                    <label>
                      Badanie:
                      <div>
                        <input type='text' onChange={(e) => setFindingTitleInput(e.target.value)} value={findingTitleInput} />
                      </div>
                    </label>
                  </div>
                  <div className='description-box'>
                    <label>
                      Opis:
                      <div>
                        <input type='text' onChange={(e) => setFindingDescriptionInput(e.target.value)} value={findingDescriptionInput} />
                      </div>
                    </label>
                  </div>
                  {findingErrorMessage !== '' ? <div>{findingErrorMessage}</div> : null}
                  <button onClick={(e) => handleSendFinding(e)}>wyślij</button>
                </form>
              )}
            </div>
          )}
          {navigation.prescriptions && (
            <div className='prescriptions-box'>
              <h3>Recepty</h3>
              {prescriptions.length === 0 && <span>Brak recept</span>}
              {prescriptions?.map((item) => (
                <div key={item.number} className='prescription-item'>
                  <div className='prescription-header'>
                    {'Kod recepty: '}
                    {item.code}
                    <button onClick={() => handleShowPrescritpion(item.number)}>{item.showDetails ? 'ukryj' : 'pokaż'}</button>
                  </div>
                  {item.showDetails && (
                    <div className='medicine-list'>
                      <ul>
                        {item.medicines.map((med) => (
                          <li key={med.name + med.dosage}>
                            {'Lek: '}
                            <strong>{med.name}</strong>
                            {', dawkowanie: '}
                            {med.dosage}
                          </li>
                        ))}
                      </ul>
                      {isDoctor && <button onClick={() => handleDeletePrescription(item.number)}>usuń receptę</button>}
                    </div>
                  )}
                </div>
              ))}
              {isDoctor && <button onClick={() => setShowPrescriptionForm(!showPrescriptionForm)}>{!showPrescriptionForm ? 'Nowa recepta' : 'Ukryj'}</button>}
              {isDoctor && showPrescriptionForm && (
                <div className='prescription-form-box'>
                  <form className='prescritpion-form'>
                    <div>
                      <label>
                        {'Kod recepty: '}
                        <input type='text' onChange={(e) => setPrescriptionNumber(e.target.value)} value={prescriptionNumber} />
                      </label>
                    </div>
                    <button
                      type='button'
                      onClick={() => {
                        setPrescriptionCode(prescriptionNumber);
                        setPrescriptionNumber('');
                        setPrescriptionErrorMessage('');
                      }}
                    >
                      zapisz kod
                    </button>
                    <div>
                      <label>
                        {'lek: '}
                        <input type='text' maxLength='25' onChange={(e) => setMedicineInput(e.target.value)} value={medicineInput} />
                      </label>
                    </div>
                    <div>
                      <label>
                        {' dawkowanie: '}
                        <input type='text' maxLength='30' onChange={(e) => setDosageInput(e.target.value)} value={dosageInput} />
                      </label>
                    </div>
                    <button type='submit' onClick={(e) => handleAddMedicine(e)}>
                      dodaj
                    </button>
                  </form>
                  <div className='new-prescription'>
                    <div>
                      {'Kod recepty: '}
                      {prescriptionCode}
                    </div>
                    <ul>
                      {medicineList?.map((x) => (
                        <li key={x.id}>
                          <button
                            onClick={() => {
                              handleDeleteMedicine(x.id);
                            }}
                          >
                            usuń
                          </button>
                          {' ' + x.name + ', ' + x.dosage}
                        </li>
                      ))}
                    </ul>
                    <div className='send-prescription-btn'>
                      {prescriptionErrorMessage !== '' ? <div>{prescriptionErrorMessage}</div> : null}
                      <button onClick={handleSendPrescription}>Wyślij</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {navigation.messages && (
            <div className='messages-box'>
              <h3>Wiadomości</h3>
              <div className='chatbox'>
                {messages.length === 0 ? 'brak wiadomości' : null}
                {messages.map((msg) => (
                  <div key={msg.date} className={returnMessageClass(msg.type)}>
                    <div className='message'>
                      <span>{msg.date}</span>
                      <div>{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='send-message-box'>
                <form>
                  <input type='text-area' maxLength='300' onChange={(e) => setMessageInput(e.target.value)} value={messageInput} />
                  <button onClick={handleSendMessage}>wyślij</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </VisitDetailModalComponent>
  );
};

export default VisitDetailsModal;
