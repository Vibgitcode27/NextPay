import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    try {
        const apiUrl = `${url.origin}/api/checkVerification`;
        const res = await fetch(apiUrl);
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
            const data = await res.json();
            const isVerified = data.isVerified;
            if (!isVerified && url.pathname !== '/') {
                url.pathname = '/';
                return NextResponse.redirect(url);
            }
        } else {
            console.error('Unexpected response format:', await res.text());
            return NextResponse.redirect(new URL('/', url));
        }
    } catch (error) {
        console.error('Error fetching verification status:', error);
        return NextResponse.redirect(new URL('/', url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next).*)'],
};
