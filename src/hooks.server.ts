import SvelteKitAuth from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { GITHUB_ID, GITHUB_SECRET, ADMIN_EMAIL } from "$env/static/private"

export const handle = SvelteKitAuth({
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
  callbacks: {
    jwt(token, user, account, profile, isNewUser) {
        if (user) {
            const administrators = [ADMIN_EMAIL];
            user.isAdmin = administrators.includes(user?.email);
        }
        return token
    }
  }
})