import "./index.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    let navigate = useNavigate();

    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
            axios({
                method: "post",
                url: 'http://localhost:5000/login',
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((response) => {
                
                console.log(response.data["state"]);
                if(response.data["state"]){

                    console.log(response.data);
                    console.log("username>>>>>>>>>>", response.data["username"]);
                    navigate(`/mainpage/${response.data["username"]}`);
                }
                else{
                    setError(response.data["smg"]);
                }
                
              }).catch((error) => {
                if (error.response) {
                    alert("Server Error!!!")
                    console.log("error~~~~~~~~~")
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                  }
              })
    }
    
    return (
        <div className="loginbody">
            <div className="logincontainer">
                <div>
                    <div className="logo">
                        <img src="img/logo.PNG" alt="" className="nav-logo"/>
                        <h1>Trade-Ed</h1>
                    </div>
                    <div className="title">
                        <p>Log In</p>
                        <div>
                            or
                            <a href = "/signup" > create an account</a>
                        </div>
                    </div>
                </div>

                <h1 className="error">{error}</h1>

                <div className="form-box">
                    <form onSubmit={submit}>
                        <div className="form-field">
                            <input type="text" id="username" name="username" placeholder="User Name" className="form-field-input" autoFocus autoComplete="false" required></input>
                        </div>

                        <div className="form-field">
                            <input type="password" id="password" name="password" placeholder="Password" className="form-field-input" required></input>
                        </div>

                        <div className="button-wrapper">
                            <input className="button-property" tabIndex={3} id="login" name="login" type="submit" value={"Sign In"} ></input>
                        </div>

                        <div className="forgot-password">
                            <span>
                                <a tabIndex={4} href="" >Forgot your password</a>
                            </span>
                        </div>

                        <div className="return-to-landingpage">
                            <span>
                                <a href="/">
                                    {"< back"}
                                </a>
                            </span>
                        </div>

                        <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value="03AKH6MRESD27BSTaIQOWTdWeIblj8nPmfOEH57KlrxcDfuCL7yTIXXpK9wQfRR_AX_NxgpYjKGO-YpfTmdqy3a-XJTt8c2bXUqhW9r2sACd_dWiiHPDF3drkj-ZiZOp6qZEmdr5W34JuKKmN1F9WntTaSyiEECMA6nBGSPu14Ds-CWb6IH17EprgVSrasHMiWfffjwwyBwkZFQ_m5dXj6Jb3adHuT8tvRJrI9rGYtNEHIhwt_zHQ4vJUxgRzisPnS3zLEaiiSkWPTIflasOtG2dpsi0rZt5o8HjEuG4FvSZS8Y6UnNSEJEjO472-uh_gqPiTdoWb5lBuqY4NtL0XJNBg6kXXv83RCXT5mJNoWiFbzE6tOrSnifv2jvEkiUWigjC6Vld0GKdnCN-UHs1kNqqw203Y1nqavX8Hwxm3K49nqXSO1Kw_exEjf8H_2cvQfa1flpgFflk4WFpjx7-cotKpk26ICgQisqDaudN55Krxic2sejqFckwMF3-7vFp7CGU1xFdfTiM7hPi_RFLEFzemEqnE1FfISTQ"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}