/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/basics-done` | `/email-signin` | `/gender` | `/lib/apollo-client` | `/lib/auth` | `/lib/file-utils` | `/lib/firebaseConfig` | `/lib/string-utils` | `/modal` | `/name` | `/sign-up-success` | `/tabs` | `/tabs/two` | `/test-1` | `/utils/constants`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
