import React, { useState } from "react";

import bg1 from "../../assets/img/1.jpg";
// import bg2 from "../../assets/img/2.jpg";
// import bg3 from "../../assets/img/3.jpg";
// import bg4 from "../../assets/img/4.jpg";
// import bg5 from "../../assets/img/5.jpg";
import logo from "../../assets/img/logo.png";
import { ReactComponent as OpenEye } from "../../assets/icon/openEye.svg";
import { ReactComponent as CloseEye } from "../../assets/icon/closeEye.svg";
import s from "./Form.module.css";

const Form = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [formErrors, setFormErrors] = useState({ login: "", password: "" });
  const [loginValid, setLoginValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [checked, setChecked] = useState(false);

  // let cycle1 = null;
  // let cycle2 = null;
  // let cycle3 = null;
  // const date = new Date("1995-12-17T09:24:00");
  // const dateHour = date.getHours();
  // const bgImages = [bg1, bg2, bg3, bg4, bg5];
  // function randomInteger(min, max) {
  //   let rand = min - 0.5 + Math.random() * (max - min + 1);
  //   return Math.round(rand);
  // }
  // if (dateHour >= 0 && dateHour <= 7) {
  //   if (!cycle1) cycle1 = bgImages[randomInteger(1, 5)];
  //   cycle2 = null;
  //   cycle3 = null;
  // } else if (dateHour >= 8 && dateHour <= 15) {
  //   if (!cycle2) cycle2 = bgImages[randomInteger(1, 5)];
  //   cycle1 = null;
  //   cycle3 = null;
  // } else if (dateHour >= 16 && dateHour <= 23) {
  //   if (!cycle3) cycle3 = bgImages[randomInteger(1, 5)];
  //   cycle1 = null;
  //   cycle2 = null;
  // }
  // const bg = cycle1 || cycle2 || cycle3;
  // console.log("bgImages", bgImages);
  // console.log("cycle1", cycle1);
  // console.log("cycle2", cycle2);
  // console.log("cycle3", cycle3);

  const labelClasses = [s.remember];
  checked ? labelClasses.push(s.disable) : labelClasses.push(s.enable);

  function handleChange({ target }) {
    const { name, value, checked } = target;
    name === "login" && setLogin(value);
    name === "password" && setPassword(value);
    name === "checkbox" && setChecked(checked);
    validateField(name, value);
    validateForm();
  }

  function validateField(fieldName, value) {
    const fieldValidationErrors = formErrors;
    let fieldLoginValid = loginValid;
    let fieldPasswordValid = passwordValid;
    switch (fieldName) {
      case "login":
        fieldLoginValid =
          // eslint-disable-next-line no-useless-escape
          /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(value);
        fieldValidationErrors.login = fieldLoginValid
          ? ""
          : "Unfortunately, there are no such email addresses...";
        break;
      case "password":
        fieldPasswordValid = value.length >= 6 && value.length <= 12;
        fieldValidationErrors.password = fieldPasswordValid
          ? ""
          : "Sorry, but we need a password of 6 to 12 characters...";
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    setLoginValid(fieldLoginValid);
    setPasswordValid(fieldPasswordValid);
  }

  function validateForm() {
    setFormValid(loginValid && passwordValid && checked);
  }

  function onShowPassword() {
    setShowPassword(prevShowPassword =>
      prevShowPassword === "password" ? "text" : "password"
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    formValid && alert(`login: ${login}, password: ${password}`) && reset();
  }

  function reset() {
    setLogin("");
    setPassword("");
    setShowPassword("password");
    setFormErrors({ email: "", password: "" });
    setLoginValid(false);
    setPasswordValid(false);
    setFormValid(false);
  }

  return (
    <div className={s.formWrap} style={{ backgroundImage: `url(${bg1})` }}>
      <form className={s.form} onSubmit={handleSubmit}>
        <img className={s.logo} src={logo} alt="logo" width="236" />
        <h2 className={s.title}>QCRM</h2>
        <p className={s.text}>by SupportYourApp</p>

        <div className={s.loginWrap}>
          <input
            className={s.login}
            type="text"
            name="login"
            value={login}
            placeholder="Login"
            onChange={handleChange}
          />
          <p className={s.errLogin}>{formErrors.login}</p>
        </div>
        <div className={s.passwordWrap}>
          <input
            className={s.password}
            type={showPassword}
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button className={s.btnEye} type="button" onClick={onShowPassword}>
            {showPassword === "text" ? (
              <CloseEye className={s.eye} />
            ) : (
              <OpenEye className={s.eye} />
            )}
          </button>
          <p className={s.errPassword}>{formErrors.password}</p>
        </div>

        <label className={labelClasses.join(" ")}>
          <input
            type="checkbox"
            name="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          Remember me on this computer
        </label>

        <button className={s.btn} type="submit" disabled={formValid}>
          Sing In to QCRM
        </button>
      </form>
    </div>
  );
};

export default Form;
