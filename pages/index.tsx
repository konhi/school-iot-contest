import styles from "../styles/Home.module.css";
import { AppBar, IconButton, Toolbar, Typography, Button, Paper } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { useEffect } from "react";
import { firebaseCloudMessaging } from "../utils/webPush";

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
  const ENERGY_TODAY_URL = 'https://cors.eu.org/' + 'https://grafana.wybran.dev/api/datasources/proxy/1/query?db=telegraf&q=SELECT%20mean(%22ENERGY_Today%22)%20FROM%20%22mqtt_consumer%22%20WHERE%20time%20%3E%3D%20now()%20-%201m%20and%20time%20%3C%3D%20now()%20GROUP%20BY%20time(1d)%20fill(null)&epoch=ms'

  useEffect(() => {
    firebaseCloudMessaging.init()
    async function getTodayEnergy() {
        return fetch(ENERGY_TODAY_URL)
          .then(response => response.json())
          .then(json => json.results[0].series[0].values[0][1])
      }

      // @ts-ignore
      function getIntervalTime() {
        // @ts-ignore
        return parseInt(localStorage.getItem('notificationsInterval')) * 60 * 1000 || 10 * 60 * 1000
      }

      function createNotification(energyDifference: number) {
        console.info('Creating notification')

        // try fixing stupid notification api not working on mobiles by using service workers
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(`Uh-oh! 😦 Przekroczyłeś limit energii!`, {
            body: `Limit przekroczony o ${energyDifference} kWh. Może spróbujesz wyłączyć jakieś urządzenia, aby oszczędzić pieniądze i nie szkodzić srodowisku? 🌏💸`
            });
        });
        

        // return new Notification(`Uh-oh! 😦 Przekroczyłeś limit energii!`, {
        //   body: 'Może spróbujesz wyłączyć jakieś urządzenia, aby oszczędzić pieniądze i nie szkodzić srodowisku? 🌏💸'
        // })
      }


      setInterval(() => {
        getTodayEnergy().then(energy => {
          // @ts-ignore
          const energyLimit = parseInt(localStorage.getItem('energyLimit'))
          if (energy > energyLimit) {
            const energyDifference = (energy - energyLimit).toFixed(2)
            if (Notification.permission === "granted") {
              // If it's okay let's create a notification
              createNotification(energyDifference)
            }
          
            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== "denied") {
              Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                  createNotification(energyDifference)
                }
              });
            }
          }
        })
      }, getIntervalTime())

  })

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Monitor Zużytej Energii
          </Typography>
          <Link href="/settings" passHref>
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
            <Paper>
            <iframe
            className={styles.panelContent}
              src={
                "https://grafana.wybran.dev/d-solo/FYqhqBa7k/monitor-energii?orgId=1&refresh=5s&theme=light&panelId=" +
                panelId
              }
            ></iframe>
            </Paper>
          </li>
        ))}
      </ul>
    </div>
  );
}
