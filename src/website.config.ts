import { Content } from './lib/content/index.ts';

const { basics } = await Content.getLatestResumeData() ?? {};

const githubPage = basics.profiles.filter((it) => it.network === 'Github')[0].url;

const linkedinProfile = basics.profiles.filter((it) => it.network === 'Linkedin')[0].url;

const website = {
	ogLanguage: 'en_US',
	siteLanguage: 'en-US',
	siteTitle: basics?.name,
	siteTitleAlt: 'Reese Portfolio',
	icon: 'favicon.ico',
	backgroundColor: '#1b4079',
	themeColor: '#d62828',
	author: basics?.name,
	contactEmail: basics?.email,
	githubPage,
	linkedinProfile,
};

export default website;
