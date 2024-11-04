import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Starter 6fc300',
  entryPointUriPath,
  cloudIdentifier: 'gcp-us',
  env: {
    development: {
      initialProjectKey: 'merchent-center-poc',
    },
    production: {
      applicationId: 'cm32vwrus0001qvryrbkb28av',
      url: 'https://mc.us-central1.gcp.commercetools.com/merchent-center-poc/home/new',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'ConfigUI',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    // {
    //   uriPath: 'channels',
    //   defaultLabel: 'Channels',
    //   labelAllLocales: [],
    //   permissions: [PERMISSIONS.View],
    // },
    {
      uriPath: 'new',
      defaultLabel: 'New Page',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;
