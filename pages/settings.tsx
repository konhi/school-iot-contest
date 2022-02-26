import styles from "../styles/Home.module.css";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

export default function Home() {
  return (
    <AppBar position="fixed">
      <Toolbar>
      <Link href="/" passHref>

      <IconButton href="index" size="large" edge="start" color="inherit" aria-label="menu">
        <ArrowBackIcon />
      </IconButton>
      </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ustawienia
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
