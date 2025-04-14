import React from 'react';
// Replace HeroIcons with more thematic icons from react-icons
import { 
  FaBrain, 
  FaBook, 
  FaRobot, 
  FaUserSecret 
} from 'react-icons/fa';

const features = [
  {
    name: 'Mental Health Assessment',
    description:
      'Check your mental wellbeing with a quick and confidential assessment.',
    icon: FaBrain, // Brain icon better represents mental health assessment
  },
  {
    name: 'Write Personal Journals',
    description:
      'Track your mood and thoughts in a secure, private journal for self-reflection.',
    icon: FaBook, // Book icon represents journaling
  },
  {
    name: '1:1 Chat with AI Therapist',
    description:
      'Get 24/7 support from an AI therapist to manage your mental health.',
    icon: FaRobot, // Robot icon represents AI
  },
  {
    name: 'Anonymous Chatting',
    description:
      'Connect with a supportive community anonymously and share your experiences.',
    icon: FaUserSecret, // Secret user icon represents anonymity
  },
]

const Home3 = () => {
    return (
        <div className="relative ">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <p className="mt-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 sm:text-4xl">
                  Unlocking Well-being Excellence
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  A platform to keep track of your mental health, write journals, chat anonymously and get a personalized result based
                  on your quiz.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-16 group">
                      <dt className="text-base font-semibold leading-7 text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-300">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
        </div>
      )
}

export default Home3;