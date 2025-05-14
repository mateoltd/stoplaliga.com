import LangHomePage from "./[lng]/page";
import { defaultLocale } from "../../middleware";

export default async function RootPage() {
  return <LangHomePage params={Promise.resolve({ lng: defaultLocale })} />;
}
