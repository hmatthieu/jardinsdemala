const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const standaloneTemplate = path.resolve(`src/components/StandalonePage.tsx`);
  const articleTemplate = path.resolve(`src/components/ArticlePage.tsx`);

  return graphql(`
    query AllPages {
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
                thumbnail {
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
      allStrapiArticles {
        nodes {
          Titre
          Description
          Image {
            formats {
              thumbnail {
                url
              }
            }
          }
          Contenu
          Slug
          Date
          categorie {
            Titre
            Slug
            categorie
          }
          decouvrir {
            id
            Titre
            Slug
          }
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
            image: node.SEO.Image.formats.thumbnail.url,
          }
        : {
            description: result.data.strapiAccueil.SEO.Description,
            favicon: result.data.strapiAccueil.SEO.Favicon.url,
            image: result.data.strapiAccueil.SEO.Image.formats.thumbnail.url,
          },
    }));

    pages.forEach(page => {
      createPage({
        path: page.path,
        component: standaloneTemplate,
        context: { page },
      });
    });

    const articles = result.data.allStrapiArticles.nodes.map(node => ({
      title: node.Titre,
      description: node.Description,
      image: node.Image.formats.thumbnail.url,
      content: node.Contenu,
      path: `/article/${node.Slug}`,
      date: new Date(node.Date),
      category: {
        strapiId: node.categorie.categorie,
        title: node.categorie.Titre,
        path: `/categorie/s/${node.categorie.Slug}`,
      },
      discover: node.decouvrir.map(a => ({
        id: a.id,
        title: a.Titre,
        path: `/article/${a.Slug}`,
      })),
    }));

    articles.forEach(article => {
      createPage({
        path: article.path,
        component: articleTemplate,
        context: {
          article,
          favicon: result.data.strapiAccueil.SEO.Favicon.url,
          categoryStrapiId: article.category.strapiId,
        },
      });
    });
  });
};
