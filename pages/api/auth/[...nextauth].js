import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export default NextAuthOptions =  {
    session: {
        strategy: "jwt",
    },
    providers:[
        CredentialsProvider({
            type: "credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "john@email.com" },
              password: { label: "Password", type: "password", placeholder: "********" },
            }
          })
    ]
}