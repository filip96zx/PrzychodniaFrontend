import React, { useEffect, useState } from 'react';
import { Spinner } from '../../components/styles/spinner.style';
import userService from '../../services/user.service';
import { useParams, useHistory } from 'react-router-dom';
import UserEditModal from '../../components/userEditModal';
import handleResponse from '../../helpers/handle-response';
import { UserListComponent } from './style/UserListPage.style';

const spinnerDiv = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
};

const UserListPage = () => {
  const params = useParams();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [pageIndex, setPageIndex] = useState(Number.isInteger(params.pageIndex * 1) ? params.pageIndex * 1 : 0);
  const [pageSize, setPageSize] = useState(Number.isInteger(params.pageSize * 1) ? params.pageSize * 1 : 5);
  const [totalCount, setTotalCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [countries, setCountries] = useState();
  const [roles, setRoles] = useState();
  const [reloadUsers, setReloadUsers] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [specialisations, setSpecialisations] = useState([]);
  const [removableSpecialisations, setRemovableSpecialisations] = useState([]);
  const [specialisationToDelete, setSpecialisationToDelete] = useState('');
  const [specialisationToAdd, setSpecialisationToAdd] = useState('');

  useEffect(() => {
    getCountries();
    loadSpecialisations();
    loadRemovableSpecialisations();
    userService.getRoles().then((response) => setRoles(response.value)).catch(err =>err);
  }, []);

  useEffect(() => {
    if (searchString !== '') {
      userService
        .getUserListPaginatedFiltered(pageIndex, pageSize, searchString)
        .then((response) => {
          loadUsers(response);
          if (response.pageIndex + 1 > Math.ceil(response.totalCount / response.pageSize)) setPageIndex(0);
          setTotalCount(response.totalCount);
          setIsLoading(false);
        })
        .catch(err => err);
    } else {
      userService
        .getUserListPaginated(pageIndex, pageSize)
        .then((response) => {
          loadUsers(response);
          setTotalCount(response.totalCount);
          setIsLoading(false);
        })
        .catch(err=> err);
    }
  }, [pageIndex, pageSize, reloadUsers, searchString]);

  useEffect(() => {
    setPageIndex(params.pageIndex ? params.pageIndex * 1 : 0);
    setPageSize(params.pageSize ? params.pageSize * 1 : 5);
  }, [params.pageIndex, params.pageSize]);

  const loadUsers = (response) => {
    const userList = response.item.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.surname}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.roles ? user.roles.map((role) => role + ' ') : ''}</td>
        <td>
          <button onClick={() => handleEditUser(user.id)}>edytuj</button>
        </td>
      </tr>
    ));
    setUsers(userList);
  };

  const handleSetPageSize = (e) => {
    setPageSize(e.target.value);
    setPageIndex(0);
    history.push(`/userlist/${e.target.value}/${0}`);
  };

  const nextPage = () => {
    if (parseInt(pageIndex) + 1 < Math.ceil(totalCount / pageSize)) {
      const index = parseInt(pageIndex) + 1;
      setPageIndex(index);
      history.push(`/userlist/${pageSize}/${index}`);
    }
  };

  const prevPage = () => {
    if (parseInt(pageIndex) > 0) {
      const index = parseInt(pageIndex) - 1;
      setPageIndex(index);
      history.push(`/userlist/${pageSize}/${index}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditUser = (id) => {
    userService.getUserById(id).then((response) => {
      setUserData({ id: id, ...response });
      setShowModal(true);
    });
  };

  const getCountries = () => {
    const countries = [''];
    fetch('https://restcountries.eu/rest/v2/all', { method: 'GET' })
      .then(handleResponse)
      .then((country) => {
        country.map((country) => countries.push(country.name));
        setCountries(countries);
      });
  };

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };

  const loadSpecialisations = () => {
    userService.getSpecialisations().then(response => {
      setSpecialisations(response.value);
    }
      ).catch(err => err);
  }

  const loadRemovableSpecialisations = () => {
    userService.getRemovableSpecialisations().then(response => {
      setRemovableSpecialisations(response.value);
    }
      ).catch(err => err);
  }

  const handleAddSpecialisation = () => {
    if(specialisationToAdd !== ''){
      const data = {roleName: specialisationToAdd}
      userService.addSpecialisation(data).then(reponse => {
        loadSpecialisations();
        loadRemovableSpecialisations();
      }).catch(err => err)
    }
  }
  const handleDeleteSpecialisation = () => {
    if(specialisationToDelete !== ''){
      const data = {roleName: specialisationToDelete}
      userService.deleteSpecialisation(data).then(reponse => {
        loadSpecialisations();
        loadRemovableSpecialisations();
      }).catch(err => err)
    }
  }

  return (
    <UserListComponent>
      <div className='search-element'>
        <input type='text' onChange={handleSearch} placeholder='szukaj' />
      </div>
      <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Email</th>
            <th>Numer Telefonu</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan='6'>
                <div style={spinnerDiv}>
                  <Spinner color='gray' backgroundColor='white' />
                </div>
              </td>
            </tr>
          )}
          {users ? users : null}
        </tbody>
      </table>
      <div className='pagination-element'>
        <button onClick={prevPage}>&lt;</button>
        <button onClick={nextPage}>&gt;</button>
        <select onChange={handleSetPageSize} value={pageSize}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span>
          strona: {pageIndex * 1 + 1} z {Math.ceil(totalCount / pageSize)}
        </span>
      </div>
      </div>
      <div className="role-manage-box">
        <div><strong>lista specjalizacji</strong></div>
        <div>{specialisations.map(x => x + ' ')}</div>
        <label >
          Dodaj specjalizację: <input type="text" value={specialisationToAdd} onChange={(e)=>setSpecialisationToAdd(e.target.value)}/>
        </label>
            <button onClick={handleAddSpecialisation}>dodaj</button>
        <label >
          Usuń specjalizację: 
          <select value={specialisationToDelete} onChange={(e)=>setSpecialisationToDelete(e.target.value)}>
            <option value={''}> </option>
            {removableSpecialisations.map(spec =>
              <option key={spec} value={spec}>{spec}</option>
              )}
          </select>
        </label>
        <button onClick={handleDeleteSpecialisation}>usuń</button>
      </div>
      {showModal && <UserEditModal closeModal={handleCloseModal} countries={countries} user={userData} roles={roles} reload={reloadUsers} reloadUsers={setReloadUsers} />}
    </UserListComponent>
  );
};

export default UserListPage;
