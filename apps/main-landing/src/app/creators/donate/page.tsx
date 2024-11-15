'use client';
import Image from 'next/image';

import { TopBar } from '@/components';
import { Multiselect } from '@idriss-xyz/ui/multiselect';
import { backgroundLines2 } from '@/assets';

import { Providers } from './providers';
// import { Content } from './content';
import { useState } from 'react';
import { Icon } from '@idriss-xyz/ui/icon';

// ts-unused-exports:disable-next-line
export default function Donors() {
  const [selectedOptions, setSelectedOptions] = useState([
    'option1',
    'option3',
  ]);

  const options = [
    {
      value: 'option1',
      label: 'Option 1',
      icon: <Icon name="Grip" size={4} className="size-4" />,
    },
    {
      value: 'option2',
      label: 'Option 2',
      icon: <Icon name="IdrissCircled" size={4} className="size-4" />,
    },
    {
      value: 'option3',
      label: 'Option 3',
      icon: <Icon name="Head" size={4} className="size-4" />,
    },
    {
      value: 'option4',
      label: 'Option 4',
      icon: <Icon name="IdrissCircled" size={4} className="size-4" />,
    },
    {
      value: 'option5',
      label: 'Option 5',
      icon: <Icon name="IdrissCircled" size={4} className="size-4" />,
    },
    {
      value: 'option6',
      label: 'Option 6',
      icon: <Icon name="IdrissCircled" size={4} className="size-4" />,
    },
    {
      value: 'option7',
      label: 'Option 7',
      icon: <Icon name="IdrissCircled" size={4} className="size-4" />,
    },
    {
      value: 'option8',
      label: 'Option 8',
      icon: <Icon name="IdrissCircled" size={4} className="size-4" />,
    },
  ];

  const handleMultiselectChange = (newValue: string[]) => {
    setSelectedOptions(newValue);
  };

  return (
    <Providers>
      <TopBar />
      <main className="flex grow items-start justify-center overflow-hidden bg-[radial-gradient(111.94%_122.93%_at_16.62%_0%,_#E7F5E7_0%,_#76C282_100%)] pt-[104px]">
        <Multiselect
          options={options}
          value={selectedOptions}
          onValueChange={handleMultiselectChange}
          placeholder="Select options"
          maxCount={12}
          className="w-[412px]"
        />
        <Image
          priority
          src={backgroundLines2}
          className="pointer-events-none absolute top-0 hidden h-full opacity-40 lg:block"
          alt=""
        />

        {/* <Content className="container lg:mt-[108px]" /> */}
      </main>
    </Providers>
  );
}
