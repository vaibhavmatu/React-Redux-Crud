import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../redux/actions";

const EditUser = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const [error, setError] = useState("")

  let {id} = useParams();
  const {user} = useSelector((state) => state.data)
  let navigate = useNavigate();
  let dispatch = useDispatch(); 

  const { firstName, lastName, email } = state;

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [])

  useEffect(() => {
    if(user){
      setState({...user})
    }
  }, [user])

  const handleInput = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError("Please fill all inputs")
    } else {
      dispatch(updateUser(state, id));
      navigate("/");
      setError("")

    }
  }
  return (
    <div>
      <Button style={{ width: "100px", marginTop: "200px" }} variant="contained" color="primary" type="submit" onClick={() => navigate("/ ")}>
        GO Back
      </Button>
      <h2>Edit Employee</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
        <Box onSubmit={handleSubmit}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="First Name" variant="standard" value={firstName || ""} name="firstName" type="text" onChange={handleInput} />
          <br />
          <TextField id="standard-basic" label="Last Name" variant="standard" value={lastName || ""} name="lastName" type="text" onChange={handleInput} />
          <br />
          <TextField id="standard-basic" label="Email ID" variant="standard" value={email || ""} name="email" type="email" onChange={handleInput} />
          <br />
          <Button style={{ width: "100px" }} variant="contained" color="primary" type="submit" onChange={handleInput}>
            Submit
          </Button>
        </Box>
    </div>
  );
};

export default EditUser;