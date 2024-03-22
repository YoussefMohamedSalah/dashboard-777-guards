import { createContext, useContext, useState } from "react";
import { Session } from "types/Session";

interface AuthContextValue {
  session: any;
  setSession: (session: any) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  setSession: () => { },
});

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
