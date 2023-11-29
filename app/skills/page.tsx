'use client';
// Skills.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Skill from './skill'; // Adjust the import path as necessary
import { client } from '../../sanityClient';

interface Skilll {
  _id: string;
  title: string;
  progress: number;
  image: {
    asset: {
      url: string;
    };
  };
}

function Skills() {
  const [skills, setSkills] = useState<Skilll[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const fetchedSkills: Skilll[] = await client.fetch('*[_type == "skill"]');
      setSkills(fetchedSkills);
    }

    fetchSkills();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-4 gap-5">
        {skills.slice(0, skills.length / 2).map((skill) => (
          <Skill key={skill._id} skill={skill} />
        ))}
        {skills.slice(skills.length / 2, skills.length).map((skill) => (
          <Skill key={skill._id} skill={skill} directionLeft />
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
