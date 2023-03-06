
const ImcDisplay = (props) => {
  
    const imc = (props.imc.poids / (props.imc.taille *props.imc.taille)).toFixed(2)

    let message = ""

    if(imc<18.5){
        message = "Insuffisance pondérale"
    } else if(imc>=18.5 && imc < 25){
        message = "Corpulence normale"
    } else if(imc>=25 && imc<30){
        message ="Surpoids"
    } else if(imc >= 30 && imc<35){
        message = "Obésité modérée"
    } else if(imc >=35 && imc<40){
        message = "Obésité sévère"
    } else {
        message = "Obésité morbide"
    }
  return (
    <>
    <div className="row d-flex justify-content-around  border border-primary rounded p-4 m-3">
        <div className="col-3">
            {`IMC : ${imc}`}
        </div>
        <div className="col-5">
            <p>
                {`Données entrées le : ${new Date(props.imc.id).toLocaleString()}`}
            </p>
        </div>
        <div className="col-4">
            <p>
                {`Vous êtes en ${message}`}
            </p>
        </div>
    </div>
    </>
    
  )
}

export default ImcDisplay