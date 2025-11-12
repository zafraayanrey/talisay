import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

export default function App() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      contactNumber: "",
      email: "",
      tin: "",
      citizenship: "",
      gender: "",
    },
  });

  const [openSnack, setOpenSnack] = useState(false);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Submitted data:", data);
      setOpenSnack(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Paper sx={{ maxWidth: 800, width: "100%", p: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Locational Clearance — Business Registration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please fill out the applicant details below. Fields marked with * are
          required.
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full name *"
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="contactNumber"
                control={control}
                rules={{
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9+\-() ]{7,20}$/,
                    message: "Enter a valid contact number",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contact number *"
                    fullWidth
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Home address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Complete home address *"
                    fullWidth
                    multiline
                    minRows={2}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email address *"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="tin"
                control={control}
                rules={{
                  required: "TIN is required",
                  pattern: {
                    value: /^[0-9]{9,12}$/,
                    message: "Enter a valid TIN (numbers only)",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="TIN (Tax Identification Number) *"
                    fullWidth
                    error={!!errors.tin}
                    helperText={errors.tin?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="citizenship"
                control={control}
                rules={{ required: "Citizenship is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Citizenship *"
                    select
                    fullWidth
                    error={!!errors.citizenship}
                    helperText={errors.citizenship?.message}
                  >
                    <MenuItem value="Philippine">Philippine</MenuItem>
                    <MenuItem value="Dual">Dual / Dual Citizenship</MenuItem>
                    <MenuItem value="Foreign">Foreign</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Gender (optional)</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="prefer_not"
                        control={<Radio />}
                        label="Prefer not to say"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: 1 }}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={() => setOpenSnack(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Application submitted (mock). Check console for data.
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
