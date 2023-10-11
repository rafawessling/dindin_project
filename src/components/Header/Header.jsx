import { useNavigate } from 'react-router-dom';
import { getItem, removeItem } from '../../utils/storage';
import IconLogout from '../../assets/icon-logout.png';
import IconUser from '../../assets/icon-user.png';
import Logo from '../../assets/logo.png';
import IconMenu from '../../assets/icon-menu.svg';
import './Header.css';
import { useState } from 'react';
import Menu from '../Menu/Menu.jsx';

function Header({ setEditUser }) {
    const [showMenu, setShowMenu] = useState(false);
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
                <div className="container-menu-user">
                    <img
                        src={IconMenu}
                        alt="Icon with three white horizontal bars aligned and equally spaced"
                        onClick={() => setShowMenu(!showMenu)}
                    />
                </div>
                {showMenu && (
                    <Menu
                        setShowMenu={setShowMenu}
                        userName={userName}
                        setEditUser={setEditUser}
                        handleLogOut={handleLogOut}
                    />
                )}
            </section>
        </section>
    );
}

export default Header;
