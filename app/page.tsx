import React from 'react';
import About from './about/page';
import Projects from './projects/page';
import Contact from './contact/page';
import Hero from './hero/page';

export default function Home() {
  return (
    <main className="">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
