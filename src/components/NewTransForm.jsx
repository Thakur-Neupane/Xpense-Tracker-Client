import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomInpute, CustomSelect } from "./CustomInpute";
import { postNewTrans } from "../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../UserContext";

export const NewTransForm = () => {
  const [form, setForm] = useState({});
  const { getUserTransactions, setShowForm } = useUser();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await postNewTrans(form);

    toast[status](message);

    status === "success" && getUserTransactions() && setShowForm(false);
  };

  const inputs = [
    {
      // label: "Type",
      name: "type",
      // type: "text",
      placeholder: "type",
      required: true,
      elmType: "select",
      options: [
        {
          value: "income",
          text: "Income",
        },
        {
          value: "expenses",
          text: "Expenses",
        },
      ],
    },
    {
      // label: "Title",
      name: "title",
      type: "text",
      placeholder: "Salary",
      required: true,
    },
    {
      // label: "Amount",
      name: "amount",
      type: "number",
      placeholder: "2345",
      min: "1",
      required: true,
    },
    {
      // label: "Date",
      name: "date",
      type: "date",
      required: true,
    },
  ];
  return (
    <Form className="shadow-lg p-3 border rounded" onSubmit={handleOnSubmit}>
      <Row>
        <Col>
          {inputs.map(({ elmType, ...item }, i) =>
            elmType === "select" ? (
              <CustomSelect key={i} {...item} onChange={handleOnChange} />
            ) : (
              <CustomInpute key={i} {...item} onChange={handleOnChange} />
            )
          )}

          <Button variant="primary" type="submit" className="w-100">
            Add Transaction
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
