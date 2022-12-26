import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";

var _user = null;
export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: "3739866859573227",
      clientSecret: "29ea9f7715bdf934d123c7a918d7f01b"
    }),
    GoogleProvider({
      clientId: "370977605370-qjbmlavnmfn1tc3a41d0p1usbv1g8e4o.apps.googleusercontent.com",
      clientSecret: "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"
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        dbConnect().catch(error => { error: "Connection Failed...!" })

        // check user existance
        const result = await User.findOne({ username: credentials.username })
        if (!result) {
          throw new Error("username/password is invalid!!")
        }

        // compare()
        const checkPassword = await compare(credentials.password, result.password);

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("username/password is invalid!!");
        }
        _user = {
          name: result.fullName,
          email: result.username,
          id: result._id
        };

        return _user;

      }
    })
  ],
  secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
  session: {
    strategy: 'jwt',
    maxAge: 3000,
  },
  callbacks: {
    async jwt({ token, user }) {
     return { ...token, ...user }
    },
     async session({ session, user, token }) {
     return token
    },
   },
})