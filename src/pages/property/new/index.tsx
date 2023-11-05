'use client'
import { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Grid, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type Property = {
  prop_id: string;
  prop_name: string;
  status: string;
};

function AddProperty() {
  const [property, setProperty] = useState<Property>({
    prop_id: '',
    prop_name: '',
    status: 'no damage',
  });

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProperty({
     ...property,
     [event.target.name]: event.target.value,
    });
   };
   
   const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setProperty({
     ...property,
     status: event.target.value,
    });
   };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // first, get the token
    const authRes = await fetch(process.env.NEXT_PUBLIC_API + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: process.env.NEXT_PUBLIC_USERNAME,
        password: process.env.NEXT_PUBLIC_PASSWORD,
      }),
    });
  
    const authData = await authRes.json();

    const token = authData.jwt;
  
    const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/property', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(property),
    });
  
    if (res.ok) {
        console.log("Added Data");
    } else {
      alert('Failed to add property');
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, marginBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Property
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField 
            label="Property ID" 
            variant="outlined" 
            name="prop_id" 
            value={property.prop_id} 
            onChange={handleTextFieldChange} 
            placeholder="Enter property ID"
            required 
            fullWidth
            />
          </Grid>
          <Grid item xs={12}>
          <TextField 
            label="Property Name" 
            variant="outlined" 
            name="prop_name" 
            value={property.prop_name} 
            onChange={handleTextFieldChange} 
            placeholder="Enter property name"
            required 
            fullWidth
            />
          </Grid>
          <Grid item xs={12}>
          <Select
            variant="outlined"
            name="status"
            value={property.status}
            onChange={handleSelectChange}
            required
            fullWidth
            >
            <MenuItem value="damaged">Damaged</MenuItem>
            <MenuItem value="no damage">No Damage</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Add Property
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddProperty;
