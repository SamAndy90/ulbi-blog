import type { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { getUsers } from "@/services/services";

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!,
        }),
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    required: true,
                },
                password: {
                    type: "password",
                    required: true,
                },
            },
            async authorize(credentials) {
                const users = await getUsers()
                const currentUser = users.find(user => user.email === credentials?.email)

                if(!currentUser) {
                    throw new Error("There is no user at this email address")
                } else if(currentUser && currentUser.password === credentials?.password) {
                    const { password, ...userWithoutPass } = currentUser
                    return userWithoutPass as User
                } else {
                    throw new Error("Incorrect password. Please try again.")
                }
            },
        }),
    ],
    pages: {
        signIn: "/login"
    }
};
