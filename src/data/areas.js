// The six areas of work. `short` is the About-page text; `long` is the
// fuller description from the former "Our Projects" page.
import { GraduationCap, UtensilsCrossed, HeartHandshake, Stethoscope, LifeBuoy, Users } from 'lucide-react';

export const AREAS = [
  {
    id: 'education',
    title: 'Education',
    longTitle: 'Education & Learning',
    icon: GraduationCap,
    image: 'education-learning',
    imageAlt: 'Children sitting together on the ground, reading picture books and colouring',
    short: 'Education can open doors and change the direction of a person’s life. We support opportunities that encourage learning, development, and a brighter future.',
    long: [
      'Education can open doors and create new possibilities in life. We support learning opportunities that help children and individuals gain knowledge, develop useful skills, and build confidence.',
      'Through education, we hope to help people discover their potential, continue learning, and create a brighter future for themselves and their families.',
    ],
    link: '/education-learning/',
  },
  {
    id: 'food',
    title: 'Food & Basic Support',
    icon: UtensilsCrossed,
    image: 'food-donations',
    imageAlt: 'Volunteers handing out boxes of food at an outdoor distribution table',
    short: 'Everyone deserves access to basic necessities and the dignity that comes with knowing someone cares. We support efforts that provide practical assistance when it is needed.',
    long: [
      'Access to food and basic necessities is important for every person and family. We support people who may be going through difficult circumstances and need practical assistance.',
      'Our aim is to provide support with care and dignity, helping people meet essential needs while giving them greater hope and stability during challenging times.',
    ],
  },
  {
    id: 'orphan-care',
    title: 'Orphan Care',
    icon: HeartHandshake,
    image: 'community-gathering',
    imageAlt: 'A boy sitting among a group of men, looking towards the camera',
    short: 'Every child deserves care, protection, encouragement, and the opportunity to grow. We support initiatives focused on the wellbeing and future of children in need.',
    long: [
      'Every child deserves to feel safe, cared for, and supported as they grow. We support initiatives that focus on the wellbeing, education, development, and future of children in need.',
      'Through care and encouragement, we hope to create opportunities that help children grow with confidence, continue their education, and look forward to a better future.',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    icon: Stethoscope,
    image: 'medical-care',
    imageAlt: 'A smiling doctor with a stethoscope talking with a young girl',
    short: 'Good health is an important part of a secure and fulfilling life. We support initiatives that help make essential healthcare and wellbeing more accessible.',
    long: [
      'Good health is an important part of living a secure and fulfilling life. We support initiatives that help people access essential healthcare and wellbeing support when they need it.',
      'Our focus is on contributing to practical care and support that can make a meaningful difference in people’s everyday lives and help them move forward with greater confidence.',
    ],
    link: '/medical-needs-sponsorship-2/',
  },
  {
    id: 'emergency-relief',
    title: 'Emergency Relief',
    icon: LifeBuoy,
    image: 'flood-relief',
    imageAlt: 'Men wading through a flooded street, carrying a child on a makeshift raft',
    short: 'Difficult situations can happen without warning. We aim to support people and communities when they are facing urgent challenges and need help the most.',
    long: [
      'Difficult situations can happen without warning and can place individuals and families under great pressure. We support emergency relief efforts that provide practical assistance during challenging times.',
      'By responding to urgent needs, we aim to help people and communities receive timely support, regain stability, and move forward with hope.',
    ],
  },
  {
    id: 'community-development',
    title: 'Community Development',
    icon: Users,
    image: 'volunteer-children',
    imageAlt: 'A volunteer kneeling to talk with a crowd of smiling children',
    short: 'Strong communities grow when people participate, grow, and support one another. We support initiatives that build stronger communities.',
    long: [
      'Strong communities grow when people have opportunities to participate, contribute, and support one another. We support initiatives that encourage community involvement and respond to community needs.',
      'Through meaningful action and cooperation, we aim to help build communities that are stronger, more connected, and able to create better opportunities for the future.',
    ],
  },
];
