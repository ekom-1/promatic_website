import { NextRequest, NextResponse } from 'next/server';

// IMPORTANT: Change these credentials in production
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful'
      });
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);

  try {
    // Validate token (basic validation)
    const decoded = Buffer.from(token, 'base64').toString();
    const [username] = decoded.split(':');

    if (username === ADMIN_USERNAME) {
      return NextResponse.json({ authenticated: true });
    }
  } catch (error) {
    // Invalid token
  }

  return NextResponse.json(
    { error: 'Invalid token' },
    { status: 401 }
  );
}
