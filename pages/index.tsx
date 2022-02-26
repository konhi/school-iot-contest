import styles from "../styles/Home.module.css";
import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

export async function getStaticProps() {
  const dashboardId = "FYqhqBa7k";
  const url = `https://grafana.wybran.dev/api/dashboards/uid/${dashboardId}`;

  const response = await fetch(url);
  const json = await response.json();

  try {
    // could be fixed by validating schema
    // @ts-ignore
    const panelIds = json.dashboard.panels.map(panel => panel.id);

    return {
      props: {
        panelIds,
      },
    };
  } catch (error) {
    console.error(error);
    return;
  }
}

// @ts-ignore
export default function Home({ panelIds }) {
  return (
    <div>
      <AppBar position="sticky">
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
      <ul className={styles.panels}>
        {panelIds.map((panelId: number[]) => (
          <li className={styles.panel} key={"panel-" + panelId}>
            <iframe
            className={styles.panelContent}
              src={
                "https://grafana.wybran.dev/d-solo/FYqhqBa7k/monitor-energii?orgId=1&refresh=5s&theme=light&panelId=" +
                panelId
              }
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
}
