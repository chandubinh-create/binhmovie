
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.binhvietsub.app',
  appName: 'Bình VietSub CC',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#050505",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#FFD700"
    }
  }
};

export default config;
