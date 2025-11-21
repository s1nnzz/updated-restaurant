import { createContext, useContext, type Accessor } from "solid-js";

interface AuthContextType {
	authenticated: Accessor<boolean>;
	loading: Accessor<boolean>;
	reload: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	authenticated: () => false,
	loading: () => true,
	reload: () => {},
});

export const useAuth = () => useContext(AuthContext);
