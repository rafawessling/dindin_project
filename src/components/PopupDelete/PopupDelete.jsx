import TrianglePopup from '../../assets/triangle-popup.png';
import './PopupDelete.css';

function PopupDelete({ onConfirm, onCancel }) {
    return (
        <section className="container-popup">
            <img className="triangle-popup" src={TrianglePopup} alt="Light-blue triangle" />
            <section className="content-popup">
                <span className="text-popup">Delete item?</span>
                <div>
                    <button className="btn-popup btn-yes" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="btn-popup btn-no" onClick={onCancel}>
                        No
                    </button>
                </div>
            </section>
        </section>
    );
}

export default PopupDelete;
