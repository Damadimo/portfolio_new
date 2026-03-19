import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function GET() {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasRedisConfig = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );

  let redisOk = false;
  if (redis) {
    try {
      await redis.get("ai-adam:healthcheck");
      redisOk = true;
    } catch {
      redisOk = false;
    }
  }

  const ok = hasOpenAI && (!hasRedisConfig || redisOk);
  return NextResponse.json(
    {
      ok,
      service: "ai-adam-proxy",
      checks: {
        openaiKey: hasOpenAI,
        redisConfigured: hasRedisConfig,
        redisReachable: hasRedisConfig ? redisOk : null,
      },
      timestamp: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 }
  );
}

