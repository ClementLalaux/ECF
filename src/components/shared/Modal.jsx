import classes from './Modal.module.css'

const Modal = (props) => {

    const backgroundClickHandler = (event) => {
        if (event.currentTarget === event.target) {
            props.onClose()
        }
    }

    return (
        <div className={classes.modal} onClick={backgroundClickHandler}>
            <div className={classes.modalContent}>
                <div className="d-flex justify-content-between">
                    <h3>{props.title}</h3>
                    <button className="btn btn-outline-dark rounded-circle" onClick={props.onClose}><i className="bi bi-x"></i></button>
                </div>
                <hr />
                {props.children}
            </div>
        </div>
    )
}

export default Modal