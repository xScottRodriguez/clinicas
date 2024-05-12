import React from 'react';

export const SanitizeRichText = ({ html }) => {
  return <span>{html?.replace(/<.*?>/g, '') ?? 'N/A'}</span>;
};
