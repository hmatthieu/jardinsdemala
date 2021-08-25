const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const projectTemplate = path.resolve(`src/components/StandalonePage.tsx`);

  return graphql(`
    query Pages {
      allStrapiPages {
        nodes {
          Contenu
          SEO {
            Description
            Favicon {
              url
            }
            Image {
              formats {
                medium {
                  url
                }
              }
            }
            Titre
          }
          Slug
          Titre
        }
      }
      strapiAccueil {
        SEO {
          Description
          Favicon {
            url
          }
          Image {
            formats {
              thumbnail {
                url
              }
            }
          }
          Titre
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const pages = result.data.allStrapiPages.nodes.map(node => ({
      title: node.Titre,
      path: `/${node.Slug}`,
      content: node.Contenu,
      seo: node.SEO
        ? {
            title: node.SEO.Titre,
            description: node.SEO.Description,
            favicon: node.SEO.Favicon.url,
            image: node.SEO.Image.formats.medium.url,
          }
        : {
            description: result.data.strapiAccueil.SEO.Description,
            favicon: result.data.strapiAccueil.SEO.Favicon.url,
            image: result.data.strapiAccueil.SEO.Image.formats.medium?.url,
          },
    }));

    pages.forEach(page => {
      createPage({
        path: page.path,
        component: projectTemplate,
        context: { page },
      });
    });
  });
};

/*


 */
