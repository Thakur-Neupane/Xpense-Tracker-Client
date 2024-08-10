import { Footer } from "../components/Footer";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { TopNav } from "../components/TopNav";
import { CustomInpute } from "../components/CustomInpute";
import { useState } from "react";
import { postNewUser } from "../helpers/axiosHelper";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [resp, setResp] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.password) {
      return alert("Password do not match, Password must match!");
    }

    // call axios to send data to api
    const data = await postNewUser(rest);
    setResp(data);

    data.status === "success" && setForm(initialState);
  };

  const inputes = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
      value: form.name,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      required: true,
      value: form.email,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "0412345678",
      required: false,
      value: form.phone,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      value: form.password,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
      value: form.confirmPassword,
    },
  ];
  return (
    <div>
      {/* header  */}
      <TopNav />

      {/* main body  */}
      <Container className="main" fluid>
        <Row className="">
          <Col
            md={6}
            className="bg-info  vh-md-100 p-5 d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg rounded p-3 text-white">
              <h1>Join Our Community</h1>
              <p>Use our simple system to trak your transactions</p>
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg p-5 rounded border w-75 mt-5 mb-5">
              <h2>Signup now</h2>
              <hr />

              {resp?.message && (
                <Alert
                  variant={resp?.status === "success" ? "success" : "danger"}
                >
                  {resp.message}
                </Alert>
              )}

              <Form onSubmit={handleOnSubmit}>
                {inputes.map((item, i) => (
                  <CustomInpute key={i} {...item} onChange={handleOnChange} />
                ))}

                <div className="d-grid">
                  <Button type="submit" variant="primary">
                    Signup Now
                  </Button>
                </div>
              </Form>

              <p className="text-end mt-3">
                Already have an account? <a href="/">Login</a> Now
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Signup;
