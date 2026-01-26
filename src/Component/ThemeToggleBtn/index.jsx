import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { WeatherMoon24Regular, WeatherSunny24Regular } from '@fluentui/react-icons';
import { useThemeContext } from '../../Contexts/ThemeContext';

const ThemeToggleButton = ({ sx = {} }) => {
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeContext();

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} arrow>
            <IconButton
                onClick={toggleTheme}
                sx={{
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    width: 35,
                    height: 35,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        transform: 'rotate(180deg) scale(1.1)',
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                    },
                    ...sx,
                }}
            >
                {mode === 'light' ? (
                    <WeatherMoon24Regular style={{ fontSize: 24 }} />
                ) : (
                    <WeatherSunny24Regular style={{ fontSize: 24 }} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggleButton;