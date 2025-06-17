// src/hooks/useUserForm.ts
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type UserFormData = {
  username: string;
  email: string;
  password: string;
  role: string;
};

const defaultForm: UserFormData = {
  username: "",
  email: "",
  password: "",
  role: "technician",
};

export const useUserForm = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : undefined;

  const [form, setForm] = useState<UserFormData>(defaultForm);
  const [loading, setLoading] = useState(!!id);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

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

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    notFound,
  };
};
