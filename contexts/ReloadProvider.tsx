import { createContext, useState, Dispatch, SetStateAction } from "react";

interface ReloadContextType {
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
}

export const ReloadContext = createContext<ReloadContextType | null>(null);


export const ReloadContextProvider = ({ children }: any) => {
    const [reload, setReload] = useState(false);

    return (
        <ReloadContext.Provider value={{ reload, setReload }}>
            { children }
        </ReloadContext.Provider>
    )
}
