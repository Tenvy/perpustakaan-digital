import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(

    function middleware(request: NextRequestWithAuth) {

        if (request.nextUrl.pathname.startsWith("/buku")
            && request.nextauth.token?.Role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
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

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|register).*)", "/buku"] };