import { redirect } from 'next/navigation';
import { defaultLocale } from '../../middleware';

// Use a more stable approach for the redirect
export default function Home() {
  // Static redirect won't cause hydration issues
  redirect(`/${defaultLocale}`);
}
