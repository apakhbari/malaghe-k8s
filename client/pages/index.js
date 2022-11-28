import Head from 'next/head'
import Script from 'next/script'
import React from 'react'

import Navbar from '../components/layout/navbar/navbar'

import { CLIENT_NAME_FA, CLIENT_DESCRIPTION } from '../envConfig'

import { CLIENT_NAME_ENG } from '../envConfig.js'

export default function Home() {
  return (
    <div>
      <Head>
        <title>
          {CLIENT_NAME_FA} - {CLIENT_DESCRIPTION}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="h-screen bg-gradient-to-b from-gray-900 to-slate-800 flex flex-col text-white">
        <header className="py-16">
          <h1 className="text-5xl font-bold text-center mb-6">
            Create Tailwind d d yo {CLIENT_NAME_ENG}
          </h1>
          <div className="flex flex-row justify-center items-center gap-4">
            <a
              className="github-button"
              href="https://github.com/andrejjurkin/create-tailwind-app"
              data-color-scheme="no-preference: dark; light: dark; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star andrejjurkin/create-tailwind-app on GitHub"
            >
              Star
            </a>
            <a
              className="github-button"
              href="https://github.com/andrejjurkin/create-tailwind-app/discussions"
              data-color-scheme="no-preference: dark; light: dark; dark: dark;"
              data-icon="octicon-comment-discussion"
              data-size="large"
              aria-label="Discuss andrejjurkin/create-tailwind-app on GitHub"
            >
              Discuss
            </a>
          </div>
        </header>

        <main className="flex-1">
          <section className="text-center">
            <p className="mb-6">
              Officially maintained by the creators of Next.js
            </p>
          </section>
        </main>

        <footer className="px-8 py-12 border-t border-gray-800">
          <div className="px-8 font-medium text-center">
            <a href="https://github.com/andrejjurkin/create-tailwind-app">
              Create Tailwind
            </a>
          </div>
        </footer>
      </div>
      <Script src="https://buttons.github.io/buttons.js" />
    </div>
  )
}
