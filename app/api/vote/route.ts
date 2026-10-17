import { NextRequest, NextResponse } from 'next/server'
import { submitVote } from '@/lib/awards/service'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { season_id, category_id, nominee_id, dev_user_id } = body

    if (!season_id || !category_id || !nominee_id) {
      return NextResponse.json(
        { success: false, message: 'Missing required voting parameters.' },
        { status: 400 }
      )
    }

    let userId: string | null = null

    // Check Supabase session if configured
    if (isSupabaseConfigured()) {
      const supabase = await createServerSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        userId = user.id
      }
    }

    // Fallback to dev user in fixture / test mode
    if (!userId && dev_user_id) {
      userId = dev_user_id
    }

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          code: 'UNAUTHENTICATED',
          message: 'You must be authenticated via Discord to submit a vote.',
        },
        { status: 401 }
      )
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'

    const result = await submitVote(
      { season_id, category_id, nominee_id },
      { id: userId, ip }
    )

    if (!result.success) {
      const status =
        result.code === 'UNAUTHENTICATED'
          ? 401
          : result.code === 'DUPLICATE_VOTE'
          ? 409
          : result.code === 'SEASON_CLOSED'
          ? 403
          : 400

      return NextResponse.json(result, { status })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error processing vote.' },
      { status: 500 }
    )
  }
}
