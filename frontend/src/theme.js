import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme(
  {
  typography:
  {
    useNextVariants: true
  },
  palette:
  {
    common:
    { 
      black: "#000",
      white: "#fff"
    },
    background:
    {
      paper: "rgba(232, 234, 246, 1)",
      default: "rgba(197, 202, 233, 1)"
    },
    primary:
    {
      light: "rgba(92, 107, 192, 1)",
      main: "rgba(57, 73, 171, 1)",
      dark: "rgba(40, 53, 147, 1)",
      contrastText: "#fff"
    },
    secondary:
    {
      light: "rgba(171, 71, 188, 1)",
      main: "rgba(142, 36, 170, 1)",
      dark: "rgba(106, 27, 154, 1)",
      contrastText: "#fff"
    },
    error:
    {
      light: "rgba(239, 83, 80, 1)",
      main: "rgba(229, 57, 53, 1)",
      dark: "rgba(198, 40, 40, 1)",
      contrastText: "#fff"
    },
    text:
    {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});
