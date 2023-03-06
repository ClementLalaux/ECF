import { useRef } from "react";
import { useSelector } from "react-redux";

const FormImc = (props) => {

    const mode = props.mode

    const user = useSelector((state) => state.auth.user);

    const poidsRef = useRef();
    const tailleRef = useRef();

    const submitFormHandler = (event) => {
        event.preventDefault()

        const poids = poidsRef.current.value
        const taille = tailleRef.current.value
        const id = Date.now();

        const nouveauImc = {
            id,
            poids,
            taille
        }

        poidsRef.current.value = ""
        tailleRef.current.value = ""
        props.onAdd(nouveauImc)
    }

    return (
        <>
        <h3 className="mb-3">Ajouter des valeurs</h3>
        <form onSubmit={submitFormHandler}>
            <div className="mb-3">
                <label htmlFor="poids" className="form-label">Poids (en kg)</label>
                <input type="number" className="form-control" id="poids" ref={poidsRef}/>
            </div>
            <div className="mb-3">
                <label htmlFor="taille" className="form-label">Taille (en m)</label>
                <input type="number" className="form-control" id="taille" step="0.01" ref={tailleRef}/>
            </div>
            <button type="submit" className="btn btn-primary">Ajouter</button>
        </form>
        </>
    )
}

export default FormImc