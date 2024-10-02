const constant = {
   openAiSecret: process.env.OPEN_AI_SECRETS,
   authTokenSg: process.env.AUTH_TOKEN_SG,
   authTokenMs: process.env.AUTH_TOKEN_MS,
   domainSg: process.env.CLIENT_DOMAIN_SG,
   domainMs: process.env.CLIENT_DOMAIN_MS,
   mediaUri: function (domain, slug) {
      return `${domain}/wp-json/wp/v2/media?search=${slug}`;
   },
   tagUri: function (domain) {
      return `${domain}/wp-json/wp/v2/tags`;
   },
   categoryUri: function (domain) {
      return `${domain}/wp-json/wp/v2/categories`;
   },
   wtaNoteUri: `https://www.wtatennis.com/match-notes`,
   postExistUri: function (domain, slug = "") {
      return `${domain}/wp-json/wp/v2/posts?status=any&slug=${slug}&random=${Math.random().toString(36).substring(2, 9)}`
   },
   paraphrasedCommand: function (language, content) {
      return `Rewrite this in ${language}, not adding extra facts that are not in this text, reply in paragraph form, in an interesting tennis journalistic manner with a long as possible reply: ${content}`;
   },
   postStatusAll: ["publish", "future", "draft", "pending", "private"],
   postUri: function (domain) {
      return `${domain}/wp-json/wp/v2/posts`;
   },
   authorIdSg: process.env.AUTHOR_ID_SG,
   authorIdMs: process.env.AUTHOR_ID_MS,
   postStatus: process.env.POST_STATUS
};

// Set properties that depend on other properties

module.exports = { constant };