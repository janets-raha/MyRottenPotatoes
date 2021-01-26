import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import User from '../../../models/User'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const bcrypt = require('bcrypt');
        const username = credentials.username;
        const user = await User.findOne({ email: username }).exec();
        const pwdMatch = await bcrypt.compare(credentials.password, user.password)
        if (user && pwdMatch) {
          // Any object returned will be saved in `user` property of the JWT
          const { password, ...result } = user;
          return Promise.resolve(user)
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          //return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      }
    }),
    // ...add more providers here
  ],

  callbacks: {
    //signIn: async (user, account, profile) => { return Promise.resolve(true) },
    // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
    //session: async (session, user) => { return Promise.resolve(session) },
    jwt: async (token, user, account, profile, isNewUser) => { return Promise.resolve(token) }
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,
  session: {
    jwt: true
  }
}


export default (req, res) => NextAuth(req, res, options)