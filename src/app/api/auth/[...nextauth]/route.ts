import NextAuth from 'next-auth';
import prisma from '@/utils/db';
import { SessionStrategy } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';

interface Credentials {
  Username: string;
  Password: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials, req: any) {
        const { Username, Password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            Username: Username,
          },
        });
        if (!user) {
          return null;
        }

        const confirmPass = await bcrypt.compare(Password, user?.Password);

        if (confirmPass) {
          return user;
        }
        return null;
      },
    } as any),
  ],

  callbacks: {
    async jwt({ token, session, trigger, user }: any) {
      if (user) {
        if (trigger === 'update') {
          // if (session && session.uuid && session.username && session.role && session.profileImage) {
          return {
            ...token,
            ...session.UserID,
            ...session.Username,
            ...session.Nama_Lengkap,
            ...session.Email,
            // };
          };
        }
        return {
          ...token,
          UserID: user.UserID,
          Username: user.Username,
          Nama_Lengkap: user.Nama_Lengkap,
          Email: user.Email,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          UserID: token.UserID,
          Username: token.Username,
          Nama_Lengkap: token.Nama_Lengkap,
          Email: token.Email,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
