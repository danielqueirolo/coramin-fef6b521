
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.92b4da4d0fdb48229a5178a7ec13394b',
  appName: 'Coramin',
  webDir: 'dist',
  server: {
    url: 'https://92b4da4d-0fdb-4822-9a51-78a7ec13394b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'key0',
    }
  }
};

export default config;
