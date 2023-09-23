import { useNavigate } from 'react-router-dom';
import { getItem, removeItem } from '../../utils/storage';
import IconLogout from '../../assets/icon-logout.png';
import IconUser from '../../assets/icon-user.png';
import Logo from '../../assets/logo.png';
import './Header.css';

function Header({ setEditUser }) {
    const userName = getItem('name');

    const navigate = useNavigate();

    const handleLogOut = () => {
        removeItem('token');
        navigate('/');
    };

    return (
        <section className="container-header">
            <section className="container-header-content">
                <img
                    className="logo"
                    src={Logo}
                    alt="Logo with the outline of a hexagon with a white line inside and a dark blue line outside, accompanied by the word Dindin"
                />
                <div className="container-user">
                    <img
                        className="icon-user"
                        src={IconUser}
                        alt="Icon with a circle and a user inside with white outlines"
                        onClick={() => setEditUser(true)}
                    />
                    <strong className="user-name">{userName}</strong>
                    <img
                        className="icon-logout"
                        src={IconLogout}
                        alt="Logout icon with a door and an arrow to the right, symbolizing exit"
                        onClick={handleLogOut}
                    />
                </div>
            </section>
        </section>
    );
}

export default Header;
