import './Menu.css';

function Menu({ setShowMenu, userName, setEditUser, handleLogOut }) {
    const handleEditUser = () => {
        setEditUser(true);
        setShowMenu(false);
    };

    return (
        <section className="container-menu">
            <ul className="options-menu">
                <li className="user-name-menu">{userName}</li>
                <li className="menu-option" onClick={handleEditUser}>
                    Edit user
                </li>
                <li className="menu-option" onClick={handleLogOut}>
                    Log out
                </li>
            </ul>
        </section>
    );
}

export default Menu;
