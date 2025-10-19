import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'support@prismarc.fun',
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"PrismArc Support" <support@prismarc.fun>`,
      to: 'support@prismarc.fun',
      subject: 'Новое сообщение с сайта PrismArc',
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
