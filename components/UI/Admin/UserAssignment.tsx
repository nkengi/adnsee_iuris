"use client";
import { useState, useEffect, ChangeEvent } from "react";

type Users = {
  id: string;
  username: string;
  email: string;
  typeAccount: string;
  account_status: boolean;
  has_active_subscription: boolean;
  coalesce: string;
};

export default function UserAssignment() {
  const [users, setUsers] = useState<Users[]>([]);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [role, setRole] = useState<string>("specificUser");

  useEffect(() => {
    async function fetchUsers1() {
      try {
        const response = await fetch("/api/admin/users/listUsers");
        if (!response.ok) throw new Error("Failed to fetch users");
        
        const data = await response.json();
        if (data && data.allusers) {  // Ensure allusers is defined
          setUsers(data.allusers);
        } else {
          console.warn("Fetch User 1: No users found in response.");
        }
      } catch (error) {
        console.error("Error fetching users p1:", error);
      }
    }
    fetchUsers1();
  }, []);

  const handleAssignRole = async () => {
    try {
      const response = await fetch("/api/admin/users/assignRole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser?.id, role }),
      });
      if (!response.ok) throw new Error("Failed to assign role");
  
      // Re-fetch user data to reflect updated role in the UI
      await fetchUsers(); // Call the function to fetch all users again
      alert("Role assigned successfully");
    } catch (error) {
      alert("Error assigning role: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };
  
  // Modify fetchUsers to refresh users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users/listUsers");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.allusers);
      
      // Refresh the selected user to update their role in the UI
      if (selectedUser) {
        const updatedUser = data.allusers.find((user:Users) => user.id === selectedUser.id);
        setSelectedUser(updatedUser || null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  

  const toggleUserStatus = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`/api/admin/users/toggleStatus/${selectedUser.id}`, {
          method: "PATCH",
        });
        if (!response.ok) throw new Error("Failed to toggle user status");
        alert("User status updated successfully");
      } catch (error) {
        alert(`Error updating status: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  };

  const deleteUser = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`/api/admin/users/deleteUser/${selectedUser.id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete user");
        alert("User deleted successfully");
      } catch (error) {
        alert(`Error deleting user: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  };

  

  const handleUserSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10); // Convert to integer if IDs are stored as numbers

    console.log("Current users list:", users); // To check users being loaded

    const user = users.find((user) => Number(user.id) === selectedId); // Compare IDs as numbers

    setSelectedUser(user || null); // Set user or null
    console.log("Selected user:", user); // Check if user is found
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg text-black">
      <h2 className="text-xl font-semibold mb-4">Assign Roles to Users</h2>

      <select
        onChange={handleUserSelect}
        value={selectedUser?.id || ""}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username} - current role: {user.coalesce || "none"}
          </option>
        ))}
      </select>

      {selectedUser && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">User Info:</h3>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Account Type:</strong> {selectedUser.typeAccount}</p>
          <p><strong>Status:</strong> {selectedUser.account_status ? "Active" : "Inactive"}</p>
          <p><strong>Subscription:</strong> {selectedUser.has_active_subscription ? "Yes" : "No"}</p>
          <p><strong>Current Role:</strong> {selectedUser.coalesce ? selectedUser.coalesce : "none"}</p>
        </div>
      )}

      <select
        onChange={(e) => setRole(e.target.value)}
        value={role}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="none">None</option>
        <option value="Admin">Admin</option>
        <option value="ContentManager">Content Management</option>
        <option value="UserManager">Users Manager</option>
      </select>

      <div className="space-y-2">
        <button
          onClick={handleAssignRole}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Assign Role
        </button>
        <button
          onClick={toggleUserStatus}
          className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          {selectedUser?.account_status ? "Deactivate" : "Activate"}
        </button>
        <button
          onClick={deleteUser}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div className="mt-4">
        <p>listing facturation current User</p>
        <p>listing facturation Users</p>
      </div>
    </div>
  );
}
