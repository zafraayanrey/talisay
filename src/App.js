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

import { barangayOptions, defaultValues, getSections } from "./arrays/array";
import { cleanInput } from "./helpers/cleanInput";
import { formatTin } from "./helpers/formatTin";
import { formatNumber } from "./helpers/formatNumber";

function App() {
  const [countries, setCountries] = useState([]);
  const { handleSubmit, control, reset, setValue, watch } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const uploadedFiles = watch("requirements") || [];

  // Fetch countries from API
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

  // Build sections dynamically with fetched countries
  const sections = getSections(countries);

  function onSubmit(data) {
    console.log(data);
    alert("Form submitted successfully!");
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setValue("requirements", files, { shouldValidate: true });
  }

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
              value = formatTin(value);
            } else if (field.name === "projectCost") {
              value = formatNumber(value);
            }
            f.onChange(value);
          };

          const handleBlur = (e) => {
            let value = e.target.value;

            if (field.name === "emailAddress") {
              // Trim spaces only for email
              f.onChange(value.trim());
            } else if (field.type !== "number" && field.type !== "select") {
              // Clean input for other fields
              f.onChange(cleanInput(value));
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

export default App;
