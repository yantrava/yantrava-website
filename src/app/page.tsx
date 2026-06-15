import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { Model } from "@/components/sections/model";
import { Ventures } from "@/components/sections/ventures";
import { Values } from "@/components/sections/values";
import { Founders } from "@/components/sections/founders";
import { ContactFooter } from "@/components/sections/contact-footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Model />
        <Ventures />
        <Values />
        <Founders />
        <ContactFooter />
      </main>
    </>
  );
}
