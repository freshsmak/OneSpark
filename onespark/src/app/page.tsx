import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/sparks')
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">OneSpark</h1>
        <p className="text-muted-foreground">
          Turn real pain points into million-dollar product concepts
        </p>
        <a
          href="/sign-in"
          className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Get Started
        </a>
      </div>
    </div>
  )
}

