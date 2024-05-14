import React, { useState } from 'react';



const OurFleet = ({ title, content, imageSrc }) => (
    <article className="tab-content">
    <div className="row justify-content-center">
      <div className="col-md-6"> {/* Apply animation to the image */}
        <h3>{title}</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
        <button className="btn btn-secondary">Read More</button>
      </div>
      <div className="col-md-6 tab-image">
        <img src={imageSrc} alt={title} className="img-fluid" />
      </div>
    </div>
  </article>
);

const Ourfleet = () => {
  const [activeTab, setActiveTab] = useState(null); // Set initial activeTab to null

  // Define tabData
  const tabData = [
    {
      title: "Midnight Station",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.\nVoluptas nihil sequi doloribus obcaecati.\nAut vel, recusandae ipsa voluptate blanditiis nemo magnam sit modi architecto officia maiores magni.\nNecessitatibus, iste aut.",
      imageSrc: "https://picsum.photos/id/345/1000/600"
    },
    {
      title: "The Hitchhiker",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.\nVoluptas nihil sequi doloribus obcaecati.\nAut vel, recusandae ipsa voluptate blanditiis nemo magnam sit modi architecto officia maiores magni.\nNecessitatibus, iste aut.",
      imageSrc: "https://picsum.photos/id/352/1000/600"
    },
    {
      title: "Missing Pages",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.\nVoluptas nihil sequi doloribus obcaecati.\nAut vel, recusandae ipsa voluptate blanditiis nemo magnam sit modi architecto officia maiores magni.\nNecessitatibus, iste aut.",
      imageSrc: "https://picsum.photos/id/444/1000/600"
    },
    {
      title: "Uninvited Guests",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.\nVoluptas nihil sequi doloribus obcaecati.\nAut vel, recusandae ipsa voluptate blanditiis nemo magnam sit modi architecto officia maiores magni.\nNecessitatibus, iste aut.",
      imageSrc: "https://picsum.photos/id/451/1000/600"
    }
  ];

  const handleTabClick = (index) => {
    setActiveTab(index === activeTab ? null : index); // Toggle activeTab
  };

  return (

    <div>

        



<main>
      
      <section className="m-5">
        <ul className="indexes" style={{ listStyleType: 'none' }}>
          {tabData.map((tab, index) => (
            <li
              key={index}
              className={activeTab === index ? 'active' : ''}
              onClick={() => handleTabClick(index)}
              style={{ cursor: 'pointer' }}
            >
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </li>
          ))}
        </ul>
        <ul className="tabs m-5" style={{ listStyleType: 'none' }}>
          {tabData.map((tab, index) => (
            <li key={index} className={`tab ${activeTab === index ? 'active' : ''}`}>
              {activeTab === index && (
                <OurFleet title={tab.title} content={tab.content} imageSrc={tab.imageSrc} />
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>

    </div>
    
  );
};

export default Ourfleet;
