/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

import UserList from './UserList';

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allConfig, setAllConfig] = useState([]);
  const [changeUser, setChangeUser] = useState(false);

  const getAllUsers = async () => {
    try {
      const response = await fetch('http://eleos-api.scottishtecharmy.org/users', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setAllUsers(parseRes);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  const getAllConfig = async () => {
    try {
      const response = await fetch('http://eleos-api.scottishtecharmy.org/targetconfig', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const configs = await response.json();

      setAllConfig(configs);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllUsers();
    setChangeUser(false);
  }, [changeUser]);

  useEffect(() => {
    getAllConfig();
  }, []);

  return (
    <>
      <UserList
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        allConfig={allConfig}
        setChangeUser={setChangeUser}
      />
    </>
  );
};

export default Admin;
