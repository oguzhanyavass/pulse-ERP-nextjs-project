'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { FiUsers, FiGlobe, FiMapPin, FiBook, FiBox } from 'react-icons/fi';
import { BackButton } from '@/components/ui/BackButton';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function MenuItem({ icon, title, description, href }: MenuItemProps) {
  const router = useRouter();

  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group border border-gray-700/50"
      onClick={() => router.push(href)}
    >
      <div className="flex items-center space-x-4">
        <div className="text-blue-400 text-3xl group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GeneralPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <BackButton />
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            Genel Tanımlamalar
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuItem
          icon={<FiUsers />}
          title="Şirket Kodları"
          description="Şirket tanımları ve yönetimi"
          href="/general/companies"
        />
        <MenuItem
          icon={<FiGlobe />}
          title="Ülke Kodları"
          description="Ülke tanımları ve yönetimi"
          href="/general/countries"
        />
        <MenuItem
          icon={<FiMapPin />}
          title="Şehir Kodları"
          description="Şehir tanımları ve yönetimi"
          href="/general/cities"
        />
        <MenuItem
          icon={<FiBook />}
          title="Dil Kodları"
          description="Dil tanımları ve yönetimi"
          href="/general/languages"
        />
        <MenuItem
          icon={<FiBox />}
          title="Birim Kodları"
          description="Birim tanımları ve yönetimi"
          href="/general/units"
        />
      </div>
    </div>
  );
} 