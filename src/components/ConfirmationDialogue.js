import React from "react";
import "../eight.css";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

function ConfirmationDialogue({ week, message, onConfirm, onCancel }) {
  /*
<div className="confirmation">
      <h2>Paastoamis aikataulut ({week})</h2>
      <table>        
        <thead>
          <th>Ref</th>
          <th>Alku</th>
          <th>Loppu</th>
        </thead>
        {data.map((d) => (
          <tr>
            <td>{ind++}</td>
            <td>{d.alku} - </td>
            <td>{d.loppu}</td>
          </tr>
        ))}
      </table>

      <button id="confirm-button" onClick={onConfirm}>
        Lisää
      </button>
      <button id="cancel-button" onClick={onCancel}>
        Peruuta
      </button>
    </div>

  */
  const messu = JSON.stringify(message);
  let ind = 1;

  const data = JSON.parse(messu);
  console.log("data:", data);
  //"[{"alku":"2023-10-05T12:34","loppu":"2023-10-06T12:34"}]"
  return (
    <Dialog open={true}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <Typography display="block">
          {data.map((d) => "Alku: " + d.alku + " - Loppu: " + d.loppu)}
        </Typography>
        <Button onClick={onConfirm}>Ok</Button>
        <Button onClick={onCancel}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialogue;
