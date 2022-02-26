import styles from "../styles/Home.module.css";
import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";

export default function Home() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Monitor Energii
        </Typography>
        <Link href="/settings">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <SettingsIcon />
        </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
