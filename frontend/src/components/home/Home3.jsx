import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Mental Heath Assessment',
    description:
      'Check your mental wellbeing with a quick and confidential assessment.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Write Personal Journals',
    description:
      'Track your mood and thoughts in a secure, private journal for self-reflection.',
    icon: LockClosedIcon,
  },
  
  {
    name: '1:1 Chat with AI Therapist',
    description:
      'Get 24/7 support from an AI therapist to manage your mental health.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Anonymous Chatting',
    description:
      'Connect with a supportive community anonymously and share your experiences.',
    icon: FingerPrintIcon,
  },
]

const Home3 = () => {
    return (
        <div className="relative bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]">
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
          <div className="relative bg-white/70 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Unlocking well-being excellence
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  A website to keep track of your mental health, write journals, chat anonymously and get a personalized result based
                  on your quiz.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-16">
                      <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Home3;