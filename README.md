Instructions to build the project

Install all dependencies 
// Yarn

Install Android Studio 

Install  jdk 11 using chocolatey 


For Development
Build project on metro 
yarn start 

Run the application 
yarn android


Build apk of the application 
npx react-native build-android --mode=release

Build aab file for the application
not required
./gradlew app:assembleRelease

for aab
./gradlew app:bundleRelease
   