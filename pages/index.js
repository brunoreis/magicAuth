import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Main app page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome, Bruno</h1>
      </main>
    </div>
  )
}
