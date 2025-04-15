import React from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home2 = () => {
    // Use intersection observer to trigger animations on scroll
    const { ref: sectionRef, inView: sectionInView } = useInView({ 
      triggerOnce: true,
      threshold: 0.1 
    });
    
    // Mental health topics data
    const mentalHealthTopics = [
      {
        name: "ADHD",
        image: "https://img.freepik.com/premium-vector/adhd-attention-disorder-prevent-adhd-vector-stock-illustration_100456-10568.jpg",
        link: "https://applications.emro.who.int/docs/EMRPUB_leaflet_2019_mnh_214_en.pdf"
      },
      {
        name: "Depression",
        image: "https://st4.depositphotos.com/23877174/25249/v/450/depositphotos_252490948-stock-illustration-depression-icon-vector-from-human.jpg",
        link: "https://www.who.int/news-room/fact-sheets/detail/depression"
      },
      {
        name: "Bipolar Disorder",
        image: "https://i0.wp.com/www.additudemag.com/wp-content/uploads/2021/07/GettyImages-1250310797.jpg",
        link: "https://applications.emro.who.int/docs/EMRPUB_leaflet_2019_mnh_216_en.pdf"
      },
      {
        name: "PTSD",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB4hzxb2gqZY1oD5Key0bryI_xkC_0IUY3LObg_y2Hg&s",
        link: "https://applications.emro.who.int/docs/WHOEMMNH235E-eng.pdf?ua=1"
      },
      {
        name: "Schizophrenia",
        image: "https://i0.wp.com/mindsitenews.org/wp-content/uploads/2023/09/shutterstock_1519533587-schizophrenia.jpeg?resize=780%2C780&ssl=1",
        link: "https://www.who.int/news-room/fact-sheets/detail/schizophrenia"
      },
      {
        name: "Anxiety",
        image: "https://static01.nyt.com/images/2022/01/19/well/19good-anxiety/19good-anxiety-mediumSquareAt3X-v3.jpg",
        link: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders"
      },
      {
        name: "Eating Disorder",
        image: "https://zinc.ca/wp-content/uploads/2023/04/zinc-eating-disorders.jpg",
        link: "https://www.nimh.nih.gov/health/statistics/eating-disorders"
      },
      {
        name: "Paranoia",
        image: "https://etimg.etb2bimg.com/photo/99479867.cms",
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6420131/"
      }
    ];

    return (
      <section className="py-16 px-4 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#ff80b5] opacity-20"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div ref={sectionRef} className="max-w-7xl mx-auto">
          <motion.div 
            className="mx-auto mb-16 max-w-screen-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5 }}
          >
            <motion.h2 
              className="mb-4 text-4xl tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              Mental Health Resources
            </motion.h2>
            <motion.p 
              className="font-light text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              Learn about various mental health conditions and find helpful resources
            </motion.p>
          </motion.div> 
          
          <div className="grid gap-8 lg:gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mentalHealthTopics.map((topic, index) => (
              <motion.div
                key={topic.name}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                <a 
                  href={topic.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.div 
                    className="relative mx-auto mb-4 group cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <div className="relative w-36 h-36 mx-auto overflow-hidden rounded-full shadow-lg border-2 border-gray-700 group-hover:border-pink-500 transition-all duration-300">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        src={topic.image} 
                        alt={`Learn about ${topic.name}`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>
                      
                      {/* Subtle hint that it's clickable */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-pink-500/70 rounded-full p-2">
                          <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 10.5L21 3m0 0l-7.5 7.5M21 3h-7.5m0 7.5L3 21" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </a>
                
                <h3 className="mb-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                  {topic.name}
                </h3>
                
                {/* Removed "Read More" button */}
              </motion.div>
            ))}
          </div> 
        </div>
      </section>
    )
}

export default Home2;