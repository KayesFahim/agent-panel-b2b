import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import AccCreated from "../../images/undraw/undraw_happy_announcement_re_tsm0.svg";
export default function SignUpForm({ setSignUpMode }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [checked, setChecked] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
    company: "",
    address: "",
    civilaviationno: "",
  });
  const [nidFile, setNidFile] = useState(null);
  const [tlFile, setTlFile] = useState(null);

  const onChangeFile = (e, fileType) => {
    const selectedFile = e.target.files[0];
    if (fileType === "nid") {
      setNidFile(selectedFile);
    } else if (fileType === "tl") {
      setTlFile(selectedFile);
    }
  };
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newRegisterData = { ...registerData };
    newRegisterData[field] = value;
    setRegisterData(newRegisterData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      const body = {
        name: `${registerData.firstname} ${registerData.lastname}`,
        phone: registerData.phone,
        email: registerData.email,
        password: registerData.password,
        company: registerData.company,
        address: registerData.address,
        civilaviationno: registerData.civilaviationno,
        nid: nidFile,
        tl: tlFile,
      };

      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // 
      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/agent/signup`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! Status: ${response.status}`
        );
      }
      if (response.ok) {
        navigate("/");
        Swal.fire({
          imageUrl: AccCreated,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Account Created Successfully!",
          html: `<div>Dear: <strong>${registerData.firstname} ${registerData.lastname}</strong> Your Account: <strong>${registerData.company}</strong> is Successfully Created. Your Account will be Active within 24 Hours.</div>
              <strong>For any Query contact support@aatrips.pk or call <strong>+8801409965900</strong>`,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      }
    } catch (err) {
      await Swal.fire({
        // imageUrl: ServerDown,
        // imageWidth: 400,
        // imageHeight: 200,
        // imageAlt: 'Custom image',
        title: err.message || "Server Error",
        html: `<strong>For any Query contact support@aatrips.pk or call <strong>+8801409965900.</strong>`,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Please Try Again!",
      });
      setIsLoading(false);
    }
    // e.target.reset();
  };
  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Montserrat", sans-serif;
          }

          body,
          input {
            font-family: "Montserrat", sans-serif;
          }

          .container {
            position: relative;
            width: 100%;
            background-color: #fff;
            margin-bottom: 0px;
            /* overflow: hidden; */
          }

          .forms-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }

          .signin-signup {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 75%;
            width: 50%;
            transition: 1s 0.7s ease-in-out;
            display: grid;
            grid-template-columns: 1fr;
            z-index: 5;
          }

          form {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0rem 5rem;
            transition: all 0.2s 0.7s;
            overflow: hidden;
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            z-index: 10;
          }

          form.sign-up-form {
            opacity: 0;
            z-index: 1;
          }

          form.sign-in-form {
            z-index: 2;
          }

          .title {
            font-size: 2.2rem;
            color: #444;
            margin-bottom: 10px;
          }

          .input-field {
            max-width: 380px;
            width: 100%;
            background-color: #f0f0f0;
            margin: 10px 0;
            height: 55px;
            border-radius: 5px;
            display: grid;
            grid-template-columns: 15% 85%;
            padding: 0 0.4rem;
            position: relative;
          }

          .input-field i {
            text-align: center;
            line-height: 55px;
            color: #acacac;
            transition: 0.5s;
            font-size: 1.1rem;
          }

          .input-field input {
            background: none;
            outline: none;
            border: none;
            line-height: 1;
            font-weight: 600;
            font-size: 1.1rem;
            color: #333;
          }

          .input-field input::placeholder {
            color: #aaa;
            font-weight: 500;
          }

          .social-text {
            padding: 0.7rem 0;
            font-size: 1rem;
          }

          .btn {
            width: 150px;
            background-color: #f86f03;
            border: none;
            outline: none;
            height: 49px;
            border-radius: 4px;
            color: #fff;
            text-transform: uppercase;
            font-weight: 600;
            margin: 10px 0;
            cursor: pointer;
            transition: 0.5s;
          }

          .btn:hover {
            background-color: #f98c39;
          }
          .panels-container {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .container:before {
            content: "";
            position: absolute;
            height: 2000px;
            width: 2000px;
            top: -10%;
            right: 48%;
            transform: translateY(-50%);
            /* background-image: linear-gradient(-45deg, #122e55 0%, #0487c7 100%); */
            background: #122e55;
            transition: 1.8s ease-in-out;
            border-radius: 50%;
            z-index: 0;
          }
          .image {
            width: 60%;
            transition: transform 1.1s ease-in-out;
            transition-delay: 0.4s;
          }

          .panel {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-around;
            text-align: center;
            z-index: 6;
          }

          .left-panel {
            pointer-events: all;
            padding: 3rem 17% 2rem 12%;
          }

          .right-panel {
            pointer-events: none;
            padding: 3rem 12% 2rem 17%;
          }

          .panel .content {
            color: #fff;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.6s;
          }

          .panel h3 {
            font-weight: 600;
            line-height: 1;
            font-size: 1.5rem;
          }

          .panel p {
            font-size: 0.95rem;
            padding: 0.7rem 0;
          }

          .btn.transparent {
            margin: 0;
            background: none;
            border: 2px solid #fff;
            width: 130px;
            /* height: 41px; */
            font-weight: 600;
            font-size: 0.8rem;
          }

          .right-panel .image,
          .right-panel .content {
            transform: translateX(800px);
          }

          /* ANIMATION */

          .container.sign-up-mode:before {
            transform: translate(100%, -50%);
            right: 52%;
          }

          .container.sign-up-mode .left-panel .image,
          .container.sign-up-mode .left-panel .content {
            transform: translateX(-800px);
          }

          .container.sign-up-mode .signin-signup {
            left: 25%;
          }

          .container.sign-up-mode form.sign-up-form {
            opacity: 1;
            z-index: 2;
          }

          .container.sign-up-mode form.sign-in-form {
            opacity: 0;
            z-index: 1;
          }

          .container.sign-up-mode .right-panel .image,
          .container.sign-up-mode .right-panel .content {
            transform: translateX(0%);
          }

          .container.sign-up-mode .left-panel {
            pointer-events: none;
          }

          .container.sign-up-mode .right-panel {
            pointer-events: all;
          }
          .input-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            width: fit-content;
          }
          @media(max-width:2000px){
            .sign-up-form{
              width: 70%;
            }
            .file-label {
              width: 50%;
              margin-bottom: 1rem;
            }

          }

          @media (max-width: 1590px) {
            .container:before {
              content: "";
              position: absolute;
              height: 2000px;
              width: 2000px;
              top: -50%;
              right: 48%;
              transform: translateY(-50%);
            
              background: #122e55;
              transition: 1.8s ease-in-out;
              border-radius: 40%;
            }
            .sign-up-form{
              width: 80%;
            }
            .file-label {
              width: 70%;
              margin-bottom: 1rem;
            }
            .file-label input {
              width: 60%;
            }


          }
          @media (max-width: 870px) {
            .signin-signup {
              width: 100%;
              top: 95%;
              transform: translate(-50%, -100%);
              transition: 1s 0.8s ease-in-out;
            }
            .container {
              height: 2000px !important;
              padding: 1.5rem;
            }
            .signin-signup,
            .container.sign-up-mode .signin-signup {
              left: 50%;
            }

            .panels-container {
              grid-template-columns: 1fr;
              grid-template-rows: 1fr 2fr 1fr;
            }

            .panel {
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              padding: 2.5rem 8%;
              grid-column: 1 / 2;
            }

            .right-panel {
              grid-row: 3 / 4;
            }

            .left-panel {
              grid-row: 1 / 2;
            }

            .image {
              width: 200px;
              transition: transform 0.9s ease-in-out;
              transition-delay: 0.6s;
            }

            .panel .content {
              padding-right: 15%;
              transition: transform 0.9s ease-in-out;
              transition-delay: 0.8s;
            }

            .panel h3 {
              font-size: 1.2rem;
            }

            .panel p {
              font-size: 0.7rem;
              padding: 0.5rem 0;
            }

            .btn.transparent {
              width: 110px;
              /* height: 35px; */
              font-size: 0.7rem;
            }
            .btn.transparent :hover {
              background-color: #f98c39;
            }
            .container:before {
              width: 1500px;
              /* height: 1500px; */
              transform: translateX(-50%);
              left: 30%;
              bottom: 68%;
              right: initial;
              top: initial;
              transition: 2s ease-in-out;
            }

            .container.sign-up-mode:before {
              transform: translate(-50%, 100%);
              bottom: 32%;
              right: initial;
            }

            .container.sign-up-mode .left-panel .image,
            .container.sign-up-mode .left-panel .content {
              transform: translateY(-300px);
            }

            .container.sign-up-mode .right-panel .image,
            .container.sign-up-mode .right-panel .content {
              transform: translateY(0px);
            }

            .right-panel .image,
            .right-panel .content {
              transform: translateY(300px);
            }

            .container.sign-up-mode .signin-signup {
              top: 5%;
              transform: translate(-50%, 0);
            }
            .input-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .input-grid {
              grid-template-columns: 1fr;
            }

            .file-input-container {
              flex-direction: column;
            }

            .file-label {
              width: 100%;
              margin-bottom: 1rem;
            }

            .file-label:last-child {
              margin-bottom: 0;
            }
          }
          @media (max-width: 570px) {
            form {
              padding: 0 1.5rem;
            }

            .image {
              display: none;
            }
            .panel .content {
              padding: 0.5rem 1rem;
            }
            .container {
              height: 2000px !important;
              padding: 1.5rem;
            }

            .container:before {
              bottom: 72%;
              left: 50%;
            }
            form .sign-in-form {
              margin-top: 600 !important;
            }
            .container.sign-up-mode:before {
              bottom: 28%;
              left: 50%;
            }
          }
          .sign-up-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin: auto;
            
          }

          .title {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #333;
          }

          .input-field {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0.5rem;
            z-index: 99999 !important;
          }

          .input-field i {
            margin-right: 0.5rem;
            color: #999;
          }

          .input-field input {
            border: none;
            outline: none;
            flex: 1;
            padding: 0.5rem;
            font-size: 1rem;
          }

          .password-note {
            color: red;
            font-size: 0.875rem;
            margin-bottom: 1rem;
            width: 100%;
            text-align: left;
          }

          .file-input-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 1rem;
            gap: 10px;
          }

          .file-label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }

          .file-label input {
            width: 100%;
          }
          .file-input {
            background-color: #0487c7;
            padding: 7px;
            color: #fff;
            border-radius: 7px;
          }
          input::file-selector-button {
            font-weight: bold;
            background: white;
            color: rgb(255, 123, 0);
            padding: 0.5em;
            border: thin solid white;
            border-radius: 3px;
          }
          .terms-container {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            width: 100%;
          }

          .terms-container input {
            margin-right: 0.5rem;
          }

          .btn {
            width: 100%;
            padding: 0.75rem;
            background-color: #0056b3;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .btn:hover {
            background-color: #051b33;
          }
            @media (max-width: 450px) {
            .sign-in-form {
              width: 280px;
              padding: 0px 10px !important;
            }
              .input-field{
              width: "100%";;
              
              }
              .input-field input{
              font-weight: 400;
              font-size:5px:
          }
        `}
      </style>
      <form
        className="sign-up-form"
        onSubmit={handleSubmit}
        autoComplete="off"
        // style={{ zIndex: 100 }}
        
      >
        <h2
          style={{
            textAlign: "center",
          }}
          className="title"
        >
          Agent Registration
        </h2>
        <div
          // className="input-grid"
          style={{
            paddingLeft: "20px",
            // paddingRight:"20px",
          }}
        >
          <Grid container spacing={2} >
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  required
                  type="text"
                  maxLength={20}
                  placeholder="First Name"
                  name="firstname"
                  value={registerData?.firstname}
                  autocomplete="off"
                  onChange={handleOnChange}
                  style={{
                    width: "80%",
                    zIndex:2000,
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  required
                  type="text"
                  name="lastname"
                  maxLength={20}
                  placeholder="Last Name"
                  autocomplete="off"
                  onChange={handleOnChange}
                  value={registerData?.lastname}
                />
              </div>
            </Grid>
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                <i className="fas fa-building"></i>
                <input
                  required
                  type="text"
                  placeholder="Company Name"
                  maxLength={25}
                  name="company"
                  autocomplete="off"
                  onChange={handleOnChange}
                  value={registerData?.company}
                />
              </div>
            </Grid>
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                <i className="fas fa-map-marker-alt"></i>
                <input
                  required
                  type="text"
                  placeholder="Company Address"
                  name="address"
                  value={registerData?.address}
                  autoComplete="off"
                  onChange={handleOnChange}
                />
              </div>
            </Grid>
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input
                  required
                  name="phone"
                  maxLength={11}
                  placeholder="Phone Number"
                  value={registerData?.phone}
                  onChange={handleOnChange}
                />
              </div>
            </Grid>
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  required
                  type="email"
                  name="email"
                  maxLength={25}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  placeholder="Email Address"
                  value={registerData?.email}
                  onChange={handleOnChange}
                />
              </div>
            </Grid>
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                {/* {showPassword ? (
              <LockOpenIcon onClick={handleClickShowPassword} color="action" />
            ) : (
              <LockIcon onClick={handleClickShowPassword} color="action" />
            )} */}
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Choose Password"
                  maxLength={12}
                  autocomplete="off"
                  value={registerData.password}
                  onChange={handleOnChange}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "10px",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={11} lg={6}>
              <div className="input-field">
                {/* {showPassword ? (
              <LockOpenIcon onClick={handleClickShowPassword} color="action" />
            ) : (
              <LockIcon onClick={handleClickShowPassword} color="action" />
            )} */}
                <input
                  required
                  name="cPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  maxLength={12}
                  value={registerData?.cPassword}
                  onChange={handleOnChange}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "10px",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </Grid>
          </Grid>

          <p
            style={{
              display: "flex",
              fontSize: "12px",
              textAlign: "left",
              color: "red",
              margin: "10px 0px",
            }}
          >
            {registerData.password.length < 8
              ? "*Password at least 8 characters"
              : null}
          </p>
          <p style={{ color: "red", fontSize: "12px" }}>
            {registerData.password === registerData.cPassword
              ? ""
              : "*Passwords do not match"}
          </p>
        </div>

        <div className="file-input-container">
          <label className="file-label">
            NID Copy*
            <input
              required
              type="file"
              className="file-input"
              onChange={(e) => onChangeFile(e, "nid")}
              title="Choose an Image (png or jpg)"
              accept="image/*"
            />
          </label>
          <label className="file-label">
            Trade License (optional)
            <input
              onChange={(e) => onChangeFile(e, "tl")}
              type="file"
              title="Choose an Image (png or jpg)"
              accept="image/*"
              className="file-input"
            />
          </label>
        </div>
        <div className="terms-container">
          <FormGroup>
            <FormControlLabel
              sx={{ color: "var(--primary-color)" }}
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  sx={{ color: "black", marginLeft: "5px" }}
                />
              }
              label={
                <a
                  style={{ fontSize: 14 }}
                  href="https://aatrips.pk/terms&condition"
                  target="_blank"
                  rel="noreferrer"
                >
                  Agree to Terms and Conditions
                </a>
              }
            />
          </FormGroup>
        </div>
        <Button
          type="submit"
          disabled={
            registerData.password !== registerData.cPassword || isLoading
          }
          style={{
            backgroundColor: "#122E55",
            color: "white",
            marginTop: "1rem",
          }}
        >
          {isLoading ? (
            <CircularProgress style={{ height: "20px", width: "20px" }} />
          ) : (
            "Register →"
          )}
        </Button>
        <p>
          Already Registered? {""}
          <button
            style={{
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
              margin: "8px  2px",
            }}
            onClick={() => setSignUpMode(false)}
          >
            Login
          </button>
        </p>
      </form>
    </>
  );
}
