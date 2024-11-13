<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a>
  <b>Custom Application starter template</b>
</p>

A starter template to [develop Custom Applications](https://docs.commercetools.com/merchant-center-customizations/custom-applications) for the Merchant Center.

# Installing Node JS

Install Node JS Version 20 or above

# Installing the dependencies

npm install --legacy-peer-deps

# Run the server in local

npm start

# Configure the Project Name

Update initialProjectKey with Project Key[name of the project created in CommerceTools] in custom-application-config.mjs file.
Update the Project Key in 2 files(1. src\components\custom-objects\create-custom-object.js and 2. src\components\custom-objects\custom-object.js) where we are using axiosHandler
