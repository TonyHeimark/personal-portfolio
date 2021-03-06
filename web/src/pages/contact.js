import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import Layout from "../components/layout";
import Container from "../components/container";
import SEO from "../components/seo";

import githubIcon from "../assets/github-square-brands.svg";
import linkedIn from "../assets/linkedin-brands.svg";

import "../styles/index.scss";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactPage = () => {
  const [activeField, setActiveField] = useState({
    name: false,
    email: false,
    message: false
  });
  const [success, setSuccess] = useState(false);
  const [errorState, setErrorState] = useState({});
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    let errors = {};
    // prettier-ignore
    const emailVal = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$");

    if (formFields.name === "") {
      errors = { ...errors, name: "You need to fill out this field" };
    }
    if (!emailVal.test(formFields.email) || formFields.email === "") {
      errors = { ...errors, email: "Please put in a valid email" };
    }
    if (formFields.message === "") {
      errors = { ...errors, message: "You need to fill out this field" };
    }

    const errorCheck = Object.keys(errors);
    if (errorCheck.length !== 0) {
      e.preventDefault();
      setErrorState(errors);
      return;
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formFields })
    })
      .then(() => setSuccess(true))
      .catch(error => alert(error));
    e.preventDefault();
  };

  const handleChange = e => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setActiveField({
      name: false,
      email: false,
      message: false
    });
    setErrorState({});
    setFormFields({
      name: "",
      email: "",
      message: ""
    });
  }, [success]);

  return (
    <Layout>
      <SEO title="Contact" />
      <Container>
        <div className="contact-wrapper">
          <h1 className="contact-wrapper__title">Contact</h1>
          <a
            className="contant-wrapper__link"
            href="https://github.com/TonyHeimark"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img className="contact-wrapper__icon" src={githubIcon} alt="github social link" />
          </a>
          <a
            className="contant-wrapper__link"
            href="https://www.linkedin.com/in/tony-j-heimark/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img className="contact-wrapper__icon" src={linkedIn} alt="linkedin-icon" />
          </a>
          <div className="contact-wrapper__form-container">
            {success && (
              <span className="contact-wrapper__success">
                Thank you for contacting me, I will get back to you as soon as i can!
              </span>
            )}
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              errorState={errorState}
              formFields={formFields}
              activeField={activeField}
              setActiveField={setActiveField}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ContactPage;
