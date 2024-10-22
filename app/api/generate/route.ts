import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { createClient } from '@supabase/supabase-js'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req: Request) {
  const { prompt, aspectRatio, promptStrength, numOutputs, imageUrl } = await req.json()

  try {
    const output = await replicate.run(
      "lucataco/flux-dev-lora:7b4b8f0b2b0c7c9a0a4c6c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c",
      {
        input: {
          prompt,
          aspect_ratio: aspectRatio,
          prompt_strength: promptStrength,
          num_outputs: numOutputs,
          image: imageUrl,
        },
      }
    )

    // Store the generated images in Supabase
    const { data, error } = await supabase
      .from('generated_images')
      .insert(output.map(imageUrl => ({
        url: imageUrl,
        prompt,
        aspect_ratio: aspectRatio,
        prompt_strength: promptStrength,
      })))

    if (error) throw error

    return NextResponse.json({ images: output })
  } catch (error) {
    console.error('Error generating images:', error)
    return NextResponse.json({ error: 'Failed to generate images' }, { status: 500 })
  }
}