import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://api.first.org/data/v1/countries"
        );
        setCountries(Object.values(response.data.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  const defaultValues = {
    gender: "Male",
    ownershipType: "Single Proprietorship",
    typeOfOccupancy: "Owned",
    barangay: "Biasong",
    city: "City of Talisay",
    citizenship: "Philippines",
  };

  const { handleSubmit, control, reset, setValue, watch } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const uploadedFiles = watch("requirements") || [];

  const onSubmit = (data) => {
    console.log(data);
    alert("Form submitted successfully!");
  };

  const cleanInput = (value) => value?.trim().replace(/\./g, "") || "";

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("requirements", files, { shouldValidate: true });
  };

  const barangayOptions = [
    "Biasong",
    "Bulacao",
    "Cadulawan",
    "Camp IV",
    "Cansojong",
    "Dumlog",
    "Jaclupan",
    "Lagtang",
    "Lawaan I",
    "Lawaan II",
    "Lawaan III",
    "Linao",
    "Maghaway",
    "Manipis",
    "Mohon",
    "Poblacion",
    "Pooc",
    "San Isidro",
    "San Roque",
    "Tabunok",
    "Tangke",
    "Tapul",
  ];

  const sections = {
    "Personal Information": [
      { name: "firstName", label: "First Name", required: true },
      { name: "middleName", label: "Middle Name" },
      { name: "lastName", label: "Last Name", required: true },
      { name: "suffix", label: "Suffix" },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        required: true,
      },
      { name: "street", label: "Street", required: true },
      {
        name: "barangay",
        label: "Barangay",
        type: "select",
        options: barangayOptions,
        required: true,
      },
      { name: "city", label: "City", required: true },
      {
        name: "contactNumber",
        label: "Contact Number",
        required: true,
        pattern: /^[0-9]{10,11}$/,
      },
      {
        name: "emailAddress",
        label: "Email Address",
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      { name: "tin", label: "TIN" },
      {
        name: "citizenship",
        label: "Citizenship",
        type: "select",
        options: countries.map((country) => country.country),
        required: true,
      },
    ],

    "Business Information": [
      { name: "businessName", label: "Business / Trade Name", required: true },
      { name: "typeOfBusiness", label: "Type of Business" },
      { name: "natureOfBusiness", label: "Nature / Line of Business" },
      { name: "businessAddress", label: "Business Address" },
      {
        name: "ownershipType",
        label: "Ownership Type",
        type: "select",
        options: [
          "Single Proprietorship",
          "Partnership",
          "Corporation",
          "Cooperative",
          "Others",
        ],
      },
      {
        name: "areaOccupied",
        label: "Area Occupied (sqm)",
        type: "number",
        min: 0,
      },
      { name: "floorLevel", label: "Floor Level" },
    ],

    "Property Details": [
      { name: "lotNumber", label: "Lot / Block Number" },
      { name: "propertyStreet", label: "Street" },
      { name: "propertyBarangay", label: "Barangay" },
      { name: "propertyCity", label: "City" },
      {
        name: "typeOfOccupancy",
        label: "Type of Occupancy",
        type: "select",
        options: ["Owned", "Rented", "Leased"],
      },
      { name: "lotOwner", label: "Name of Lot Owner" },
      {
        name: "landUseClassification",
        label:
          "Land Use Classification (e.g. Commercial, Residential, Industrial)",
      },
      { name: "zoningClassification", label: "Zoning Classification" },
      {
        name: "numEmployees",
        label: "Number of Employees",
        type: "number",
        min: 0,
      },
      {
        name: "projectCost",
        label: "Project Cost / Investment",
        type: "number",
        min: 0,
      },
    ],
  };

  const formatTIN = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 12); // only digits, max 12
    return numbers.replace(/(\d{3})(?=\d)/g, "$1-").replace(/-$/, "");
  };

  const formatNumberWithCommas = (value) => {
    if (!value) return "";
    const num = value.toString().replace(/,/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const renderField = (field) => (
    <Grid item xs={12} sm={6} md={2.4} key={field.name}>
      <Controller
        name={field.name}
        control={control}
        rules={{
          required: field.required && `${field.label} is required`,
          pattern: field.pattern && {
            value: field.pattern,
            message: `Invalid ${field.label}`,
          },
        }}
        render={({ field: f, fieldState }) => {
          const handleChange = (e) => {
            let value = e.target.value;

            if (field.name === "tin") {
              value = formatTIN(value);
            } else if (field.name === "projectCost") {
              value = formatNumberWithCommas(value);
            }

            f.onChange(value);
          };

          const handleBlur = (e) => {
            if (field.type !== "number" && field.type !== "select") {
              const cleaned = cleanInput(e.target.value);
              f.onChange(cleaned);
            }
          };

          if (field.type === "select") {
            return (
              <TextField
                {...f}
                select
                label={field.label + (field.required ? " *" : "")}
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {field.options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            );
          }

          return (
            <TextField
              {...f}
              label={field.label + (field.required ? " *" : "")}
              fullWidth
              size="small"
              type={field.type === "number" ? "text" : "text"} // keep text for commas
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          );
        }}
      />
    </Grid>
  );

  return (
    <Paper sx={{ p: 4, maxWidth: 1200, mx: "auto", my: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Registration Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {Object.entries(sections).map(([title, fields]) => (
          <Box key={title} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {fields.map(renderField)}
            </Grid>
          </Box>
        ))}

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            File Requirements
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Button variant="contained" component="label">
            Upload Files
            <input
              type="file"
              hidden
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </Button>

          {uploadedFiles.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight={500}>
                Uploaded Files:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button type="button" variant="outlined" onClick={() => reset()}>
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
