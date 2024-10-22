'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Heart } from 'lucide-react'

export default function ImageCard({ image }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleDownload = () => {
    // Implement download functionality
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    // Implement like functionality with Supabase
  }

  return (
    <Card
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <img src={image.url} alt={image.prompt} className="w-full h-auto" />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4 transition-opacity duration-200">
            <p className="text-white text-sm">{image.prompt}</p>
            <div className="flex justify-end space-x-2">
              <Button size="sm" variant="ghost" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLike}
                className={isLiked ? 'text-red-500' : 'text-white'}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}