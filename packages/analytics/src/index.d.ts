import { FirebaseModule } from 'react-native-firebase';

declare module '@react-native-firebase/analytics' {
  export class FirebaseAnalytics extends FirebaseModule {
    private constructor();

    logEvent(name: string, params: Object): Promise<void>;

    setAnalyticsCollectionEnabled(enabled: boolean): Promise<void>;

    setCurrentScreen(screenName: string, screenClassOverride: string): Promise<void>;

    setMinimumSessionDuration(milliseconds: number): Promise<void>;

    setSessionTimeoutDuration(milliseconds: number): Promise<void>;

    setUserId(id: string | null): Promise<void>;

    setUserProperty(name: string, value: string | null): Promise<void>;

    setUserProperties(object: { [key: string]: string | null }): Promise<void>;
  }
}
