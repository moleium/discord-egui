declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_CLIENT_ID: '';
      CLIENT_SECRET: '';
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
