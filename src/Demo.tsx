import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
{
  /*DATA*/
}
function createData(ordernum, name, desk, time, status) {
  return {
    ordernum,
    name,
    desk,
    time,
    details: [
      { item: "tea", amount: 3, rejected: 0 },
      { item: "coffee", amount: 1, rejected: 0 },
    ],
    status,
  };
}

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(row.status);
  const [buttonsVisible, setButtonsVisible] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [itemQuantities, setItemQuantities] = React.useState({});
  {
    /*Handles Events*/
  }
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setButtonsVisible(false);
    if (newStatus === "Partially Fulfilled") {
      setDialogOpen(true);
    }
  };

  const handleQuantityChange = (item, change) => {
    setItemQuantities((prev) => ({
      ...prev,
      [item]: Math.max(
        0,
        Math.min(
          (prev[item] || 0) + change,
          row.details.find((d) => d.item === item).amount
        )
      ),
    }));
  };

  const handleRejectItems = () => {
    //console.log("Rejected items:", itemQuantities);
    setDialogOpen(false);
  };
  {
    /**/
  }
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ordernum}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.desk}</TableCell>
        <TableCell>{row.time}</TableCell>
        <TableCell />
        <TableCell>
          {buttonsVisible ? (
            <ButtonGroup size="small" variant="contained">
              <Button onClick={() => handleStatusChange("Accepted")}>
                Accept
              </Button>
              <Button onClick={() => handleStatusChange("Partially Fulfilled")}>
                Partially Fulfill
              </Button>
              <Button onClick={() => handleStatusChange("Rejected")}>
                Reject
              </Button>
            </ButtonGroup>
          ) : (
            <>
              <span>{status}</span>
              <Button size="small" variant="contained">
                Save
              </Button>
            </>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.item}>
                      <TableCell>{detailsRow.item}</TableCell>
                      <TableCell>{detailsRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Reject Items</DialogTitle>
        <DialogContent>
          {row.details.map((detail) => (
            <Box
              key={detail.item}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {detail.item}
              </Typography>
              <Button onClick={() => handleQuantityChange(detail.item, -1)}>
                -
              </Button>
              <TextField
                variant="outlined"
                size="small"
                value={itemQuantities[detail.item] || 0}
                sx={{ width: "50px", mx: 1 }}
                inputProps={{ readOnly: true }}
              />
              <Button onClick={() => handleQuantityChange(detail.item, 1)}>
                +
              </Button>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectItems} color="primary">
            Reject Selected
          </Button>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const rows = [
  createData("123", "A", "60", "8:00", "Pending"),
  createData("124", "B", "61", "8:15", "Pending"),
  createData("125", "C", "62", "8:30", "Pending"),
  createData("126", "D", "63", "8:45", "Pending"),
];

export default function Demo({ kitchenNumber }) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Orders for Kitchen {kitchenNumber}
      </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Desk</TableCell>
            <TableCell>Time</TableCell>
            <TableCell />
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.ordernum} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
