import { withAuth } from "next-auth/middleware";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // console.log("🚀 ~ file: middleware.ts:7 ~ middleware ~ req:", req);
        // return Nextreponse
        // console.log('middleware nextauth token', req.nextauth.token);
        // return NextResponse.rewrite(new URL('/', req.url));
    },
    {   
        pages: {
            signIn: '/login'
        },
        callbacks: {
            authorized: ({ token, req }) => {
                // console.log("🚀 ~ file: middleware.ts:16 ~ req.cookies:", req.cookies);
                // console.log("🚀 ~ file: middleware.ts:17 ~ token:", token);
                if (token) 
                    {   
                        return true; 
                    }
                // else if (req.cookies) return true;
                return false;
            },
        }
    }
)

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/api/:path*"] };