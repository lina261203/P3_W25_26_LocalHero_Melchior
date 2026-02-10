import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RoleSelectPage from "./pages/RoleSelectPage";
import SignUpPage from "./pages/SignUpPage";
import LetsGoPage from "./pages/LetsGoPage";
import WalkingPage from "./pages/WalkingPage";
import ExperienceSheetPage from "./pages/ExperienceSheetPage";
import LocalImpressionsPage from "./pages/LocalImpressionsPage";
import GalleryPage from "./pages/GalleryPage"; // <-- NEU (Step 2)
import CommentSectionPage from "./pages/CommentSectionPage";


const RoleContext = createContext(null);

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within <RoleProvider />");
  return ctx;
}

function RoleProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  const value = useMemo(() => ({ role, setRole }), [role]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

function RequireRole({ children }) {
  const { role } = useRole();
  if (!role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <RoleProvider>
      <Routes>
        <Route path="/" element={<RoleSelectPage />} />

        <Route
          path="/signup"
          element={
            <RequireRole>
              <SignUpPage />
            </RequireRole>
          }
        />

        <Route
          path="/letsgo"
          element={
            <RequireRole>
              <LetsGoPage />
            </RequireRole>
          }
        />

        <Route
          path="/walking"
          element={
            <RequireRole>
              <WalkingPage />
            </RequireRole>
          }
        />

        <Route
          path="/experience"
          element={
            <RequireRole>
              <ExperienceSheetPage />
            </RequireRole>
          }
        />

        <Route
          path="/gallery"
          element={
            <RequireRole>
              <GalleryPage />
            </RequireRole>
          }
        />

        <Route
          path="/impressions"
          element={
            <RequireRole>
              <LocalImpressionsPage />
            </RequireRole>
          }
        />

        <Route
          path="/impressions/:id"
          element={
           <RequireRole>
              <CommentSectionPage />
           </RequireRole>
           }
/>


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </RoleProvider>
  );
}
