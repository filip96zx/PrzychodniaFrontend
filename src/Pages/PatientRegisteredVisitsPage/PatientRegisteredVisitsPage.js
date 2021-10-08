import React, { useState, useEffect } from 'react';
import patientService from '../../services/patient.service';
import VisitDetailsModal from '../../components/visitDetailsModal';
import { PatientRegisteredVisitComponent } from './style/PatientRegisteredVisitsPage.style';
import { Spinner } from '../../components/styles/spinner.style';
import { useParams, useHistory } from 'react-router';

const PatientRegisteredVisitsPage = () => {
  const params = useParams();
  const history = useHistory();
  const [visits, setVisist] = useState([]);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setwarningMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [visitDetails, setVisitDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(Number.isInteger(params.pageIndex * 1) ? params.pageIndex * 1 : 0);
  const [pageSize, setPageSize] = useState(Number.isInteger(params.pageSize * 1) ? params.pageSize * 1 : 5);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getRegisteredVisits();
  }, []);

  useEffect(() => {
    getRegisteredVisits();
  }, [pageIndex, pageSize]);

  useEffect(() => {
    setPageIndex(params.pageIndex ? params.pageIndex * 1 : 0);
    setPageSize(params.pageSize ? params.pageSize * 1 : 5);
  }, [params.pageIndex, params.pageSize]);

  const getRegisteredVisits = () => {
    patientService
      .getRegisteredVisits(pageIndex, pageSize)
      .then((response) => {
        setTotalCount(response.totalCount);
        loadVisits(response.item);
        setIsLoading(false);
        setWarning(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setwarningMessage('Brak wizyt');
        setWarning(true);
      });
  };

  const handleSetPageSize = (e) => {
    setPageSize(e.target.value);
    setPageIndex(0);
    history.push(`/registeredvisits/${e.target.value}/${0}`);
  };

  const nextPage = () => {
    if (parseInt(pageIndex) + 1 < Math.ceil(totalCount / pageSize)) {
      const index = parseInt(pageIndex) + 1;
      setPageIndex(index);
      history.push(`/registeredvisits/${pageSize}/${index}`);
    }
  };

  const prevPage = () => {
    if (parseInt(pageIndex) > 0) {
      const index = parseInt(pageIndex) - 1;
      setPageIndex(index);
      history.push(`/registeredvisits/${pageSize}/${index}`);
    }
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
            {warning && (
              <tr>
                <td colSpan='6'>
                  <div style={{ textAlign:'center' }}>{warningMessage}</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='pagination-element'>
        <button onClick={prevPage}>&lt;</button>
        <button onClick={nextPage}>&gt;</button>
        <select onChange={handleSetPageSize} value={pageSize}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span>
          strona: {pageIndex * 1 + 1} z {Math.ceil(totalCount / pageSize)}
        </span>
      </div>
      {showModal && <VisitDetailsModal isDoctor={false} closeModal={() => setShowModal(false)} visit={visitDetails} cancelReservation={handleCancelReservation} />}
    </PatientRegisteredVisitComponent>
  );
};

export default PatientRegisteredVisitsPage;
