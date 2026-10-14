import NextAuth, { Session } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema, RegisterSchema, RegisterSchemaType } from "./schemas";
import { prisma } from "./prisma";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt"; 

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
    };
    refreshedAt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.log("Invalid credentials");
          return null;
        }
        const { email, password} = parsedCredentials.data;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                }
            });
            if(!user) {
                console.log("No user found with this email");
                return null;
            }
            const passwordsMatch = await comparePasswords(
                password,
                user.password

            );
            if(!passwordsMatch) {
                console.log("Invalid password");
                return null;
            }
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            };
        } catch(error) {
            console.error("Error finding user:", error);
            return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}: {token: JWT; user: User}) {
        if(user) {
            token.id = user.id;
            token.role = user.role
        }
        return token;
    },
    async session({session, token}: {session: Session; token: JWT}) {
      if(session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
}

// export async function registerUser(data: RegisterSchemaType) {
//     const validationResult = RegisterSchema.safeParse(data);

//     if(!validationResult.success) {
//         return {
//             success: false,
//             error: "Invalid data provided.",
//             issues: validationResult.error.flatten().fieldErrors,
//         };
//     }

//     const {email, password, name} = validationResult.data;
//     try {
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 email
//             },
//         })
//         if(existingUser) {
//             return {
//                 success: false,
//                 error: "An account with this email already exists.",
//             };
//         }

//         const hashedPassword = await hashPassword(password);

//         const newUser = await prisma.user.create({
//             data: {
//                 email,
//                 password: hashedPassword,
//                 name: name || null,
//                 role: "user",
//             },
//         });

//         const userWithoutPassword = {
//             id: newUser.id,
//             email: newUser.email,
//             name: newUser.name,
//             role: newUser.role
//         };

//         return {
//             success: true,
//             user: userWithoutPassword,
//         }
//     } catch(error) {
//         console.error("Registration Server Action Error.", error);
//         return {
//             success: false,
//             error: "An error occurred while creating your account.",
//         };
//     }

// }