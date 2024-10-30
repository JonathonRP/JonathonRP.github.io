import { Content } from '@/lib/content/index.ts';

const { basics = undefined } = await Content.getLatestResumeData() ?? {};

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
	githubPage: basics?.profiles.find((it) => it.network === 'github')?.username,
	linkedinProfile: basics?.profiles.find((it) => it.network === 'linkedin')
		?.username,
};

export default website;
