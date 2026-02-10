import { NavLink } from "react-router-dom";
import {
  User,
  Home,
  Footprints,
  ClipboardList,
  MapPin
} from "lucide-react";
import "../styles/components/BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="bottomNav" aria-label="Bottom Navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `bottomNavItem ${isActive ? "active" : ""}`
        }
      >
        <User size={22} />
        <span>Role</span>
      </NavLink>

      <NavLink
        to="/signup"
        className={({ isActive }) =>
          `bottomNavItem ${isActive ? "active" : ""}`
        }
      >
        <Home size={22} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/walking"
        className={({ isActive }) =>
          `bottomNavItem ${isActive ? "active" : ""}`
        }
      >
        <Footprints size={22} />
        <span>Walk</span>
      </NavLink>

      <NavLink
        to="/experience"
        className={({ isActive }) =>
          `bottomNavItem ${isActive ? "active" : ""}`
        }
      >
        <ClipboardList size={22} />
        <span>Sheet</span>
      </NavLink>

      <NavLink
        to="/impressions"
        className={({ isActive }) =>
          `bottomNavItem ${isActive ? "active" : ""}`
        }
      >
        <MapPin size={22} />
        <span>Local</span>
      </NavLink>
    </nav>
  );
}
