import { useNavigate } from "react-router-dom";

const Header = () => {
        const navigate = useNavigate();
        const handlelogin = () => {
            navigate("/login");
        };
    return (
        <header className="header">
            <h1 className="logo">Portfolio</h1>
            <button className="btn" onClick={handlelogin}>
                Login
            </button>
        </header>
    );
};

export default Header;