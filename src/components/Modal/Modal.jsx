import './Modal.css';

function Modal({ children, className }) {
    return (
        <>
            <main className="container-modal">
                <section className={`square-modal ${className}`}>{children}</section>
            </main>
        </>
    );
}

export default Modal;
