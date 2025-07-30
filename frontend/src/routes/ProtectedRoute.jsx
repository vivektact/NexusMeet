import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { meApi } from "../lib/api";

export default function ProtectedRoute() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: meApi,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/login" replace />;

  return <Outlet context={{ user: data.data.user }} />;
}
