import { useState } from "react";
import { TabsContext } from "./TabsContext";

export const TabProvider = ({ children }) => {
    const [selectValue, setSelectValue] = useState("");
    const [isDisableTabs, setIsDisableTabs] = useState(true);




    const toggleDisableTabs = () => {
        !selectValue ? setIsDisableTabs(true) : setIsDisableTabs(false)
    }



    const value = {
        selectValue,
        setSelectValue,
        isDisableTabs,
        setIsDisableTabs,
        toggleDisableTabs
    }
    return (
        <TabsContext.Provider value={value}>
            {children}
        </TabsContext.Provider>
    )
}