# Space Shopper

Space Shopper is a prototype e-commerce site that sells imaginary Space Vacations.<br />
Built with Express.js, React, Redux, Postgres, Sequelize, Bootstrap, Passport, and OAuth.<br />
Project was run using agile development with Waffle.io.

Visit the site at https://space-shopper-app.herokuapp.com/

# For Developers

<b>Local Development</b>
<ul>
  <li>Fork the Repo</li>
  <li>Git Clone</li>
  <li>npm install</li>
  <li>npm run dev</li>
  <li>npm run seed</li>
  <li>Navigate to http://localhost:1337/</li>
</ul>

<b>Heroku Deployment</b>
<ul>
  <li>You must have the following:
    <ul>
      <li>Heroku account</li>
      <li>Node / npm installed locally</li>
      <li>Heroku Command Line Interface installed locally</li>
    </ul>
  </li>
  <li>In the command line:
    <ul>
      <li>heroku login</li>
      <li>heroku create appNameHere</li>
      <li>heroku addons:create heroku-postgresql:hobby-dev</li>
      <li>npm run deploy-heroku</li>
      <li>heroku run npm run seed</li>
    </ul>
  </li>
</ul>
