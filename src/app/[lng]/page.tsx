import { type Language } from "@/dictionaries";
import { getServerDictionary } from "@/dictionaries/server";
import Link from "next/link";

export default async function Home(props: {
  params: Promise<{ lng: Language }>
}) {
  const { lng } = await props.params;
  const dict = await getServerDictionary(lng);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center p-6">
          <nav className="flex gap-4 font-semibold">
            <Link href={`/${lng}`}>{dict.nav.home}</Link>
            <Link href={`/${lng}/about`}>{dict.nav.about}</Link>
            <Link href={`/${lng}/contact`}>{dict.nav.contact}</Link>

            {/* Language switcher */}
            <div className="flex gap-2 ml-6">
              <Link href="/es" className={lng === 'es' ? 'font-bold' : ''}>
                ES
              </Link>
              <Link href="/en" className={lng === 'en' ? 'font-bold' : ''}>
                EN
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex flex-col items-center mt-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {dict.common.welcome}
        </h1>
        <p className="text-xl mb-8">
          {dict.common.description}
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          {dict.buttons.learnMore}
        </button>
      </div>
    </main>
  );
}