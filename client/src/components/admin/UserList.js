/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import MaterialTable from 'material-table';

import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

// eslint-disable-next-line import/extensions
import tableIcons from '../../styles/TableIcons.js';
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';

const UserList = ({ allUsers, setChangeUser, allConfig }) => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [selectUser, setSelectUser] = useState({});

  const columns = [
    { title: 'Organisation Name', field: 'name' },
    { title: 'Subdomain', field: 'subdomain' },
    { title: 'Target Configuration', field: 'description' },
    { title: 'Email', field: 'admin_email' },
    { title: 'Admin First Name', field: 'admin_firstname' },
    { title: 'Admin Last Name', field: 'admin_lastname' },
    { title: 'Active', field: 'active' },
  ];

  const handleAddUser = () => {
    setIsAddingUser(true);
  };

  const handleEditUser = (event, rowData) => {
    const { tableData, ...userData } = rowData;
    setSelectUser(userData);
    setIsEditingUser(true);
  };

  const handleDeleteUser = (event, rowData) => {
    setSelectUser(rowData);
    setIsDeletingUser(true);
  };

  const actions = [
    {
      icon: () => <AddIcon />,
      tooltip: 'Add Organisation',
      isFreeAction: true,
      onClick: () => handleAddUser(),
    },
    {
      icon: () => <EditIcon />,
      tooltip: 'Edit Organisation',
      onClick: (event, rowData) => handleEditUser(event, rowData),
    },
    {
      icon: () => <DeleteIcon />,
      tooltip: 'Delete Organisation',
      onClick: (event, rowData) => handleDeleteUser(event, rowData),
    },
  ];

  return (
    <>
      <MaterialTable
        title='All Organisations'
        columns={columns}
        data={allUsers}
        actions={actions}
        options={{ search: false }}
        icons={tableIcons}
      />
      <AddUserDialog
        setChangeUser={setChangeUser}
        isAddingUser={isAddingUser}
        setIsAddingUser={setIsAddingUser}
        allConfig={allConfig}
      />
      <EditUserDialog
        setChangeUser={setChangeUser}
        isEditingUser={isEditingUser}
        setIsEditingUser={setIsEditingUser}
        selectUser={selectUser}
        allConfig={allConfig}
      />
      <DeleteUserDialog
        setChangeUser={setChangeUser}
        isDeletingUser={isDeletingUser}
        setIsDeletingUser={setIsDeletingUser}
        user_id={selectUser.user_id}
      />
    </>
  );
};

export default UserList;
