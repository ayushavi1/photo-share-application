import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Max',
      image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
