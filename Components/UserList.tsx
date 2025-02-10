"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  company: string;
  username: string;
  email: string;
  state: string;
  photo: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("https://fake-json-api.mock.beeceptor.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl text-center p-4 font-bold">People List</h1>
        <div className="grid gap-4 max-w-4xl mx-auto">
          {users
            .filter((user) => user.id !== 2)
            .map((user) => (
              <div
                key={user.id}
                className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedUser(user)}
              >
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.company}</p>
              </div>
            ))}
        </div>

        {selectedUser && (
          <div onClick={() => setSelectedUser(null)} 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute  top-4 right-4 text-gray-500 hover:text-gray-800">
                ✕
              </button>
              <Image
                width={96}
                height={96}
                src={selectedUser.photo}
                alt={selectedUser.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-center">
                {selectedUser.name}
              </h2>
              <p className="text-center text-gray-700">{selectedUser.email}</p>
              <p className="text-center text-gray-700">{selectedUser.state}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
