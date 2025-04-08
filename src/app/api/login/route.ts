// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path from 'path';

const USERS_PATH = path.resolve(process.cwd(), 'data/users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function POST(request: Request) {
  const { identifier, password } = await request.json();

  // 1) JSON 파일 로드
  let users;
  try {
    const raw = await readFile(USERS_PATH, 'utf-8');
    users = JSON.parse(raw);
  } catch (err) {
    console.error('Users JSON load error:', err);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  }

  // 2) email OR username 으로 유저 찾기
  const user = users.find((u: any) => 
    (u.username === identifier || u.email === identifier)
    && (u.username === 'guest' || u.password === password)
  );

  if (!user) {
    return NextResponse.json(
      { message: '아이디(또는 이메일) 또는 비밀번호가 틀렸습니다' },
      { status: 401 }
    );
  }

  // 3) JWT 생성
  const token = jwt.sign(
    { identifier: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // 4) 응답
  return NextResponse.json({
    token,
    user: { name: user.name, email: user.email, username: user.username }
  });
}