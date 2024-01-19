import {
  Box,
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDialog from "../AddDialog";
import EditDialog from "../EditDialog";
import DeleteDialog from "../DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { storeAllEmployee } from "../../slice/employeeSlice";

const List = () => {
  const dispatch = useDispatch();

  const employeesData = useSelector((state) => state.employee.allEmployee);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((resp) => {
        dispatch(storeAllEmployee(resp.data));
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  }, []);

  const addEmployeeHandler = () => {
    setOpenAddDialog(true);
  };

  const editBtnHandler = (data) => {
    setOpenEditDialog(true);
    setEditData(data);
  };

  const deleteBtnHandler = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setOpenDeleteDialog(true);
  };

  return (
    <Box>
      <Header />
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
        >
          <Typography variant="h4" sx={{ color: "green" }}>
            Employee List
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={addEmployeeHandler}
          >
            Add New Employee
          </Button>
        </Stack>
      </Container>
      <Container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  DOB
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Salary
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Joining date
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Releiving date
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Contact
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employeesData?.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell align="left">
                      {item.name ? item.name : "null"}
                    </TableCell>
                    <TableCell align="right">
                      {item.dob ? moment(item.dob).format("ll") : "null"}
                    </TableCell>
                    <TableCell align="right">
                      {item.salary ? item.salary : "null"}
                    </TableCell>
                    <TableCell align="right">
                      {item.joiningDate
                        ? moment(item.joiningDate).format("ll")
                        : "null"}
                    </TableCell>
                    <TableCell align="right">
                      {item.relievingDate
                        ? moment(item.relievingDate).format("ll")
                        : "null"}
                    </TableCell>
                    <TableCell align="right">
                      {item.contact ? item.contact : "null"}
                    </TableCell>
                    <TableCell align="right">
                      {item.status ? item.status : "null"}
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        sx={{ "& :hover": { color: "red", cursor: "pointer" } }}
                        onClick={() => editBtnHandler(item)}
                      />
                      <DeleteIcon
                        sx={{ "& :hover": { color: "red", cursor: "pointer" } }}
                        onClick={() => deleteBtnHandler(item._id, item.name)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <AddDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
      />

      <EditDialog
        editData={editData}
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
      />

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        deleteId={deleteId}
        deleteName={deleteName}
      />
    </Box>
  );
};

export default List;
