import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'evaluacion-pragma',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración en milisegundos
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
