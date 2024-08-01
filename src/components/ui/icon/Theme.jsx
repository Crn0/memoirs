import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useContext } from "react";
import ThemeContext from "../../../context/themeContext";

export default function ThemeIcon() {
    const { theme } = useContext(ThemeContext);

    return theme === 'dark' ? <MdDarkMode /> : <CiLight />
}