import React, { useState } from "react";
import Swal from "sweetalert2";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [accounts, setAccounts] = useState([
    { username: "Mainacct", password: "Hpioweql90@", balance: 3467987.9 },
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const found = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );
    if (found) {
      setIsLoggedIn(true);
      setCurrentUser(found);
      setUsername("");
      setPassword("");
    } else {
      Swal.fire("Error", "Invalid username or password!", "error");
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const exists = accounts.some((acc) => acc.username === username);
    if (exists) {
      Swal.fire("Error", "Username already exists!", "error");
      return;
    }

    const transferAmount = 500000; // Amount to transfer to new user
    const main = accounts[0];

    if (main.balance < transferAmount) {
      Swal.fire("Error", "Not enough balance in main account.", "error");
      return;
    }

    const newUser = {
      username,
      password,
      balance: transferAmount,
    };

    const updatedAccounts = [
      { ...main, balance: main.balance - transferAmount },
      ...accounts.slice(1),
      newUser,
    ];

    setAccounts(updatedAccounts);
    Swal.fire("Success", "Account created! You can now log in.", "success");

    setIsCreatingAccount(false);
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        {isLoggedIn && currentUser ? (
          <div>
            <h1 className="text-4xl font-bold">Welcome, {currentUser.username}!</h1>
            <p className="mt-4 text-2xl">
              Balance: <strong>${currentUser.balance.toLocaleString()}</strong>
            </p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6">
              {isCreatingAccount ? "Create Account" : "Crypto Investment Login"}
            </h1>

            <form
              onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin}
              className="space-y-4"
            >
              <div>
                <label className="block text-left text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                {isCreatingAccount ? "Create Account" : "Log In"}
              </button>
            </form>

            <div className="mt-4">
              {isCreatingAccount ? (
                <button
                  onClick={() => setIsCreatingAccount(false)}
                  className="text-sm text-indigo-400 hover:underline"
                >
                  Already have an account? Log in
                </button>
              ) : (
                <button
                  onClick={() => setIsCreatingAccount(true)}
                  className="text-sm text-indigo-400 hover:underline"
                >
                  Create new account
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
