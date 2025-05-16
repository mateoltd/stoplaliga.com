import { type Language } from '@/dictionaries';
import { getServerDictionary } from '@/dictionaries/server';
import IntroAnimationClientWrapper from '@/components/IntroAnimation/ClientWrapper';
import '@/styles/intro-animation.css';

export default async function AnimationDemo({
  params: paramsPromise,
}: {
  params: Promise<{ lng: Language }>;
}) {
  const { lng } = await paramsPromise;
  const dict = await getServerDictionary(lng);

  return (
    <main className="min-h-screen">
      <IntroAnimationClientWrapper lng={lng} />

      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Animation Demo</h2>
        <p className="mb-4">
          This page demonstrates the intro animation illustrating internet censorship by LaLiga in Spain.
        </p>
        <p className="mb-4">
          Scroll down to progress through the animation stages.
        </p>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Animation Stages:</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Initial bright, functional web</li>
            <li>First gavel slam - initial censorship</li>
            <li>Second gavel slam - increased censorship</li>
            <li>Third gavel slam - severe censorship</li>
            <li>Final scene - Spain map turning black with LaLiga logo</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
