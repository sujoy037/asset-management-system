import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DashboardLayout from '../../components/DashboardLayout';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const UpdateTransferAsset = () => {
  const { assetId } = useParams(); // Get assetId from the URL params
  const navigate = useNavigate();  // Initialize useNavigate
  const [formData, setFormData] = useState({
    office_cd: "",
    office_nm: "",
    name_of_user: "",
    building: "",
    floor: "",
    room_no: "",
    cpu_number: "",
    keyboard_serial_no: "",
    mouse_serial_no: "",
    working_status_id: "",
    assignment_date: "",
    accessory_id: "",
    monitor_serial_no: "",
    hrms_id_of_user: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessory, setAccessory] = useState([]);
  const [status, setStatus] = useState([]);
  const [officeList, setOfficeList] = useState([]); // Store list of office codes
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  // Fetch asset data
  useEffect(() => {
    const fetchAssetData = async () => {
      if (!assetId) {
        setError("Asset ID is missing!");
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5001/api/asset-assignment/${assetId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data.data;
        console.log("Asset Data:", data); // Log the API response

        // Format the date to yyyy-mm-dd
        const formattedDate = data.assignment_date
          ? data.assignment_date.split("T")[0]
          : "";

        // Update form data with the fetched data
        setFormData({
          ...data,
          assignment_date: formattedDate, // Format assignment_date for the date input
        });
      } catch (err) {
        setError("Error fetching asset details.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [assetId]);

  // Fetch accessory data
  useEffect(() => {
    const fetchAccessory = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:5001/api/accessory",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAccessory(response.data); // Store accessories data
      } catch (error) {
        setError("Error fetching accessories.");
        console.error(error);
      }
    };
    fetchAccessory();
  }, []);

  // Fetch status data
  useEffect(() => {
    const fetchComplainStatus = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:5001/api/working-status",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStatus(response.data); // Store complain status data
      } catch (error) {
        setError("Error fetching complain status.");
        console.error(error);
      }
    };
    fetchComplainStatus();
  }, []);

  // Fetch office codes and total assets from API
  useEffect(() => {
    const fetchAssetsAndOffices = async () => {
      setIsLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Authentication token is missing. Please log in again.");
          setIsLoading(false);
          return;
        }

        // Fetch assets and offices
        const [assetsResponse, officesResponse] = await Promise.all([
          axios.get("http://localhost:5001/api/total-assets", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5001/api/office-cd", {
            // Fetch office list
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setAssets(assetsResponse.data || []);
        setOfficeList(officesResponse.data || []); // Store the office list
      } catch (err) {
        console.error("Error fetching assets or offices:", err);
        setError("Error fetching assets or offices.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssetsAndOffices();
  }, []);

  const handleOfficeCdChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      office_cd: value,
    }));

    const selectedOffice = officeList.find(
      (office) => office.office_cd === value
    );
    if (selectedOffice) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        office_nm: selectedOffice.office_nm,
      }));
    }

    // Filter assets based on the selected office_cd
    const filtered = assets.filter((asset) => asset.office_cd === value);
    setFilteredAssets(filtered);
  };

  const handleNameOfUserChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      name_of_user: value,
    }));

    // Filter the assets based on the selected name_of_user
    const userAssets = assets.filter((asset) => asset.name_of_user === value);
    setFilteredAssets(userAssets);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      // Add asset_id to the formData before submitting
      const updatedFormData = { ...formData, asset_id: assetId };

      console.log("Sending assetId to backend:", assetId);
      const encodedAssetId = encodeURIComponent(assetId);
      const response = await axios.put(
        `http://localhost:5001/api/asset-assignment/${encodedAssetId}`,
        updatedFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response);

      alert("Asset updated successfully!");
      // Handle successful update (e.g., redirecting, clearing form)
    } catch (err) {
      setError("Error updating asset.");
    } finally {
      setLoading(false);
    }
  };


  return (

    <DashboardLayout role="ISD">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/transfer-assigned-asset')}
          sx={{
            marginBottom: 2,
            background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)',
            color: 'white',
          }}
        >

        </Button>
        <Box
          sx={{
            minHeight: '100vh',
            padding: 4,
            background: `url(${BackgroundImage}) no-repeat center center fixed`,
            backgroundSize: 'cover',
          }}
        >
          <div style={{ padding: "20px" }}>
            <h2 style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              color: 'blue',
              marginBottom: '20px'
            }}>
              Transfer Asset
            </h2>


            {/* Display Error Message */}
            {error && <div style={{ color: "red" }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Accessory ID</InputLabel>
                    <Select
                      label="Accessory ID"
                      name="accessory_id"
                      value={formData.accessory_id}
                      onChange={handleChange}
                      required
                      disabled
                    >
                      {accessory.length > 0 ? (
                        accessory.map((acc) => (
                          <MenuItem key={acc.id} value={acc.id}>
                            {acc.name} {/* Assuming 'name' is the label to show */}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No accessories available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Office Code Dropdown */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Office Code</InputLabel>
                    <Select
                      label="Office Code"
                      name="office_cd"
                      value={formData.office_cd}
                      onChange={handleOfficeCdChange} // Ensure the handler is correctly linked
                      required
                    >
                      {officeList.map((office) => (
                        <MenuItem key={office.office_cd} value={office.office_cd}>
                          {office.office_cd} - {office.office_nm}{" "}
                          {/* Display the office code and name */}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Office Name  */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Office Name"
                    variant="outlined"
                    fullWidth
                    name="office_nm"
                    value={formData.office_nm}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </Grid>
                {/* Officer Name Dropdown */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Officer Name</InputLabel>
                    <Select
                      label="Officer Name"
                      name="name_of_user" // Ensure this matches the field in your formData
                      value={formData.name_of_user}
                      onChange={handleNameOfUserChange} // Handle officer name change
                      required
                    >
                      {/* Map over officeList to create MenuItems for officer names */}
                      {assets.map((office) => (
                        <MenuItem
                          key={office.name_of_user}
                          value={office.name_of_user}
                        >
                          {office.name_of_user} {/* Display the officer's name */}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Hrms Id</InputLabel>
                    <Select
                      label="Hrms Id"
                      name="hrms_id_of_user" // Ensure this matches the field in your formData
                      value={formData.hrms_id_of_user}
                      onChange={handleChange}
                      required
                    >
                      {filteredAssets.map((office) => (
                        <MenuItem
                          key={office.hrms_id_of_user}
                          value={office.hrms_id_of_user}
                        >
                          {office.hrms_id_of_user}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Asset ID"
                    variant="outlined"
                    fullWidth
                    name="asset_id"
                    value={assetId} // Directly use the assetId from useParams or formData if applicable
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Building</InputLabel>
                    <Select
                      label="Building"
                      name="building" // Ensure this matches the field in your formData
                      value={formData.building}
                      onChange={handleChange}
                      required
                    >
                      {filteredAssets.map((office) => (
                        <MenuItem key={office.building} value={office.building}>
                          {office.building}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Floor</InputLabel>
                    <Select
                      label="Floor"
                      name="floor" // Ensure this matches the field in your formData
                      value={formData.floor}
                      onChange={handleChange}
                      required
                    >
                      {filteredAssets.map((office) => (
                        <MenuItem key={office.floor} value={office.floor}>
                          {office.floor}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Room Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Room Number</InputLabel>
                    <Select
                      label="Room Number"
                      name="room_no" // Ensure this matches the field in your formData
                      value={formData.room_no}
                      onChange={handleChange}
                      required
                    >
                      {filteredAssets.map((office) => (
                        <MenuItem key={office.room_no} value={office.room_no}>
                          {office.room_no}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Serial Number (conditional rendering) */}
                {formData.accessory_id && parseInt(formData.accessory_id) !== 1 && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Serial Number"
                      variant="outlined"
                      fullWidth
                      name="serial_number"
                      value={formData.serial_number}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                )}

                {/* CPU Dropdown */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="CPU Number"
                    variant="outlined"
                    fullWidth
                    name="cpu_number"
                    value={formData.cpu_number}
                    onChange={handleChange}
                    disabled={formData.accessory_id && formData.accessory_id !== 1}
                  />
                </Grid>
                {/* Keyborard */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Keyboard Serial Number"
                    variant="outlined"
                    fullWidth
                    name="keyboard_serial_no"
                    value={formData.keyboard_serial_no}
                    onChange={handleChange}
                    disabled={formData.accessory_id && formData.accessory_id !== 1} // Disable based on accessory_id
                  />
                </Grid>
                {/* Mouse  */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mouse Serial Number"
                    variant="outlined"
                    fullWidth
                    name="mouse_serial_no"
                    value={formData.mouse_serial_no}
                    onChange={handleChange}
                    disabled={formData.accessory_id && formData.accessory_id !== 1} // Disable based on accessory_id
                  />
                </Grid>
                {/* Keyborard */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Monitor Serial Number"
                    variant="outlined"
                    fullWidth
                    name="monitor_serial_no"
                    value={formData.monitor_serial_no}
                    onChange={handleChange}
                    disabled={formData.accessory_id && formData.accessory_id !== 1} // Disable based on accessory_id
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Working Status</InputLabel>
                    <Select
                      label="Working Status"
                      name="working_status_id"
                      value={formData.working_status_id}
                      onChange={handleChange}
                      required
                    >
                      {status.length > 0 ? (
                        status.map((stat) => (
                          <MenuItem key={stat.id} value={stat.id}>
                            {stat.status} {/* Assuming 'status_name' is the label */}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No status available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Assignment Date"
                    variant="outlined"
                    fullWidth
                    name="assignment_date"
                    value={formData.assignment_date}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ marginTop: 2 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Update Asset
                </Button>
              </Box>
            </form>
          </div>

        </Box>

      </motion.div>

    </DashboardLayout>


  );
};

export default UpdateTransferAsset;
