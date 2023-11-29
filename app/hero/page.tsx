'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanityClient';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import BackgroundCircles from './BackgroundCircles'; // Ensure this is imported or defined

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface PageInfo {
  name: string;
  role: string;
  heroImage: {
    asset: {
      url: string;
    };
  };
  backgroundInformation: string;
  profilePic: {
    asset: {
      url: string;
    };
  };
  phoneNumber: string;
  email: string;
  address: string;
  socials: Array<{ _ref: string }>;
}

function Hero() {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  useEffect(() => {
    async function fetchPageInfo() {
      const data: PageInfo = await client.fetch('*[_type == "pageInfo"][0]');
      setPageInfo(data);
    }

    fetchPageInfo();
  }, []);

  const [text, count] = useTypewriter({
    words: [
      `Hi, My name's ${pageInfo?.name}`,
      '<H1>Full Stack Developer</H1>',
      '<p>Based in London</p>',
      '<I-love-to-code />',
      '<em>And I love to learn</em>',
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      {pageInfo?.heroImage && (
        <Image
          className="relative rounded-full h-32 w-32 mx-auto object-cover"
          src={urlFor(pageInfo.heroImage).url()}
          width={250}
          height={250}
          alt={pageInfo.name}
        />
      )}
      <div className="z-20 relative">
        <h2 className="tracking-[15px] text-sm uppercase text-gray-500 pb-2">
          {pageInfo?.role}
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>

        <div className="pt-5">
          <Link href="./about">
            <button className="heroButton">About</button>
          </Link>

          <Link href="./experiences">
            <button className="heroButton">Experience</button>
          </Link>

          <Link href="./skills">
            <button className="heroButton">Skills</button>
          </Link>

          <Link href="./projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
