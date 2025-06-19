import { NextResponse } from 'next/server'

export async function GET() {
  const hasPayloadSecret = !!process.env.PAYLOAD_SECRET
  const hasPostgresUrl = !!process.env.POSTGRES_URL
  
  return NextResponse.json({
    hasPayloadSecret,
    hasPostgresUrl,
    payloadSecretLength: process.env.PAYLOAD_SECRET?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    // Do NOT return actual values for security
  })
}
