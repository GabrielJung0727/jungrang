// src/app/api/widgets/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FILE = path.resolve(process.cwd(), 'data/widgets.json');

export async function GET(request: Request) {
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    const all = JSON.parse(raw);
    const username = request.headers.get('x-username') || 'guest';
    return NextResponse.json(all[username] || []);
  } catch (err) {
    console.error('GET /api/widgets error', err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { username, widgets } = await request.json();
    const raw = await fs.readFile(FILE, 'utf-8');
    const all = JSON.parse(raw);

    all[username] = widgets;
    await fs.writeFile(FILE, JSON.stringify(all, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST /api/widgets error', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}