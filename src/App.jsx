import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./index.css";
import "./App.css";

const App = () => {
    const [users, setUsers] = useState([]);
    const [buttonState, setButtonState] = useState("add");

    const [userInfo, setUserInfo] = useState({
        id: uuid(),
        name: "",
        age: "",
        email: "",
        contact: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((currInfo) => {
            return {
                ...currInfo,
                [name]: value,
            };
        });
    };

    const addUser = () => {
        if (
            !userInfo.name.trim() ||
            !userInfo.age ||
            !userInfo.email.trim() ||
            !userInfo.contact.trim()
        ) {
            alert("Please enter all fields");
            return;
        }
        setUsers((currentUsers) => [...currentUsers, userInfo]); // currentusers + new user
        setUserInfo({
            id: uuid(),
            name: "",
            age: "",
            email: "",
            contact: "",
        });
    };

    const deleteUser = (id) => {
        // filter the user with given id
        setUsers((currentUsers) => {
            return currentUsers.filter((user) => {
                return user.id !== id;
            });
        });
    };

    //get the user info for editing
    const isEditing = (user) => {
        setUserInfo(user);
        setButtonState("edit");
    };

    const cancelEdit = () => {
        setUserInfo({
            id: uuid(),
            name: "",
            age: "",
            email: "",
            contact: "",
        });
        setButtonState("add");
    };

    const updateUser = () => {
        setUsers((currentUsers) => {
            return currentUsers.map((user) => {
                if (user.id === userInfo.id) {
                    return userInfo;
                }
                return user;
            });
        });
        cancelEdit();
    };

    const clearUsers = () => {
        setUsers([]);
        setUserInfo({
            id: uuid(),
            name: "",
            age: "",
            email: "",
            contact: "",
        });
    };

    return (
        <div className="userContainer flex flex-col items-center m-10">
            <div className="userform">
                <h1 className="font-bold text-center text-3xl m-4 p-4">
                    USER FORM
                </h1>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={userInfo.name}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter your age"
                        value={userInfo.age}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <input
                        type="tel"
                        name="contact"
                        placeholder="Enter your mobile number"
                        value={userInfo.contact}
                        onChange={handleChange}
                    />
                    {buttonState === "add" ? (
                        <div className="flex justify-center gap-5 m-4">
                            <button
                                type="button"
                                onClick={() => addUser()}
                                className="bg-green-600 rounded text-white p-2 w-20"
                            >
                                <i class="fa-regular fa-plus"></i> Add
                            </button>
                            <button
                                type="button"
                                onClick={() => clearUsers()}
                                className="bg-red-600 rounded text-white p-2 w-20"
                            >
                                <i class="fa-solid fa-x"></i> Clear
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center m-5 gap-10">
                            <button
                                type="button"
                                onClick={() => updateUser()}
                                className="bg-green-600 rounded text-white p-2 w-fit"
                            >
                                <i class="fa-solid fa-square-plus"></i> Update
                            </button>
                            <button
                                type="button"
                                onClick={() => cancelEdit()}
                                className="bg-red-600 rounded text-white p-2 w-fit"
                            >
                                <i class="fa-solid fa-ban"></i> Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>

            <div className="userTable">
                {users.length == 0 ? (
                    <table>
                        <tr className="border border-2 border-red-500 w-100 rounded text-center text-lg">
                            <td
                                className="text-red-600 w-100 border border-2 border-red-500 rounded bg-pink-200"
                                colSpan="5"
                            >
                                No users found!
                            </td>
                        </tr>
                    </table>
                ) : (
                    <div>
                        <h1 className="text-3xl text-center font-bold m-6">
                            Users List
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.age}</td>
                                            <td>{user.email}</td>
                                            <td>{user.contact}</td>
                                            <td className="button-container">
                                                <div className="flex justify-center gap-5">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            isEditing(user);
                                                        }}
                                                        className="bg-yellow-500 p-1 w-20 rounded"
                                                    >
                                                        <i class="fa-regular fa-pen-to-square"></i>{" "}
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            deleteUser(user.id);
                                                        }}
                                                        className="bg-red-500 p-1 w-20 rounded text-white"
                                                    >
                                                        <i class="fa-solid fa-trash"></i>{" "}
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
