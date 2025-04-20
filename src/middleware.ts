import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from './utils/supabase/server';

// Check if user exists
export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const auth = request.headers.get('Authorization');
  const token = auth?.split?.(' ')?.[1];

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error)
      return NextResponse.json({ message: error.message }, { status: 500 });

    if (data?.user) {
      return NextResponse.next();
    } else {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  } catch {
    return NextResponse.json(
      { message: 'Something happened' },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ['/((?!hello).*)'],
};
