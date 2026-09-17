import React from 'react';
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon
} from 'react-share';

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url }) => {
  return (
    <div className="flex space-x-4 justify-center my-6">
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
    </div>
  );
};

export default SocialShareButtons;
