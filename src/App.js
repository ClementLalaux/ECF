import { useState , useEffect } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/shared/Modal";
import SignForm from "./components/auth/signForm";
import { removeUser,signIn,signUp} from "./components/auth/authSlice";
import {  NavLink, Outlet, useNavigate} from "react-router-dom";

function App() {

  const [signFormMode, setSignFormMode] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSigningHandler = async (credentials) => {
    if (signFormMode === "Se connecter") {
      await dispatch(signIn(credentials));
    } else {
      await dispatch(signUp(credentials));
    }

    setSignFormMode("");
  };

    const returnToMenu = () => {
      dispatch(removeUser())
      navigate('/')
    }

  useEffect(()=> {
    dispatch(removeUser())
  },[dispatch])

  return (
    <div className="container">
      {signFormMode &&
        createPortal(
          <Modal title={signFormMode} onClose={()=>setSignFormMode("")}>
            <SignForm mode={signFormMode} onSubmit={onSigningHandler}/>
          </Modal>
          ,document.getElementById("modal-root"))
      }
      <header className="mb-4">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <NavLink className="nav-link" to={`/`}>
              e - IMC
            </NavLink>
            {user && <NavLink className="nav-link" to={`/formImc`}>Ajouter Info</NavLink>}
            <div className="collapse navbar-collapse" id="eRecipe-navbar">
              {user ? (
                <button
                  className="ms-auto btn btn-secondary"
                  onClick={() => returnToMenu()}
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <button
                    className="ms-auto btn btn-outline-info"
                    onClick={() => setSignFormMode("Se connecter")}
                  >
                    Se connecter
                  </button>
                  <button
                    className="ms-2 btn btn-primary"
                    onClick={() => setSignFormMode("S'inscrire")}
                  >
                    S'inscrire
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
