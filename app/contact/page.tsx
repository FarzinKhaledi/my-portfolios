'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { client } from '../../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

function urlFor(source: string) {
  return builder.image(source);
}

interface PageInfo {
  email: string;
  phoneNumber: string;
  address: string;
}

interface Inputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ConnectPage() {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    async function fetchPageInfo() {
      const data: PageInfo = await client.fetch('*[_type == "pageInfo"][0]');
      setPageInfo(data);
    }

    fetchPageInfo();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.location.href = `mailto:${pageInfo?.email}?subject=${data.subject}&body=Hi, my name is ${data.name}. ${data.message}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 h-screen justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-0 uppercase tracking-[20px] my-10 text-gray-500 text-2xl">
        Contact
      </h3>

      <div className="flex flex-col mt-10 space-y-10">
        <h4 className="text-4xl font-semibold text-center">
          I have got just what you need.{' '}
          <span className="decoration-[#F7AB0A]/50 underline">Lets Talk.</span>
        </h4>

        <div className="space-y-10">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">{pageInfo?.phoneNumber}</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <Link className="text-2xl" href={`mailto:${pageInfo?.email}`}>
              {pageInfo?.email}
            </Link>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">{pageInfo?.address}</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-fit mx-auto"
        >
          <div className="flex space-x-2">
            <input
              className="contactInput"
              placeholder="Name"
              type="text"
              {...register('name')}
            />
            <input
              className="contactInput"
              placeholder="Email"
              type="text"
              {...register('email')}
            />
          </div>
          <input
            className="contactInput"
            placeholder="Subject"
            type="text"
            {...register('subject')}
          />
          <textarea
            className="contactInput h-36"
            placeholder="Message"
            {...register('message')}
          />

          <button
            type="submit"
            className="
            bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg "
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}
