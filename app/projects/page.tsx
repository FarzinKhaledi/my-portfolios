'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanityClient';

const builder = imageUrlBuilder(client);


function urlFor(source: any) {
  return builder.image(source);
}

interface Project {
  _id: string;
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
  summary: string;
  technologies: Array<{ _ref: string }>;
  linkToBuild: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const fetchedProjects: Project[] = await client.fetch(
        '*[_type == "project"]'
      );
      setProjects(fetchedProjects);
    }

    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative overflow-hidden flex-col text-left md:flex-row max-w-full h-screen justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
        {projects.map((project, i) => (
          <motion.div
            key={project._id}
            className="w-screen flex flex-col space-y-5 items-center justify-center flex-shrink-0 snap-center p-20 md:p-44 h-screen"
          >
            <Link href={project.linkToBuild}>
              <motion.img
                initial={{ y: -300 }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                src={urlFor(project.image).url()}
                className="md:mb-0 flex-shrink-0 w-56 h-56 rounded-full md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[300px] object-contain cursor-pointer"
              />
            </Link>

            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-4xl font-semibold text-center">
                <span className="decoration-[#F7AB0A]/50 underline">
                  Case Study {i + 1} of {projects.length}:
                </span>{' '}
                {project.title}
              </h4>

              <p className="text-lg text-center md:text-left">
                {project.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
}
