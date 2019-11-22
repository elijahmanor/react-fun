import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { Router, Link, navigate } from "@reach/router";
import "prism-themes/themes/prism-darcula.css";

const version = "v2.4.0";
const date = "Nov 21, 2019";
const drawerWidth = 240;
// const basepath = window.location.pathname;

const NAVIGATION = [
  {
    text: "Home",
    Component: require("./mdx/01-Home.mdx").default,
    path: "home"
  },
  {
    text: "What is React?",
    Component: require("./mdx/02-WhatIsReact.mdx").default,
    path: "what-is-react"
  },
  {
    text: "React Sans Build",
    Component: require("./mdx/03-ReactSansBuild.mdx").default,
    path: "react-sans-build"
  },
  { text: "JSX", Component: require("./mdx/04-JSX.mdx").default, path: "jsx" },
  {
    text: "Create React App",
    Component: require("./mdx/05-CreateReactApp.mdx").default,
    path: "create-react-app"
  },
  {
    text: "Components",
    Component: require("./mdx/06-Components.mdx").default,
    path: "components"
  },
  {
    text: "What are Hooks?",
    Component: require("./mdx/07-WhatAreHooks.mdx").default,
    path: "what-are-hooks"
  },
  {
    text: "useState",
    Component: require("./mdx/08-UseState.mdx").default,
    path: "usestate"
  },
  {
    text: "useEffect",
    Component: require("./mdx/09-UseEffect.mdx").default,
    path: "useeffect"
  },
  {
    text: "Rules of Hooks",
    Component: require("./mdx/10-RulesOfHooks.mdx").default,
    path: "rules-of-hooks"
  },
  {
    text: "Custom Hooks",
    Component: require("./mdx/11-CustomHooks.mdx").default,
    path: "custom-hooks"
  },
  {
    text: "Community Hooks",
    Component: require("./mdx/12-CommunityHooks.mdx").default,
    path: "community-hooks"
  },
  {
    text: "Forms",
    Component: require("./mdx/13-Forms.mdx").default,
    path: "forms"
  },
  {
    text: "Context",
    Component: require("./mdx/14-Context.mdx").default,
    path: "context"
  },
  {
    text: "Data Flow",
    Component: require("./mdx/15-DataFlow.mdx").default,
    path: "data-flow"
  },
  {
    text: "useReducer",
    Component: require("./mdx/16-UseReducer.mdx").default,
    path: "usereducer"
  },
  {
    text: "Unit Testing",
    Component: require("./mdx/17-UnitTesting.mdx").default,
    path: "unit-testing"
  },
  {
    text: "CSS in JS",
    Component: require("./mdx/18-CssInJs.mdx").default,
    path: "css-in-js"
  },
  {
    text: "Performance",
    Component: require("./mdx/19-Performance.mdx").default,
    path: "performance"
  },
  {
    text: "SVG Library",
    Component: require("./mdx/20-SvgLibrary.mdx").default,
    path: "svg-library"
  },
  {
    text: "Component Library",
    Component: require("./mdx/21-ComponentLibrary.mdx").default,
    path: "component-library"
  },
  {
    text: "Misc",
    Component: require("./mdx/99-Misc.mdx").default,
    path: "misc"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const navIndex = NAVIGATION.findIndex(n => n.path === currentPage);
  const Component = NAVIGATION[navIndex].Component;
  const hasNext =
    navIndex !== NAVIGATION.filter(item => item.path !== "misc").length - 1;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleNext = () => setCurrentPage(NAVIGATION[navIndex + 1].path);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span
          style={{ cursor: "help", margin: "1rem", color: "#666" }}
          title={date}
        >
          {version}
        </span>
        {hasNext && (
          <button
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              border: "transparent"
            }}
            onClick={handleNext}
          >
            <i className="material-icons">keyboard_arrow_right</i>
          </button>
        )}
      </div>
      <Divider />
      <List>
        {NAVIGATION.filter(item => item.path !== "misc").map(
          ({ text, path }, index) => (
            <ListItem
              button
              selected={path === currentPage}
              key={text}
              onClick={() => {
                // navigate(path);
                setCurrentPage(path);
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  function handleKeyPress({ ctrlKey, code }) {
    if (ctrlKey && code === "KeyM") {
      setCurrentPage("misc");
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className="App-heading">
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="http://b.link/react-fun"
            >
              React Fundamentals: Hooks Edition
            </a>
            <a
              href="https://twitter.com/elijahmanor?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              data-size="large"
              data-show-count="false"
            >
              Follow @elijahmanor
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Component />
        {/* <Router basepath={basepath} primary={false}>
          {NAVIGATION.map(({ Component, path }) => (
            <Component path={path} />
          ))}
        </Router> */}
        {hasNext && (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next Section
          </Button>
        )}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.object
};

export default ResponsiveDrawer;
