import React, { useState } from "react";
import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Badge,
  Collapse
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Sidebar = ({ mailCount = 0 }) => {
  const [open, setOpen] = useState(true);

  return (
    <Card sx={{ height: "100vh", }}>
      <CardHeader
        title="Folders"
        action={
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
        sx={{ bgcolor: "grey.100" }}
      />
      <Collapse in={open}>
        <List sx={{ p: 0 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <MailIcon sx={{ mr: 2, color: "text.secondary" }} />
              <ListItemText primary="Sent" />
              <Badge badgeContent={mailCount} color="info" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </Card>
  );
};

export default Sidebar;
