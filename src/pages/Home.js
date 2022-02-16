import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete user?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div>
      <h3
        style={{
          backgroundColor: "black",
          color: "white",
          height: "30px",
          textAlign: "left",
          padding: "20px",
        }}
      >
        Employee Management App
      </h3>
      <h2 style={{ margin: 0 }}>Employees List</h2>

      <div style={{padding:"20px", textAlign: "left"}}>
        <Button variant="contained" color="primary" onClick={()=>navigate("./addUser")}> 
          Add Employee
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 900, marginTop: 5 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee First Name</StyledTableCell>
              <StyledTableCell align="center">
                Employee Last Name
              </StyledTableCell>
              <StyledTableCell align="center">
                Employee Email Id
              </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.name}>
                  <StyledTableCell component="th" scope="user">
                    {user.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button style={{ marginRight: "5px", backgroundColor: "#08A4B8" }} color="primary" onClick={()=>navigate(`/editUser/${user.id}`)}>
                        Update
                      </Button>
                      <Button
                        style={{ marginRight: "5px" }}
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                      <Button color="primary" style={{backgroundColor: "#08A4B8"}}>View</Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3
        style={{
          backgroundColor: "black",
          color: "grey",
          height: "25px",
          padding: "10px",
        }}
      >
        All Rights Reserved 2020 @JavaGuides
      </h3>
    </div>
  );
};

export default Home;
