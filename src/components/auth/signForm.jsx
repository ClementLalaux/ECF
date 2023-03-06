import { useRef } from "react"

const SignForm = (props) => {
    
    const mode = props.mode

    const emailRef = useRef();
    const passwordRef = useRef();

    const submitFormHandler = (event) => {
        event.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        const credentials = {
            email,
            password,
            returnSecureToken: true
        }
        console.log(credentials)

        emailRef.current.value = ""
        passwordRef.current.value = ""

        props.onSubmit(credentials)
    }
    
    return(
        <form onSubmit={submitFormHandler}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email: </label>
                <input type="email" id="email" required ref={emailRef} className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password: </label>
                <input type="password" id="password" required ref={passwordRef} className="form-control" />
            </div>
            <div className="text-end">
                <button className={`btn btn-${mode === 'Se connecter' ? 'primary' : 'secondary'}`}>{mode}</button>
            </div>
        </form>
    )
}

export default SignForm
