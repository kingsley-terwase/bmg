import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UserSearch = ({ onAddUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      const mockUsers = [
        { email: 'user1@example.com' },
        { email: 'user2@example.com' },
        { email: 'admin@example.com' },
        { email: 'john.doe@company.com' },
        { email: 'jane.smith@company.com' }
      ].filter(user => user.email.toLowerCase().includes(value.toLowerCase()));
      setSearchResults(mockUsers);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddUser = (email) => {
    onAddUser(email);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Search Users"
        placeholder="Type to search users..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {searchResults.length > 0 && (
        <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto' }} elevation={3}>
          <List>
            {searchResults.map((user, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleAddUser(user.email)}
                  >
                    Add
                  </Button>
                }
              >
                <ListItemText primary={user.email} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default UserSearch