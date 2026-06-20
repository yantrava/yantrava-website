import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { Model } from "@/components/sections/model";
import { Marquee } from "@/components/sections/marquee";
import { Ventures } from "@/components/sections/ventures";
import { Values } from "@/components/sections/values";
import { Founders } from "@/components/sections/founders";
import { ContactFooter } from "@/components/sections/contact-footer";
import { ScrollIndex } from "@/components/ui/scroll-index";

export default function Home() {
  return (
    <>
      <SiteNav />
      <ScrollIndex />
      <main id="main">
        <Hero />
        <Model />
        <Marquee />
        <Ventures />
        <Values />
        <Founders />
        <ContactFooter />
      </main>
    </>
  );
}
