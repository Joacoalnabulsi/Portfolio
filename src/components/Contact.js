import { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Contact = () => {
  const formRef = useRef();
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const onFormUpdate = (category, value) => {
    setFormDetails({ ...formDetails, [category]: value });
    if (errors[category]) {
      setErrors({ ...errors, [category]: null });
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const validate = () => {
    const newErrors = {};
    const firstName = formDetails.firstName.trim();
    const lastName = formDetails.lastName.trim();
    const email = formDetails.email.trim();

    if (!firstName) {
      newErrors.firstName = "First name is required";
    } else if (firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!NAME_REGEX.test(firstName)) {
      newErrors.firstName = "Enter a valid first name (letters only)";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!NAME_REGEX.test(lastName)) {
      newErrors.lastName = "Enter a valid last name (letters only)";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("error", "Please fix the highlighted fields");
      return;
    }

    setErrors({});
    setButtonText("Sending...");

    const templateParams = {
      from_name: `${formDetails.firstName} ${formDetails.lastName}`.trim(),
      from_email: formDetails.email,
      phone: formDetails.phone,
      message: formDetails.message,
    };

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      showToast("success", "Message sent successfully! I'll get back to you soon.");
      setFormDetails(formInitialDetails);
    } catch (error) {
      console.error("EmailJS error:", error);
      showToast("error", "Something went wrong, please try again later.");
    } finally {
      setButtonText("Send");
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={isVisible ? "animate__animated animate__zoomIn" : ""}
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name *"
                          className={errors.firstName ? "input-error" : ""}
                          onChange={(e) => onFormUpdate("firstName", e.target.value)}
                        />
                        {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name *"
                          className={errors.lastName ? "input-error" : ""}
                          onChange={(e) => onFormUpdate("lastName", e.target.value)}
                        />
                        {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address *"
                          className={errors.email ? "input-error" : ""}
                          onChange={(e) => onFormUpdate("email", e.target.value)}
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) => onFormUpdate("phone", e.target.value)}
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Message"
                          onChange={(e) => onFormUpdate("message", e.target.value)}
                        ></textarea>
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {toast && (
        <div className={`contact-toast contact-toast-${toast.type}`} role="alert">
          <div className="contact-toast-icon">
            {toast.type === "success" ? "✓" : "!"}
          </div>
          <div className="contact-toast-message">{toast.message}</div>
          <button
            type="button"
            className="contact-toast-close"
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default Contact;
