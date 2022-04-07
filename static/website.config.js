import resume from '$lib/data/resume.json';

let {basics: {email, profiles}} = resume;

const config = {
  author: 'Jonathon Reese Perry',
  ogLanguage: 'en_US',
  siteLanguage: 'en-US',
  siteTitle: 'Jonathon Reese Perry Portfolio',
  siteShortTitle: 'Reese Portfolio',
  siteUrl: import.meta.env ? import.meta.env.BASE_URL : '',
  icon: 'static/profile.png',
  backgroundColor: '#1b4079',
  themeColor: '#d62828',
  contactEmail: email,
  githubPage: profiles.filter((profile) => profile.network === "Github")[0].username,
  linkedinProfile: profiles.filter((profile) => profile.network === "Linkedin")[0].username
};

export { config as default };