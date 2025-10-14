import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  console.log(token) ; 
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}