// roles.jsx
import { FaUsers, FaUserClock } from "react-icons/fa";
import { FaChalkboardUser, FaUserShield } from "react-icons/fa6";

export const roles = [
  { label: "Participantes", value: "participantes", icon: <FaUsers /> },
  { label: "Staff", value: "staff", icon: <FaUserShield /> },
  { label: "Instructoras", value: "instructoras", icon: <FaChalkboardUser /> },
  { label: "Facilitadoras", value: "facilitadoras", icon: <FaUserClock /> },
];