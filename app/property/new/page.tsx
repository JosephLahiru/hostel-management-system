'use client'
import { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Grid } from '@mui/material';

type Property = {
  prop_id: string;
  prop_name: string;
  status: string;
};

function AddProperty() {
  const [property, setProperty] = useState<Property>({
    prop_id: '',
    prop_name: '',
    status: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await fetch('https://hms.mtron.biz/api/property', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(process.env.NEXT_PUBLIC_USERNAME + ':' + process.env.NEXT_PUBLIC_PASSWORD)
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label="Property ID" 
            variant="outlined" 
            name="prop_id" 
            value={property.prop_id} 
            onChange={handleInputChange} 
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
            onChange={handleInputChange} 
            placeholder="Enter property name"
            required 
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Property Status" 
            variant="outlined" 
            name="status" 
            value={property.status} 
            onChange={handleInputChange} 
            placeholder="Enter property status"
            required 
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Add Property
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddProperty;
