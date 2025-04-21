"use client";

import { useAuth } from "../app/api/auth/authContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const guestPages = ["/", "/login", "/signup","/reset-password"];
  const authRestrictedPages = ["/login", "/signup"];

  useEffect(() => {
    if (!loading) {
      if (!user && !guestPages.includes(pathname)) {
        toast.error("Login first");
        router.push("/login");
      } else if (user && authRestrictedPages.includes(pathname)) {
        toast.success("Already logged in");
        router.push("/appointments");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) return <p>Loading...</p>;

  if (!user && !guestPages.includes(pathname)) return null;

  return (
    <div>
      {children}
    </div>
  );
};

export default LayoutContent;
