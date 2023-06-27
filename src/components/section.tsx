import React, { ReactNode } from 'react';
import '../styling/section.css';

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section>
      <div className="separator">
        <hr />
        {title}
        <hr />
      </div>
      <div className='icon-container'>
        {children}
      </div>
    </section>
  );
};

export default Section;
