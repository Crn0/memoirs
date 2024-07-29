import { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import ThemeContext from "../../../context/themeContext";

export default function Footer() {
    const { theme } = useContext(ThemeContext);

    return (
        <footer className={`${theme}`}>
            Crn0
            <a href="https://github.com/Crn0/memoirs" target="_blank" rel="noopener noreferrer">
                <FaGithub />
            </a>
        </footer>
    );
};