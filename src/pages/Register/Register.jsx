import Logo from '../../assets/logo.png';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './Register.css';

function Register() {
    return (
        <main className="container-register">
            <section className="container-main-register">
                <img
                    className="logo"
                    src={Logo}
                    alt="Logo with the outline of a hexagon with a white line inside and a dark blue line outside, accompanied by the word Dindin"
                />
                <RegisterForm className="form-register" />
            </section>
        </main>
    );
}

export default Register;
