'use client'

import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material";

type CustomInputProps = TextFieldProps & {
  colors?: {
    border?: string;
    hoverBorder?: string;
    focusedBorder?: string;
    focusedLabel?: string;
    inputText?: string;
    label?: string;
    helperText?: string;
  };
}

const customTheme = (outerTheme: Theme, colors: CustomInputProps['colors'] = {}) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": colors.border || "#000000",
            "--TextField-brandBorderHoverColor": colors.hoverBorder || colors.border || "#000000",
            "--TextField-brandBorderFocusedColor": colors.focusedBorder || colors.border || "#000000",
            "& label": {  // Estilo para o label em estado normal
              color: colors.label || colors.inputText || "#000000",
            },
            "& label.Mui-focused": {  // Estilo para o label quando focado
              color: colors.focusedLabel || colors.focusedBorder || colors.border || "#000000",
            },
            "& .MuiFormHelperText-root": {
              color: colors.helperText || colors.inputText || "#000000",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: colors.inputText || "#000000",
            input: {
              color: colors.inputText || "#000000",
            }
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            color: colors.inputText || "#000000",
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFormLabel: {  // Adicionando estilos específicos para o FormLabel
        styleOverrides: {
          root: {
            color: colors.label || colors.inputText || "#000000",
            "&.Mui-focused": {
              color: colors.focusedLabel || colors.focusedBorder || colors.border || "#000000",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: colors.inputText || "#000000",
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ colors, ...props }, ref) => {
    const outerTheme = useTheme();

    return (
      <ThemeProvider theme={customTheme(outerTheme, colors)}>
        <TextField {...props} inputRef={ref} />
      </ThemeProvider>
    );
  }
);

Input.displayName = "Input"

export default Input;