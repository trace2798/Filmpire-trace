import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createContext, useState, useMemo } from 'react'

//This is going to be a Context. this createContext is a react utility function
export const ColorModeContext = createContext();

//children is a default prop we get with react functions or components.
const ToggleColorMode = ({ children }) => {
    const [mode, setMode] = useState('light');

    const toggleColorMode = () => {
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
    }
    //we are using another hook called useMemo. Like useEffect hook it also has use dependence array. This is going to only change when mode channges.
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        }
    }), [mode])
  return (
    //Provider is a build in component when we create a build me context.
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode}}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode