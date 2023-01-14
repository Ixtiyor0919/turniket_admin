import { useContext } from "react";
import { DataContext } from "../Context/DataContext";

export function useData() {
    return useContext(DataContext);
}
