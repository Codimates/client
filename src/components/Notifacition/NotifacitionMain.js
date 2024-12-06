import React, { useState } from "react";
import Notification from "./Notification";

export default function App() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      { id, type, message },
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notification Example</h1>
      <div className="space-x-2">
        <button
          onClick={() => addNotification("success", "Operation Successful!")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Show Success
        </button>
        <button
          onClick={() => addNotification("error", "An Error Occurred!")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Show Error
        </button>
        <button
          onClick={() => addNotification("info", "Here’s some information!")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show Info
        </button>
      </div>

      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          type={notif.type}
          message={notif.message}
          onClose={() => removeNotification(notif.id)}
        />
      ))}
    </div>
  );
}
