import ImageGenerator from '@/components/image-generator'
import ImageGrid from '@/components/image-grid'
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white">JuicyFlux</h1>
          </div>
          <UserButton afterSignOutUrl="/"/>
        </header>
        <main>
          <ImageGenerator />
          <ImageGrid />
        </main>
      </div>
    </div>
  )
}