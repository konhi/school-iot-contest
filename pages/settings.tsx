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
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [energyLimit, setEnergyLimit] = useState(0);
  const [notificationsInterval, setNotificationsInterval] = useState(0);

  useEffect(() => {
    const energyLimit = localStorage.getItem("energyLimit")

    if (energyLimit) {
      setEnergyLimit(parseInt(energyLimit))
    }

    const notificationsInterval = localStorage.getItem("notificationsInterval")

    if (notificationsInterval) {
      setEnergyLimit(parseInt(notificationsInterval))
    }
  }, []);

  const handleEnergyLimitChange = () => {
    localStorage.setItem("energyLimit", energyLimit.toString())
  };

  const handleNotificationsIntervalChange = () => {
    localStorage.setItem("notificationsInterval", notificationsInterval.toString())
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
        <h3>Spersonalizuj aplikację</h3>
        <FormControl sx={{ width: "80%", margin: "auto" }} variant="standard">
          <TextField
            type="number"
            value={energyLimit}
            onChange={(e) => setEnergyLimit(parseInt(e.target.value))}
            id="standard-adornment-amount"
            label="Limit zużycia energii"
            InputProps={{
              startAdornment: <InputAdornment position="start">kWh</InputAdornment>,
            }}
          />

          <br>
          </br>
          <TextField
            type="number"
            label="Interwał powiadomień"
            value={notificationsInterval}
            onChange={(e) => setNotificationsInterval(parseInt(e.target.value))}
            id="standard-adornment-notifications"
            InputProps={{
              startAdornment: <InputAdornment position="start">minuty</InputAdornment>,
            }}
          />
          <Button sx={{marginTop: "10px"}} variant="contained" size="large" onClick={() => {handleEnergyLimitChange(), handleNotificationsIntervalChange()}}>zmień</Button>
        </FormControl>
      </Box>
    </>
  );
}
