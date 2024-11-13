import {
  AppShell,
  Burger,
  ColorScheme,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CgCalculator } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsBarChartLine, BsPlusCircle } from "react-icons/bs";
import NavigationLink from "./NavigationLink";
import DarkLightThemeButton from "./DarkLightThemeButton";
import HomePage from "../pages/HomePage";
import AddBudgetPage from "../pages/AddBudgetPage";
import AddExpensePage from "../pages/AddExpensePage";
import { useLocalStorage } from "@mantine/hooks";
import DisplayCategoriesPage from "../pages/DisplayCategoriesPage";

type HistoryElement = {
  id: string;
  label: string;
  amount: number;
  type: string;
};

const MainAppShell = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    // Handles providing the correct color scheme to child elements
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <AppShell
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 220, lg: 275 }}
            >
              <NavigationLink
                label="Home"
                icon={<AiOutlineHome style={{ fontSize: '24px', color: 'blue', transform: 'scale(1.2)' }} />}
                link="/"
              />
              <NavigationLink
                label="Add an Expense"
                icon={<BsPlusCircle style={{ fontSize: '24px', color: 'green', transform: 'scale(1.2)' }} />}
                link="/newExpense"
              />
              <NavigationLink
                label="Add Your Income"
                icon={<MdAttachMoney style={{ fontSize: '24px', color: 'orange', transform: 'scale(1.2)' }} />}
                link="/newBudget"
              />
              <NavigationLink
                label="View Your Transaction"
                icon={<BsBarChartLine style={{ fontSize: '24px', color: 'red', transform: 'scale(1.2)' }} />}
                link="/categories"
              />
            </Navbar>
            
            }
            header={
              <Header
                height={{ base: 50, md: 70 }}
                p="md"
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[1]
                      : theme.colors.gray[9],
                  fontSize: "25px",
                })}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <img src="././public/logo.png" alt="Expense Tracker" style={{ height: "50px" }}/>
                    <Text ml={10}>Expense Tracker</Text>
                  </div>
                  <DarkLightThemeButton />
                </div>
              </Header>
            }
          >
            {/* Handle Routing */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/newExpense" element={<AddExpensePage />} />
              <Route path="/newBudget" element={<AddBudgetPage />} />
              <Route path="/categories" element={<DisplayCategoriesPage />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default MainAppShell;