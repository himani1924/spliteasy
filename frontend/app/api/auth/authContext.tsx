"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // login
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUser(res.data.user);
        toast.success("Login successful");
        router.push("/appointments");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response);
        toast.error(error.response.data);
      }
      router.push("/login");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
