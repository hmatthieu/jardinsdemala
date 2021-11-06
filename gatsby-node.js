const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const articleTemplate = path.resolve(`src/components/ArticlePage.tsx`);

  return graphql(`
    query AllPages {
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
          Favicon {
            url
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

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
