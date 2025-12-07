import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Box,
} from "@mui/material";

const CustomTable = ({ title, headers = [], children, totalCount }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Convert children to array so we can slice for pagination
  const rows = React.Children.toArray(children);

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const count = totalCount ?? rows.length;

  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #e0e0e0" }}
    >
      {/* Top Section */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#f5f5f5" }}>
            <TableRow>
              {headers.map((head) => (
                <TableCell
                  key={head.key}
                  align={head.align || "left"}
                  sx={{ fontWeight: 600, width: head.width || "auto" }}
                >
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>{paginatedRows}</TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default CustomTable
