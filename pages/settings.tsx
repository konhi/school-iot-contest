import styles from "../styles/Home.module.css";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [energyLimit, setEnergyLimit] = useState(0);

  useEffect(() => {
    const energyLimit = localStorage.getItem("energyLimit")

    if (energyLimit) {
      setEnergyLimit(parseInt(energyLimit))
    }
  }, []);

  const handleEnergyLimitChange = () => {
    console.log(energyLimit)
    localStorage.setItem("energyLimit", energyLimit.toString())
  };
  
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Link href="/" passHref>
            <IconButton
              href="index"
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ustawienia
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center" }}>
        <h3>Ustaw dzienny limit zużycia prądu</h3>
        <FormControl sx={{ width: "200px", margin: "auto" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Limit Zużycia energii</InputLabel>
          <Input
            type="number"
            value={energyLimit}
            onChange={(e) => setEnergyLimit(parseInt(e.target.value))}
            id="standard-adornment-amount"
            startAdornment={
              <InputAdornment position="start">kWh</InputAdornment>
            }
          />
          <Button sx={{marginTop: "10px"}} variant="contained" size="small" onClick={() => handleEnergyLimitChange()}>zmień</Button>
        </FormControl>
      </Box>
    </>
  );
}
