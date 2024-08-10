import Table from "react-bootstrap/Table";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { delteTrans } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

export const TransactionTable = () => {
  const { transactions, getUserTransactions } = useUser();
  const [idsToDelete, setIdesToDelete] = useState([]);
  useEffect(() => {
    getUserTransactions();
  }, []);

  const handleOnCheckBox = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (value === "all") {
      checked
        ? setIdesToDelete(transactions.map((trans) => trans._id))
        : setIdesToDelete([]);
      return;
    }

    if (checked) {
      setIdesToDelete([...idsToDelete, value]);
    } else {
      setIdesToDelete(idsToDelete.filter((id) => id !== value));
    }
  };

  const total = transactions.reduce((acc, item) => {
    return item.type === "income" ? acc + item.amount : acc - item.amount;
  }, 0);

  const handleOnDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${idsToDelete.length} many transactions?`
      )
    ) {
      const { status, message } = await delteTrans(idsToDelete);
      toast[status](message);

      if (status === "success") {
        getUserTransactions();
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>{transactions.length} Transactions found!</div>
        <Button
          onClick={handleOnDelete}
          variant="danger"
          disabled={!idsToDelete.length}
        >
          Delete {idsToDelete.length} Transactions
        </Button>
      </div>

      <div>
        <Form.Check
          onChange={handleOnCheckBox}
          value="all"
          type="checkbox"
          label="Select All"
          checked={transactions.every((item) => idsToDelete.includes(item._id))}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>
                <Form.Check
                  value={item._id}
                  type="checkbox"
                  label={item.date.slice(0, 10)}
                  onChange={handleOnCheckBox}
                  checked={idsToDelete.includes(item._id)}
                />
              </td>
              <td>{item.title}</td>
              {item.type === "income" ? (
                <>
                  <td className="text-success"> + {item.amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className="text-danger">- {item.amount}</td>
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bold fs-4">
            <td colSpan={3}>Total balance</td>
            <td className={total < 1 ? "text-danger" : "text-success"}>
              {total}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
