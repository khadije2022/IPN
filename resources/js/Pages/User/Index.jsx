import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { useState } from "react";
import Model from "@/Components/Model"; // Assume you have a Modal component
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Index({ auth, users, queryParams = {}, success }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentUser, setCurrentUser] = useState(null);

  const { data, setData, post, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: ""
  });

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setCurrentUser(user);

    if (user) {
      setData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "",
        password_confirmation: "",
        _method: "PUT"
      });
    } else {
      reset();
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      post(route("user.store"));
    } else {
      post(route("user.update", currentUser.id));
    }
    closeModal();
  };

  const searchFieldChanged = (name, value) => {
    queryParams = { ...queryParams };
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key === "Enter") {
      searchFieldChanged(name, e.target.value);
    }
  };

  const sortChanged = (name) => {
    queryParams = { ...queryParams };
    if (queryParams.sort_field === name) {
      queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      router.delete(route("user.destroy", user.id));
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Users
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={() => openModal('add')}
                  className="bg-blue-500 py-2 px-4 flex items-center text-white rounded shadow transition-all hover:bg-blue-600 w-full sm:w-auto"
                >
                  <PlusIcon className="h-5 w-5 mr-2" /> Ajouter
                </button>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field || ""}
                        sort_direction={queryParams.sort_direction || ""}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field || ""}
                        sort_direction={queryParams.sort_direction || ""}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>
                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field || ""}
                        sort_direction={queryParams.sort_direction || ""}
                        sortChanged={sortChanged}
                      >
                        Email
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field || ""}
                        sort_direction={queryParams.sort_direction || ""}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>
                      <th className="px-3 py-3 text-right">Role</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name || ""}
                          placeholder="User Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.email || ""}
                          placeholder="User Email"
                          onBlur={(e) =>
                            searchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={user.id}
                      >
                        <td className="px-3 py-2">{user.id}</td>
                        <th className="px-3 py-2 text-gray-100 text-nowrap">
                          {user.name}
                        </th>
                        <td className="px-3 py-2">{user.email}</td>
                        <td className="px-3 py-2 text-nowrap">
                          {user.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {user.role}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <button
                            onClick={() => openModal('edit', user)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Model isOpen={isModalOpen} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div className="mt-4">
              <InputLabel htmlFor="user_name" value="User Name" />
              <TextInput
                id="user_name"
                type="text"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="user_email" value="User Email" />
              <TextInput
                id="user_email"
                type="text"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                onChange={(e) => setData("email", e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="user_password" value="Password" />
              <TextInput
                id="user_password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                onChange={(e) => setData("password", e.target.value)}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="user_role" value="Role" />
              <select
                id="user_role"
                name="role"
                value={data.role}
                className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-300"
                onChange={(e) => setData("role", e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="service">Services</option>
              </select>
              <InputError message={errors.role} className="mt-2" />
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
              >
                Cancel
              </button>
              <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                Submit
              </button>
            </div>
          </form>
        </Model>
      )}
    </AuthenticatedLayout>
  );
}
