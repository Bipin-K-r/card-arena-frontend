import React from 'react';

interface DeveloperCardProps {
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
  githubUrl: string; // Add GitHub URL property
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  role,
  imageUrl,
  linkedinUrl,
  githubUrl,
}) => {
  return (
    <li className="flex flex-col items-center">
      <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={imageUrl} alt={name} />
      <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{name}</h3>
      <p className="text-base leading-7 text-gray-600">{role}</p>
      <ul role="list" className="mt-6 flex gap-x-6">
        {linkedinUrl && (
          <li>
            <a href={linkedinUrl} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <img src={'./linkedin.svg'} alt="LinkedIn" className="h-5 w-5" />
            </a>
          </li>
        )}
        {githubUrl && (
          <li>
            <a href={githubUrl} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <img src={'./github.svg'} alt="GitHub" className="h-5 w-5" />
            </a>
          </li>
        )}
      </ul>
    </li>
  );
};

export default DeveloperCard;
