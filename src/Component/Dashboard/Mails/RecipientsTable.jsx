import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const RecipientsTable = ({ recipients, onRemove }) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Typography color="text.secondary">
                  No recipients selected
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            recipients.map((email, index) => (
              <TableRow key={index} hover>
                <TableCell>{email}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onRemove(email)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecipientsTable;
