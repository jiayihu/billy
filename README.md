# Billy

**Billy** is a web application for making invoices easier and faster, built as a way to learn Angular 2.

The stack of technologies used for this project is the following:
- Angular 2
- Typescript
- RxJS
- Webpack
- Bootstrap 4
- CSS next

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

Then put your API keys or usernames in `env.json`. For example:

```json
{
  // geonames uses your account username for API requests
  "geonames": "johndoe"
}
```

```bash
npm run start
```

## Contributing

Issues and Pull Requests are well accepted.
Remember to run `npm run lint` before committing to check if your code changes meet the style guide of this project.
