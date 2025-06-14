// hooks/useUserForm.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserFormData = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export const useUserForm = (id?: number) => {
  const router = useRouter();
  const [form, setForm] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    role: "technician",
  });

  const [loading, setLoading] = useState(!!id); // only load if editing
  const [notFound, setNotFound] = useState(false);

  // Fetch user data if editing
  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data) => {
          setForm({
            username: data.username || "",
            email: data.email || "",
            password: "",
            role: data.role || "technician",
          });
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setNotFound(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(id ? `/api/users/${id}` : "/api/users", {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(id ? "Failed to update user" : "Failed to create user");
      }

      alert(id ? "User updated successfully!" : "User created!");
      router.push("/internal/admin/users");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong.");
    }
  };

  return { form, handleChange, handleSubmit, loading, notFound };
};
