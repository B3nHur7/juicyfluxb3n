'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Loader2 } from 'lucide-react'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [promptStrength, setPromptStrength] = useState(0.5)
  const [numOutputs, setNumOutputs] = useState(1)
  const [imageUrl, setImageUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspectRatio, promptStrength, numOutputs, imageUrl }),
      })
      const data = await response.json()
      setGeneratedImages(data.images)
    } catch (error) {
      console.error('Error generating images:', error)
    }
    setIsGenerating(false)
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
          <div className="space-y-4">
            <Input
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger>
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <label className="block text-sm font-medium mb-1">Prompt Strength: {promptStrength}</label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[promptStrength]}
                onValueChange={(value) => setPromptStrength(value[0])}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Outputs: {numOutputs}</label>
              <Slider
                min={1}
                max={4}
                step={1}
                value={[numOutputs]}
                onValueChange={(value) => setNumOutputs(value[0])}
              />
            </div>
            <Input
              placeholder="Optional: Enter image URL for image-to-image generation"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}