'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanityClient';

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
  socials: Array<{ _ref: string }>; // Assuming this is the structure
}

export default function About() {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  useEffect(() => {
    async function fetchPageInfo() {
      const query = '*[_type == "pageInfo"][0]';
      const data: PageInfo = await client.fetch(query);
      setPageInfo(data);
    }

    fetchPageInfo();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 h-screen justify-evenly mx-auto items-center"
    >
      <h3 className="absolute mb-10 top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{' '}
          <span className="decoration-[#F7AB0A]/50 underline">little</span>{' '}
          background
        </h4>
        <p className="text-lg">{pageInfo?.backgroundInformation}</p>
      </div>
    </motion.div>
  );
}
