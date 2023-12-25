import React from 'react';

interface DeveloperCardProps {
  name: string;
  img: string;
  linkedIn: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, img, linkedIn }) => {
  return (
    <div className="developer-card">
      <img src={img} alt={name} className="developer-image" />
      <div>{name}</div>
      <a href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  );
};

export default DeveloperCard;
