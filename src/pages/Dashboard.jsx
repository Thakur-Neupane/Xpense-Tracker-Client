import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { AuthComp } from "../components/AuthComp";
import { NewTransForm } from "../components/NewTransForm";
import { TransactionTable } from "../components/TransactionTable";
import { CustomModal } from "../components/CustomModal";
import { useUser } from "../UserContext";
import TransactionChart from "../components/TransactionChart";

const Dashboard = () => {
  const { loggedInUser, setShowForm, transactions, getUserTransactions } =
    useUser();
  const [filterMonth, setFilterMonth] = useState("");
  const [filterType, setFilterType] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    income: [],
    expenses: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      await getUserTransactions();
    };
    fetchData();
  }, [filterMonth, filterType]);

  useEffect(() => {
    if (transactions.length > 0) {
      // Aggregate data for the chart
      const filteredTransactions = transactions.filter(
        (transaction) =>
          (filterMonth
            ? new Date(transaction.date).toLocaleString("default", {
                month: "long",
              }) === filterMonth
            : true) && (filterType ? transaction.type === filterType : true)
      );

      // Ensure all months are covered
      const allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dataByMonth = filteredTransactions.reduce(
        (acc, transaction) => {
          const month = new Date(transaction.date).toLocaleString("default", {
            month: "long",
          });
          if (!acc.labels.includes(month)) {
            acc.labels.push(month);
            acc.income.push(0);
            acc.expenses.push(0);
          }
          const index = acc.labels.indexOf(month);
          if (transaction.type === "income") {
            acc.income[index] += transaction.amount;
          } else {
            acc.expenses[index] += transaction.amount;
          }
          return acc;
        },
        {
          labels: allMonths,
          income: new Array(12).fill(0),
          expenses: new Array(12).fill(0),
        }
      );

      setChartData(dataByMonth);
    }
  }, [transactions, filterMonth, filterType, getUserTransactions]);

  return (
    <AuthComp>
      <TopNav />
      <Container className="main pt-2">
        <h4>Dashboard | Welcome back {loggedInUser?.name}</h4>
        <hr />

        <CustomModal title="Add new transaction">
          <NewTransForm />
        </CustomModal>

        <Row className="mb-4">
          <Col>
            <Form.Group controlId="filterMonth">
              <Form.Label>Filter by Month</Form.Label>
              <Form.Control
                as="select"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="">All Months</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="filterType">
              <Form.Label>Filter by Type</Form.Label>
              <Form.Control
                as="select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <TransactionChart data={chartData} />
          </Col>
          <Col md={6}>
            <Button onClick={() => setShowForm(true)}>
              Add New Transaction
            </Button>
            <TransactionTable />
          </Col>
        </Row>
      </Container>
      <Footer />
    </AuthComp>
  );
};

export default Dashboard;
