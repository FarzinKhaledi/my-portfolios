'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanityClient';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface Experience {
  _id: string;
  jobTitle: string;
  companyImage: {
    asset: {
      url: string;
    };
  };
  company: string;
  dateStarted: string;
  dateEnded: string;
  isCurrentlyWorkingHere: boolean;
  technologies: Array<{ _ref: string }>;
  points: string[];
}

export default function Page() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const fetchedExperiences: Experience[] = await client.fetch(
        '*[_type == "experience"]'
      );
      setExperiences(fetchedExperiences);
    }

    fetchExperiences();
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold underline mb-10 text-center">
        My Experience
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {experiences.map((experience) => (
          <article
            key={experience._id}
            className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden m-5"
          >
            <motion.img
              initial={{ y: -100, opacity: 0 }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={urlFor(experience.companyImage).url()}
              className="w-32 h-32 rounded-full md:rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
            />

            <div className="px-0 md:px-10 ">
              <h4 className="text-4xl font-light">{experience.jobTitle}</h4>
              <p className="font-bold text-2xl mt-1">{experience.company}</p>
              {/* Add technology images if available */}
              <p className="uppercase py-5 text-gray-300">
                {new Date(experience.dateStarted).toDateString()} -{' '}
                {experience.isCurrentlyWorkingHere
                  ? 'Present'
                  : new Date(experience.dateEnded).toDateString()}
              </p>

              <ul className="list-disc space-y-4 ml-5 text-lg">
                {experience.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
