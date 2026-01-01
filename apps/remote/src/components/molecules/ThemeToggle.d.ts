import React from 'react';
export interface ThemeToggleProps {
    isDark: boolean;
    onToggle: () => void;
}
declare const ThemeToggle: React.FC<ThemeToggleProps>;
export default ThemeToggle;
