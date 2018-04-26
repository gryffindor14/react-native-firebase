# Facebook Login

Rather than users signing in to your app with an email and password, Firebase provides the opportunity to integrate with a number of login providers
(or even your own!). It does this by creating a `credential` from an [OAuth](https://oauth.net/) request which your login provider returns, such as an
`accessToken`.

The Firebase API allows us to call `signInAndRetrieveDataWithCredential` with a generated credential. You guessed it, just as we accomplished in
'Creating a sign in form', the method triggers `onAuthStateChanged` if the request was a success - super simple!

## Installing `react-native-fbsdk`

Luckily as Facebook own React Native, they provide a handy wrapper around their own SDK to integrate with React Native, called [`react-native-fbsdk`](https://github.com/facebook/react-native-fbsdk).

```bash
npm install --save react-native-fbsdk
```

To save explaining how to install this library, refer to their [documentation](https://developers.facebook.com/docs/react-native) on how to
install the library into your React Native project on both Android & iOS.

## Creating a credential

A credential can be generated by first obtaining an `accessToken` from Facebook. This is returned once a user successfully signs in via their
Facebook app or popup (which the `react-native-fbsdk` handles).

In our `Login.js` component, go ahead and create a new method called `_facebookLogin`:

```js
// src/screens/unauthenticated/Login.js

import { AccessToken, LoginManager } from 'react-native-fbsdk'; // import AccessToken and LoginManager

  ...

  _facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);

    } catch (e) {
      console.error(e);
    }
  };
```

There's quite a few steps involved here, which require asynchronous calls to both Facebook and Firebase so it's important to give feedback to your
user whilst this process is running. There's also a number of errors which can occur, caused by the user (such as rejecting the request) or
Firebase not having the Facebook provider enabled, so ensure the error is shown back to the user.

> You may notice here we make use of [`async/await`](https://ponyfoo.com/articles/understanding-javascript-async-await). This allows us to keep our code
> feeling synchronous and handle any false positive errors we want to catch without worry about promise chaining.

### Triggering the method

Quite simply, just like the `_signIn` method we call the `_facebookLogin` method with a custom `Button`:

```jsx
// src/screens/unauthenticated/Login.js

  ...

  render() {
      return (
          <View>
              <TextInput
                  placeholder={'Email Address'}
                  onChangeText={this._updateEmail}
                  value={this.state.email}
              />

              <TextInput
                  placeholder={'Password'}
                  onChangeText={this._updatePassword}
                  value={this.state.password}
              />

              <Button
                title={'Sign In'}
                onPress={this._signIn}
              />

              <Button
                title={'Sign In with Facebook'}
                onPress={this._facebookLogin}
              />
          </View>
      );
  }
```

## Updating your Facebook app ID & secret

Back in step 'Understanding Firebase Authentication', we enabled Firebase as a login provider on Facebook, however may have entered dummy values.

The `react-native-fbsdk` requires you to assign an app ID to your install as mentioned in their [quickstart guide](https://developers.facebook.com/quickstarts/?platform=android).
Ensure that the app you choose also has the credentials on the Firebase console, otherwise you'll get an error back from Firebase when attempting to
sign in with the generated credential.