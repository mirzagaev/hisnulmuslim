### **assets**
The `assets` directory is where you should put all your static assets, such as fonts and images. It's a good idea to organize these assets into separate subdirectories for each asset type. For example:

```
assets
  |--- fonts
  |--- images
```

### **screens**
The `screens` directory is where you should put all your application screens or pages. Each screen should have its own directory with the following files:

- `index.js`: This will export default screenName to shortened import path
- `styles.ts`: The styles for the screen.
- `helper.ts`: Utility function like any business or state management fuction can be put here. For example, function which returns `buttonColor` based on status. Ideally, you should try to write as little as possible logic into your component file. This will make your code more abstract and testable
- `screenName.tsx`: The TypeScript file for the screen. In this file you will define your UI.
- `screenName.test.tsx`: The test file for the screen.

### **navigation**
The `navigation` directory is where you should put all your navigation-related code. This includes:

- `NavigationContainer`: The top-level component that wraps all the screens.
- `Route`: The folder where you define your application routes like stack, tab bar and drawers.
- `NavigationService`: This file will contain ref of your route and will help in navigation from outside components, like deep links or notification.

### **components**
The `components` directory is where you should put all your reusable components. Each component should have its own directory with the following files (it is similar to the screen folder structure):

- `index.ts`: The main component file.
- `ComponentName.tsx`: The TypeScript file for the component.
- `styles.ts`: The styles for the component.
- `helper.ts`: Any helper functions related to the component.
- `useAnimated.ts`: (optional): Any animation-related hooks for the component.

### **hooks**
The `hooks` directory is where you should put all your custom hooks. Each hook should have its own file. For example:

```
hooks
  |--- useBackHandler.ts
  |--- useKeyboard.ts
```

### **types**
The `types` folder should contain all the TypeScript interfaces and types in your app. It's important to use TypeScript in your React Native app because it can catch errors at compile-time instead of run-time.

The `types` folder should contain a separate file for each interface or type. For example, `UserInterface.ts` can contain all the interfaces related to users in your app.

### **utils**
The `utils` folder contains various utility functions that are not related to a specific feature or module of the app. Here are some examples of files that might be included in this folder:

```
utils
  |--- Analytics.ts
  |--- CommonUtils.ts
  |--- Logger.ts
  |--- ErrorManager.ts
  |--- DateTimeUtils.ts
  |--- EncryptedStore.ts
  |--- string.ts
  |--- constants.ts
  |--- enums.ts
```