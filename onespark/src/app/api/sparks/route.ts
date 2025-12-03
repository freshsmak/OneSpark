import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      category,
      name,
      tagline,
      pain_point,
      description,
      features,
      price_min,
      price_max,
      vibe,
      image_url,
      is_saved,
      is_ai_generated,
      parent_id,
      remix_notes,
      remix_depth,
    } = body

    // Validate required fields
    if (!category || !name || !tagline || !pain_point || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: category, name, tagline, pain_point, description' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Extract price from price_point string if price_min/max not provided
    let finalPriceMin = price_min
    let finalPriceMax = price_max
    
    if (!finalPriceMin && !finalPriceMax && body.price_point) {
      // Try to extract price from "$XX" or "$XX-XX" format
      const priceMatch = body.price_point.match(/\$?(\d+)(?:-(\d+))?/)
      if (priceMatch) {
        finalPriceMin = parseInt(priceMatch[1])
        finalPriceMax = priceMatch[2] ? parseInt(priceMatch[2]) : finalPriceMin
      }
    }

    const { data, error } = await supabase
      .from('sparks')
      .insert({
        user_id: userId,
        category,
        name,
        tagline,
        pain_point,
        description,
        features: Array.isArray(features) ? features : [],
        price_min: finalPriceMin,
        price_max: finalPriceMax,
        vibe: vibe || '',
        image_url: image_url || null,
        is_saved: is_saved ?? false,
        is_ai_generated: is_ai_generated || false,
        parent_id: parent_id || null,
        remix_notes: remix_notes || null,
        remix_depth: remix_depth || 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save spark', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error saving spark:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('sparks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch sparks', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching sparks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

