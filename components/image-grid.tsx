'use client'

import { useEffect, useState } from 'react'
import ImageCard from './image-card'

export default function ImageGrid() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchImages()
  }, [page])

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/images?page=${page}`)
      const data = await response.json()
      setImages((prevImages) => [...prevImages, ...data.images])
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <ImageCard key={index} image={image} />
      ))}
    </div>
  )
}