"use client";

import React from "react";

// Reusable ClientLink Component
interface ClientLinkProps {
  href: string;
  imgSrc: string;
  alt: string;
  imgWidth: string; // use '20px' instead of percentage
}

const ClientLink: React.FC<ClientLinkProps> = ({ href, imgSrc, alt, imgWidth }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", width: imgWidth }} // Set width to fixed value (20px)
    >
      <img src={imgSrc} width={imgWidth} alt={alt} />
    </a>
  );
};

// Main ClientsSection Component
export const ClientsSection: React.FC = () => {
  return (
    <section id="clients" className="clients">
      <div className="flex justify-center gap-5 p-5">
        <ClientLink href="https://avasys.jp/" imgSrc="/images/avasys.png" alt="Avasys Company Logo" imgWidth="65px" />
        <ClientLink href="https://marimo-el.co.jp/" imgSrc="/images/marimoelec.png" alt="Marimo Electronics Logo" imgWidth="65px" />
        <ClientLink href="https://raspberry-pi.ksyic.com/info/company" imgSrc="/images/ksy.png" alt="KSY Logo" imgWidth="65px" />
      </div>
    </section>
  );
};
