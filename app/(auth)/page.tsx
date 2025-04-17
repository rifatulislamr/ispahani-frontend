import SignIn from '@/components/signin/signin'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* <SignIn /> */}
      <div className="flex items-center justify-center gap-4">
        <img src="ispahani-.jpg" alt="Ispahani Logo" className="w-auto h-14 rounded-full" />
        <h1 className="uppercase text-4xl font-bold bg-gradient-to-r from-green-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent p-2 text-center animate-pulse shadow-lg">
         tea is our life
        </h1>
      </div>
    </div>
  )
}
