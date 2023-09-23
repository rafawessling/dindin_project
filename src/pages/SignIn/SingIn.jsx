import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Button from '../../components/Button/Button';
import FormLogin from '../../components/FormLogin/FormLogin';

import './SignIn.css';

function SignIn() {
    return (
        <main className="container-signin">
            <section className="container-main-signin">
                <img
                    className="logo"
                    src={Logo}
                    alt="Logo with the outline of a hexagon with a white line inside and a dark blue line outside, accompanied by the word Dindin"
                />
                <section className="container-section">
                    <div className="container-texts">
                        <h2>
                            Control your <span className="word-highlight">finances</span> without a boring spreadsheet.
                        </h2>
                        <p>
                            Organizing your finances has never been easier. With DINDIN, you have everything in one
                            place and just a click away.
                        </p>
                        <Link to="/register">
                            <Button type="button" className="btn-redirect">
                                Register
                            </Button>
                        </Link>
                    </div>
                    <FormLogin className="form-login" />
                </section>
            </section>
        </main>
    );
}

export default SignIn;
