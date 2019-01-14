declare module 'react-native-firebase' {
  export type FirebaseNativeModuleName =
    | 'RNFBAdMob'
    | 'RNFBAnalytics'
    | 'RNFBAuth'
    | 'RNFBRemoteConfig'
    | 'RNFBCrashlytics'
    | 'RNFBDatabase'
    | 'RNFBFirestore'
    | 'RNFBFunctions'
    | 'RNFBFiam'
    | 'RNFBInstanceId'
    | 'RNFBInvites'
    | 'RNFBLinks'
    | 'RNFBMessaging'
    | 'RNFBMLKit'
    | 'RNFBNotifications'
    | 'RNFBPerformance'
    | 'RNFBStorage'
    | 'RNFBUtils';

  export type FirebaseNamespace =
    | 'admob'
    | 'analytics'
    | 'auth'
    | 'config'
    | 'crashlytics'
    | 'database'
    | 'firestore'
    | 'functions'
    | 'fiam'
    | 'iid'
    | 'invites'
    | 'links'
    | 'messaging'
    | 'ml'
    | 'notifications'
    | 'perf'
    | 'storage'
    | 'utils';

  export interface FirebaseOptions {
    apiKey: string;
    appId: string;
    databaseURL: string;
    messagingSenderId: string;
    projectId: string;
    storageBucket: string;
  }

  export class FirebaseApp {

    readonly name: string;
    readonly options: FirebaseOptions;
    onReady: () => Promise<FirebaseApp>;

    // TODO
    [key: string]: Object;
  }

  export class FirebaseModule {
    app: FirebaseApp;

    // TODO
    [key: string]: Object;
  }
}
