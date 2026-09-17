import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'WebSite' | 'Article' | 'BlogPosting';
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateJsonLd = () => {
    const baseStructure = {
      '@context': 'https://schema.org',
      '@type': type,
    };
    return JSON.stringify({ ...baseStructure, ...data });
  };

  return (
    <Helmet>
      <script type="application/ld+json">{generateJsonLd()}</script>
    </Helmet>
  );
};

export const PersonStructuredData = {
  name: 'Sourav Suvro',
  jobTitle: 'Full Stack Developer',
  url: 'https://www.souravsuvra.com',
  sameAs: [
    'https://linkedin.com/in/sourav007/',
    'https://github.com/Souravsuvro',
    'https://twitter.com/S_Sarker_Suvro'
  ]
};

export const WebsiteStructuredData = {
  name: 'Sourav Suvro Portfolio',
  url: 'https://www.souravsuvra.com',
  description: 'Personal portfolio showcasing projects and blog',
  publisher: {
    '@type': 'Person',
    name: 'Sourav Suvro'
  }
};
