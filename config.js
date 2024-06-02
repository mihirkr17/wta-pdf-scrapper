const constant = {
   scheduleTime: process.env.SCHEDULE_TIME,
   scheduleTimeLabel: process.env.SCHEDULE_TIME_LABEL,
   scheduleAction: process.env.SCHEDULE_ACTION,
   openAiSecret: process.env.OPEN_AI_SECRETS,
   restAuthToken: process.env.SG_AUTH_TOKEN,
   clientDomainName: process.env.CLIENT_DOMAIN,
   mediaUri: function (slug) {
      return `${constant.clientDomainName}/wp-json/wp/v2/media?slug=wta_${slug}_yes`;
   },
   tagUri: "",
   categoryUri: "",
   wtaNoteUri: `https://www.wtatennis.com/match-notes`,
   postExistUri: function (slug = "") {
      return `${constant.clientDomainName}/wp-json/wp/v2/posts?status=any&slug=${slug}`
   },
   paraphrasedCommand: function (language, content) {
      return `Rewrite this in ${language}, not adding extra facts that are not in this text, reply in paragraph form, in an interesting tennis journalistic manner with a long as possible reply: ${content}`;
   },
   postStatusAll: ["publish", "future", "draft", "pending", "private"],
   postUri: "",
   authorId: process.env.AUTHOR_ID,
   postStatus: process.env.POST_STATUS
};

// Set properties that depend on other properties
constant.tagUri = `${constant.clientDomainName}/wp-json/wp/v2/tags`;
constant.categoryUri = `${constant.clientDomainName}/wp-json/wp/v2/categories`;
constant.postUri = `${constant.clientDomainName}/wp-json/wp/v2/posts`;


module.exports = { constant };