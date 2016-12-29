# Billy

**Billy** is a web application for making invoices easier and faster, built as a way to learn Angular 2.

The stack of technologies used for this project is the following:
- Angular 2 with Typescript
- RxJS
- Redux
- Firebase
- Bootstrap 4
- CSS next
- Webpack

> The project is still a Work in Progress, but you can run it if you wish to have a look to nice features like Boostrap 4 or CSS variables.

## Install

```bash
yarn install
```
or
```bash
npm install
```

## Start the application

To run the application you have first to register to the following services, which offer free APIs used in this application:
  
  1. [Geonames](http://www.geonames.org/login) for data about countries, provinces and cities
  2. [Firebase](https://console.firebase.google.com/) for authentication and database
      1. [Enable password based authentication](https://firebase.google.com/docs/auth/web/password-auth)

Then put your API keys or usernames in a `env.json` file at the root of the project. You can find an example in [example-env.json](example-env.json):

```javascript
{
  // geonames uses your account username for API requests
  "geonames": "johndoe",
  "FIREBASE_APIKEY": "your_firebase_account",
  "FIREBASE_AUTHDOMAIN": "your_firebase_account",
  "FIREBASE_DATABASEURL": "your_firebase_account",
  "FIREBASE_STORAGE": "your_firebase_account"
}
```

Now you're ready to start the application:

```bash
npm run start
```

## Contributing

Issues and Pull Requests are well accepted.
Remember to run `npm run lint` before committing to check if your code changes meet the style guide of this project.
