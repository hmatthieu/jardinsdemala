require("dotenv").config({
  path: ".env",
});

module.exports = {
  siteMetadata: {
    title: `Jardins de Mala`,
    description: `Jardins de Mala`,
    author: `Matthieu Hocquart`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["STRAPI_URL"],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_URL,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: ["articles", "categories", "sous-categories"],
        singleTypes: ["accueil", "entete", "identite", "pied-de-page"],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-typescript",
    "gatsby-plugin-postcss",
    "gatsby-plugin-styled-components",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
