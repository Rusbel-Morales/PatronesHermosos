import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [username, setUsername] = useState(null);

	const value = {
		token,
		setToken,
		username,
		setUsername
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth};