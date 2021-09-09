import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { blueTheme } from "./theme";
import { WalletProvider } from "./utils/wallet";
import { ConnectionProvider } from "./utils/connection";
import { SnackbarProvider } from "notistack";
import { LayoutProvider } from "./utils/layout";
import { MarketProvider } from "./utils/market";
import { Helmet } from "react-helmet";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

//Making Theme interface
interface ThemeContextInterface {
  theme: boolean;
  nextTheme: boolean;
  toggleTheme: () => void;
}

//Create theme Context
export const ThemeContext = React.createContext<ThemeContextInterface>({
  theme: false, // true represent blue theme
  nextTheme: false, //here false represent purple theme
  toggleTheme: () => {},
});

const App = ({ children }: { children: React.ReactNode }) => {
  let localTheme = localStorage.getItem("theme") || "";
  const [theme, setTheme] = useState(localTheme === "true" ? true : false); // by defualt is blue
  const nextTheme = !theme;

  const value = {
    theme,
    nextTheme,
    toggleTheme: () => {
      setTheme(!theme);
      localStorage.setItem("theme", JSON.stringify(!theme));
    },
  };

  return (
    <ConnectionProvider>
      <Helmet>
        <style>{`body { background: ${
          theme
            ? "#1D1C28"
            : "linear-gradient(-135deg, #18132B, #220C22, #210922,#210922, #210922) !important"
        }}`}</style>
      </Helmet>
      <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
        <WalletProvider>
          <MarketProvider>
            <LayoutProvider>
              <ThemeContext.Provider value={value}>
                <MuiThemeProvider
                  theme={blueTheme}
                >
                  <CssBaseline />
                  {children}
                </MuiThemeProvider>
              </ThemeContext.Provider>
            </LayoutProvider>
          </MarketProvider>
        </WalletProvider>
      </SnackbarProvider>
    </ConnectionProvider>
  );
};

export default App;
