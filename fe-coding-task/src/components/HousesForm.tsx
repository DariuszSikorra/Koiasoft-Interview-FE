import React from "react";
import { Controller } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import SimpleSpinner from "./SimpleSpinner";
import useHousesForm from "hooks/useHousesForm";

const HousesForm = () => {
  const {
    loading,
    quartersList,
    houseTypes,
    savedStatistics,
    control,
    onSubmit,
    handleSubmit,
  } = useHousesForm();

  if (loading) return <SimpleSpinner />;

  if (!quartersList || !houseTypes) return null;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="quarters">Quarters Range</InputLabel>
          <Controller
            name="quarters"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                inputProps={{ name: "quarters", id: "quarters" }}
              >
                {quartersList.map((quarter) => (
                  <MenuItem
                    key={quarter}
                    value={quarter}
                    disabled={
                      quartersList.indexOf(quarter) <
                      quartersList.indexOf("2009K1")
                    }
                  >
                    {quarter}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="houseType">House Type</InputLabel>
          <Controller
            name="houseType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                inputProps={{ name: "houseType", id: "houseType" }}
              >
                {houseTypes.map((houseType) => (
                  <MenuItem key={houseType.value} value={houseType.value}>
                    {houseType.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Fetch Statistics
        </Button>
      </form>
      {savedStatistics && (
        <div>
          <Typography variant="h5" gutterBottom>
            Saved Statistics
          </Typography>
          <Typography>{savedStatistics}</Typography>
        </div>
      )}
    </div>
  );
};

export default HousesForm;
