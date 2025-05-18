import React from 'react';
import { Heart, Shield, Lightbulb, Users } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Lightbulb size={32} className="text-primary-500" />,
      title: 'Innovation',
      description:
        'We constantly push the boundaries of what\'s possible with AI and voice technology in the kitchen.',
    },
    {
      icon: <Shield size={32} className="text-primary-500" />,
      title: 'Quality',
      description:
        'We curate and test all our recipes to ensure they\'re reliable, delicious, and easy to follow.',
    },
    {
      icon: <Users size={32} className="text-primary-500" />,
      title: 'Inclusivity',
      description:
        'We design our app to be accessible and useful for cooks of all skill levels and backgrounds.',
    },
    {
      icon: <Heart size={32} className="text-primary-500" />,
      title: 'Passion',
      description:
        'We\'re passionate about food and technology, and we bring that enthusiasm to everything we do.',
    },
  ];

  const team = [
    {
      name: 'SK DANISH',
      role: 'Chief Technology Officer',
      imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      name: 'ABOO BAKR',
      role: 'Chief Technology Officer',
      imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    {
      name: 'IDREES KAZIMI',
      role: 'UI/UX',
      imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    },
    {
      name: 'AFFAN AHMED',
      role: 'Executive',
      imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            About VisionChef
          </h1>
          <p className="text-xl text-gray-600">
            We\'re on a mission to make cooking more accessible, enjoyable, and creative
            for everyone through the power of AI and voice technology.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  VisionChef began with a simple question: How can we use technology to make
                  cooking more accessible and enjoyable for everyone?
                </p>
                <p>
                VisionChef is an AI-powered kitchen assistant that uses computer vision, voice interaction, and retrieval-augmented generation (RAG) to guide users in real-time during cooking. Whether you’re a home cook, a busy student, or someone who just doesn’t know what to do with that one sad-looking tomato in the fridge — VisionChef has your back. Think Jarvis, but for food.
                </p>
                <p>
                  In 2025, during HACK CELERATE all 4 of us i.e, AI engineers, and UX
                  designers to create VisionChef.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-medium">
              <img
                src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"
                alt="VisionChef team brainstorming"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 hover:shadow-medium transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;