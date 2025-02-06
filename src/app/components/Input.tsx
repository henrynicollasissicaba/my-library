import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material";

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#000000",
            "--TextField-brandBorderHoverColor": "#000000",
            "--TextField-brandBorderFocusedColor": "#000000",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const Input = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const outerTheme = useTheme();

    return (
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField {...props} inputRef={ref} />
      </ThemeProvider>
    );
  }
);

export default Input;
