export const UI_VERSION = "1.0.0";
export const UI_VERSION_COLOR = "#3b82f6"; // blue-500 para version 1.0.0

// Para uso en componentes que quieran mostrar la versión
export const getVersionInfo = () => ({
  version: UI_VERSION,
  color: UI_VERSION_COLOR,
  displayName: `UI v${UI_VERSION}`,
});

// Nueva utilidad: verificar si es versión beta
export const isBetaVersion = () => UI_VERSION.includes('beta');

// Nueva utilidad: obtener versión corta (sin patch si es .0)
export const getShortVersion = () => {
  const parts = UI_VERSION.split('.');
  if (parts[2] === '0') {
    return `${parts[0]}.${parts[1]}`;
  }
  return UI_VERSION;
};
