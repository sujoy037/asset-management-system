import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, MenuItem, Snackbar, Alert } from "@mui/material";
import backgroundImage from '../../components/chart/bg-new-vec.jpg'; // Updated background image


const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    charge_cd: "",
    building: "",
    floor: "",
    flat: "",
    complaint: "",
  });
  const [assetOptions, setAssetOptions] = useState({ buildings: [], floors: [], flats: [] });
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAssetData();
  }, []);

  const fetchAssetData = async () => {
    try {
      const response = await axios.get("/api/assets");
      setAssetOptions(response.data);
    } catch (error) {
      console.error("Error fetching asset data", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/complaints", formData);
      setSuccess(true);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: "600px" }}>
        <Typography variant="h5" gutterBottom>Raise a Complaint</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            select
            label="Charge Code"
            name="charge_cd"
            value={formData.charge_cd}
            onChange={handleChange}
            required
            margin="normal"
          >
            <MenuItem value="charge1">Charge 1</MenuItem>
            <MenuItem value="charge2">Charge 2</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label="Building"
            name="building"
            value={formData.building}
            onChange={handleChange}
            required
            margin="normal"
          >
            {assetOptions.buildings.map((b) => (
              <MenuItem key={b.id} value={b.name}>{b.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="Floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
            margin="normal"
          >
            {assetOptions.floors.map((f) => (
              <MenuItem key={f.id} value={f.name}>{f.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="Flat"
            name="flat"
            value={formData.flat}
            onChange={handleChange}
            required
            margin="normal"
          >
            {assetOptions.flats.map((fl) => (
              <MenuItem key={fl.id} value={fl.name}>{fl.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Complaint"
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">Complaint submitted successfully!</Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default RaiseComplaint;
