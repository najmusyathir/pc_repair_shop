// src/hooks/useUsers.ts
import { useEffect, useState, useCallback } from "react";
import { fetchUsers, deleteUser, User } from "@/lib/endpointUser";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = useCallback(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await deleteUser(id);
      alert("User deleted successfully.");
      loadUsers(); // refresh the list
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    reload: loadUsers,
    handleDelete,
  };
};
