import { Button, Dialog, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { storeAllEmployee } from "../../slice/employeeSlice";

const DeleteDialog = ({ open, handleClose, deleteId, deleteName }) => {
  const dispatch = useDispatch();

  const deleteBtnHandler = () => {
    axios
      .delete(`http://localhost:5000/api/employees/${deleteId}`)
      .then((resp) => {
        axios
          .get("http://localhost:5000/api/employees")
          .then((resp) => {
            dispatch(storeAllEmployee(resp.data));
          })
          .catch((err) => {
            console.log("err ==>", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack justifyContent={"center"} alignItems={"center"} gap={4} p={4}>
        <Typography variant="h5">
          Are you sure? You want to delete{" "}
          <span style={{ fontWeight: "bold" }}>{deleteName}</span>
        </Typography>
        <Button onClick={deleteBtnHandler} variant="contained" color="success">
          Delete
        </Button>
      </Stack>
    </Dialog>
  );
};

export default DeleteDialog;
