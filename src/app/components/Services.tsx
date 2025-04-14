// components/TabSection.tsx

'use client';

import { useState } from 'react';
import TabButton from './ServicesTab';
import '../styles/services.css';


export const TAB_CONTENT = {
  emails: {
    title: 'Emails',
    description:
      'Stand out in crowded inboxes with strategic, custom-crafted email campaigns. From irresistible promotions to smart automated sequences, email marketing keeps your brand top-of-mind, nurtures leads, and drives consistent conversions — even while you sleep.',
  },
  newsletters: {
    title: 'Newsletters',
    description:
      'Keep your audience in-the-know and invested with beautifully designed newsletters. They’re more than just updates — they’re your voice, your story, and your secret to building lasting loyalty and repeat business.',
  },
  websites: {
    title: 'Websites',
    description:
      'A high-performing website isn’t just pretty — it’s a 24/7 sales machine. With interactive layouts, modern animations, and seamless experiences, your brand not only looks elite but works smarter to convert every visitor into a customer.',
  },
  ai: {
    title: 'AI Integration',
    description:
      'Imagine a website that works like your smartest team member — answering questions, recommending products, scheduling appointments. AI unlocks personalized, lightning-fast interactions that delight customers and make your business operate with chic efficiency.',
  },
  ecommerce: {
    title: 'E-Commerce',
    description:
      'Turn browsers into buyers with sleek, intuitive online stores. From product discovery to seamless checkout, optimized e-commerce boosts your revenue while delivering a shopping experience that feels luxe, effortless, and exciting.',
  },
  blockchain: {
    title: 'BlockChain',
    description:
      'Step into the future with blockchain-powered features like crypto payments, NFT memberships, and digital loyalty tokens. Web3 integration positions your brand as innovative and forward-thinking — while creating new streams of trust, engagement, and revenue.',
  },
} as const;

type TabType = keyof typeof TAB_CONTENT;

export default function TabSection() {
  const [selectedTopic, setSelectedTopic] = useState<TabType>('emails');
  const tabContent = TAB_CONTENT[selectedTopic];

  const handleSelect = (topic: TabType) => setSelectedTopic(topic);

  return (
    <section className="next-section">
  <h2>Elevating Digital Experiences</h2>
  <ul className="tab-list">
    {Object.keys(TAB_CONTENT).map((topic) => (
      <TabButton
        key={topic}
        isSelected={selectedTopic === topic}
        onSelect={() => handleSelect(topic as TabType)}
      >
        {TAB_CONTENT[topic as TabType].title}
      </TabButton>
    ))}
  </ul>

  <div className="tabContent">
    <h3>{tabContent.title}</h3>
    <p>{tabContent.description}</p>
  </div>
</section>

  );
}
