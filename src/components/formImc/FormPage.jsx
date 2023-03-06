import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Modal from "../shared/Modal"
import FormImc from "./FormImc"
import { addImc, fetchImc } from "./formImcSlice"
import ImcDisplay from "./ImcDisplay"

const FormPage = () => {

    const [sortingType,setSortingType] = useState('')

    const dispatch = useDispatch()
    const idUser = localStorage.getItem('token')
    const mailUser = useSelector(state => state.auth.user.email)
    const imc = useSelector(state => state.formImc.imc)
    const tmp = []
    for (const m of imc) {
        if(m.idUser === mailUser){
            tmp.push(m);
        }
    }
    const [formImcMode,setFormImcMode] = useState('')
    
    const onAdd = async (imc) => {
        console.log(mailUser)
            await dispatch(addImc({idUser: mailUser,...imc}));
            setFormImcMode("");
    }

    useEffect(() => {
        dispatch(fetchImc()); 
    }, [dispatch])

    const sortImc = () => {
        switch(sortingType){
            case "asc" :
                return [...tmp].sort((a,b) => a.id-b.id)
                
                
            case "desc" :
                return [...tmp].sort((a,b) => b.id-a.id)
            default :
                return tmp
        }
    }

    return(
        <>
            {formImcMode && createPortal(<Modal onClose={()=>setFormImcMode("")}>
                <FormImc onAdd={onAdd}/>
            </Modal>,document.getElementById("modal-root"))}
            {!idUser && <Navigate to="/"/>}
            <div className="row mb-4">
                <h3 className="mb-3">Les dernières valeurs entrées</h3>
                {tmp.length === 0 ?
                <p>Il n'y a pas de données</p> : 
                sortImc().map((e,i )=> <ImcDisplay key={i} imc={e}/>)}
            </div>
            <div className="row ">
            <label htmlFor="albumSorting" className="form-label m-0 ms-auto me-2">trier par </label>
            <select id="albumSorting" className="form-select w-25 " value={sortingType} onChange={(e) => setSortingType(e.target.value)}>
                <option value="">Sélectionnez un tri</option>
                <option value="asc">Date récente</option>
                <option value="desc">Date ancienne</option>
            </select>
            <button className="m-auto btn btn-outline-info w-25" onClick={() => setFormImcMode("Sign Up")}>Ajouter une valeur</button>
            </div>
            
        </>
    )
}

export default FormPage