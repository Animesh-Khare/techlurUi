import {
  Box,
  Button,
  Container,
  Dialog,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { storeAllEmployee } from "../../slice/employeeSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

const EditDialog = ({ editData, open, handleClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setData(editData);
  }, [editData]);

  const [data, setData] = useState(editData);

  useEffect(() => {
    // Update formik's values when editData changes
    formik.setValues({
      name: editData ? editData.name : "",
      dob: editData ? moment(editData.dob).format("YYYY-MM-DD") : "",
      salary: editData ? editData.salary : "",
      joiningDate: editData
        ? moment(editData.joiningDate).format("YYYY-MM-DD")
        : "",
      relievingDate: editData
        ? moment(editData.relievingDate).format("YYYY-MM-DD")
        : "",
      contact: editData ? editData.contact : "",
      status: editData ? editData.status : "",
    });
  }, [editData]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: editData ? editData.name : "",
      dob: editData ? moment(editData.dob).format("YYYY-MM-DD") : "",
      salary: editData ? editData.salary : "",
      joiningDate: editData
        ? moment(editData.joiningDate).format("YYYY-MM-DD")
        : "",
      relievingDate: editData
        ? moment(editData.relievingDate).format("YYYY-MM-DD")
        : "",
      contact: editData ? editData.contact : "",
      status: editData ? editData.status : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Must be atleast 5 characters or less")
        .required("Required"),
      salary: Yup.string().matches(/^[0-9]+$/, "Only numbers are allowed"),
    }),
    onSubmit: (values) => {
      axios
        .put(`http://localhost:5000/api/employees/${data._id}`, values)
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
    },
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <Container sx={{ p: 2, width: "360px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <Box>
              <FormLabel>Name*</FormLabel>
              <TextField
                color="success"
                name="name"
                type="text"
                placeholder="Enter your name"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
            </Box>
            <Box>
              <FormLabel>Date of birth</FormLabel>
              <TextField
                type="date"
                fullWidth
                color="success"
                name="dob"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
              />
            </Box>

            <Box>
              <FormLabel>Salary</FormLabel>
              <TextField
                type="text"
                fullWidth
                color="success"
                name="salary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salary}
              />
              {formik.touched.salary && formik.errors.salary ? (
                <div style={{ color: "red" }}>{formik.errors.salary}</div>
              ) : null}
            </Box>

            <Box>
              <FormLabel>Joining date</FormLabel>
              <TextField
                type="date"
                fullWidth
                color="success"
                name="joiningDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.joiningDate}
              />
            </Box>

            <Box>
              <FormLabel>Releiving date</FormLabel>
              <TextField
                type="date"
                fullWidth
                color="success"
                name="relievingDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.relievingDate}
              />
            </Box>

            <Box>
              <FormLabel>Contact</FormLabel>
              <TextField
                type="text"
                fullWidth
                color="success"
                name="contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
            </Box>

            <Box>
              <FormLabel>Status</FormLabel>

              <TextField
                name="status"
                select
                placeholder="Select"
                color="success"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
              >
                <MenuItem value="active">active</MenuItem>
                <MenuItem value="inactive">inactive</MenuItem>
              </TextField>
            </Box>

            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </Dialog>
  );
};

export default EditDialog;
