// The five donation causes. Text is taken from the live majeedia.org pages.
// `donateKey` refers to DONATION_URLS in donations.js.
import { DONATION_URLS } from './donations.js';

export const CAUSES = [
  {
    id: 'education',
    title: 'Education & Learning',
    infoPath: '/education-learning/',
    donatePath: '/education-donate/',
    donateKey: 'education',
    image: 'education-learning',
    imageAlt: 'Children sitting together on the ground, reading picture books and colouring',
    summary: [
      'Education can open doors and create new possibilities in life. We support learning opportunities that help children and individuals gain knowledge, develop useful skills, and build confidence.',
      'Through education, we hope to help people discover their potential, continue learning, and create a brighter future for themselves and their families.',
    ],
    info: {
      seoTitle: 'Education & Learning',
      description:
        'Majeedia Trust supports learning opportunities that help children and individuals gain knowledge, develop useful skills, and build confidence.',
      h1: 'Education & Learning',
      focus: {
        heading: 'Our Focus on Education',
        image: 'community-gathering',
        imageAlt: 'A boy sitting among a group of men, looking towards the camera',
        items: [
          { title: 'Educational Materials', text: 'Books, notebooks, stationery, and other learning materials can help children participate in their education and continue developing their knowledge.' },
          { title: 'Support for Learning', text: 'Encouragement and appropriate learning support can help children strengthen their understanding, develop confidence, and approach their studies with greater interest.' },
          { title: 'Access to Education', text: 'When families face financial difficulties, continuing a child’s education can become challenging. Support towards educational needs can help families work towards keeping learning a priority.' },
          { title: 'Skills & Personal Development', text: 'Learning extends beyond textbooks. Developing communication, problem-solving, creativity, and practical skills can help children prepare for future opportunities.' },
        ],
      },
      stories: [
        {
          heading: 'Why Education Matters',
          paragraphs: [
            'A child’s education can influence opportunities throughout their life. Learning helps children develop independence, build confidence, and prepare for future responsibilities.',
            'When children receive the encouragement and support they need, they have more opportunities to explore their interests, strengthen their abilities, and work towards their goals.',
            'Supporting education also benefits families and communities. Knowledge and skills can open new possibilities, helping people make informed decisions and contribute to the world around them.',
            'We believe that every opportunity to learn matters. By supporting education, we can help create possibilities for children to build brighter futures.',
          ],
          images: [
            { name: 'classroom', alt: 'Pupils studying at wooden desks in a simple classroom' },
            { name: 'children-slates', alt: 'Children sitting on the floor writing on small chalk slates' },
          ],
        },
        {
          heading: 'Every Child Has Potential',
          paragraphs: [
            'Behind every child is a story, a dream, and a future waiting to unfold.',
            'Some children dream of becoming teachers, doctors, engineers, or artists or discovering a path of their own. They all deserve the opportunity to learn, develop their abilities, and work towards those ambitions.',
            'A child’s circumstances should not define what they can achieve. With encouragement, access to learning, and support from people who care, children can begin to see new possibilities for their future.',
            'At Majeedia Trust, we believe that investing in education means believing in the potential of every child.',
          ],
        },
      ],
    },
    donate: {
      seoTitle: 'Donate to Education & Learning',
      description:
        'Help children access learning. Your donation to Majeedia Trust’s Education Fund supports educational resources and encourages children to keep learning.',
      h1: 'Education & Learning',
      eyebrow: 'Why Education Matters',
      heading: 'Education Opens Doors to a Brighter Future',
      image: 'education-learning',
      imageAlt: 'Children sitting together on the ground, reading picture books and colouring',
      body: [
        'Education is about more than books, classrooms, and examinations. It helps children develop their abilities, understand the world around them, and discover what they can achieve.',
        'However, some children face difficulties accessing the resources and support they need to continue their education. Financial challenges, limited learning materials, and a lack of educational opportunities can make the journey harder for children and their families.',
        'We believe every child deserves encouragement and the opportunity to learn. Through our commitment to education, Majeedia Trust aims to contribute towards a future where children can develop their knowledge, strengthen their skills, and pursue their aspirations with confidence.',
      ],
      focusHeading: 'Our Focus on Education',
      focus: [
        { title: 'Access to Learning', text: 'Every child should have the opportunity to learn and develop their abilities. We believe in encouraging access to educational opportunities that help children build knowledge and prepare for the future.' },
        { title: 'Educational Resources', text: 'Books, notebooks, stationery, and other learning materials can make an important difference in a child’s education. Access to these resources can help children participate in learning and develop their understanding.' },
        { title: 'Encouraging Children to Learn', text: 'Children need encouragement, guidance, and a supportive environment to discover their potential. We believe that creating positive learning opportunities can help children develop confidence and continue their educational journey.' },
        { title: 'Skills for the Future', text: 'Education also helps children develop communication, creativity, critical thinking, and problem-solving skills. These abilities can prepare them to face challenges, explore opportunities, and make informed decisions throughout their lives.' },
      ],
      appealEyebrow: 'Support Education',
      appealHeading: 'Every Child Deserves a Chance to Learn',
      appeal: [
        'Every child deserves the opportunity to learn, grow, and build a brighter future. At Majeedia Trust, we believe education can open doors to new possibilities. Through your support, we can help encourage learning opportunities and give children more chances to develop their knowledge, skills, and confidence.',
      ],
    },
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    infoPath: '/maintenance-support/',
    donatePath: '/maintenance-donate/',
    donateKey: 'maintenance',
    image: 'maintenance-volunteer',
    imageAlt: 'A smiling volunteer in a red T-shirt holding a “Please Donate” sign among donation boxes',
    summary: [
      'Maintaining essential facilities and resources is important for the continued work of Majeedia Trust. We aim to support necessary upkeep and repairs to keep these spaces functional and suitable for their intended use.',
      'Our goal is to care for essential resources and help maintain the facilities needed for our activities.',
    ],
    info: {
      seoTitle: 'Maintenance Support',
      description:
        'Support the upkeep and repair of essential facilities and resources so Majeedia Trust can continue its work with the community.',
      h1: 'Maintenance Support',
      focus: {
        heading: 'Our Focus on Maintenance',
        items: [
          { title: 'Essential Repairs', text: 'We support necessary repairs that help keep community facilities safe, functional, and ready to serve people.' },
          { title: 'Facility Upkeep', text: 'Regular care and maintenance help keep essential spaces clean, comfortable, and in good condition.' },
          { title: 'Shared Resources', text: 'We aim to support the upkeep of important facilities and resources used for community activities.' },
          { title: 'Safe Environments', text: 'Well-maintained spaces can help create a more welcoming and suitable environment for everyday needs.' },
          { title: 'Preventive Maintenance', text: 'Timely attention to maintenance needs can help address minor issues before they become bigger problems.' },
          { title: 'Community Support', text: 'Your contribution can help Majeedia Trust care for essential facilities and continue supporting the community.' },
        ],
      },
      help: {
        heading: 'How Your Support Can Help',
        intro: 'Your contribution towards maintenance may help with:',
        items: [
          { title: 'Essential Repairs', text: 'Supporting necessary repairs to facilities and equipment.' },
          { title: 'Regular Upkeep', text: 'Helping maintain clean, functional, and welcoming spaces.' },
          { title: 'Care of Shared Resources', text: 'Supporting the upkeep of resources used for community activities.' },
          { title: 'Ongoing Maintenance Needs', text: 'Helping address maintenance expenses as they arise.' },
        ],
        images: [
          { name: 'donation-boxes', alt: 'A volunteer with a clipboard checking boxes of donated goods' },
          { name: 'volunteer-sweeping', alt: 'Volunteers sweeping and cleaning a street' },
        ],
      },
      stories: [
        {
          heading: 'Together, We Can Care for Our Community',
          paragraphs: [
            'Maintaining essential facilities is an ongoing responsibility. Even small maintenance needs can become challenging when resources are limited. Contributions from caring supporters can help address these needs and support the continued upkeep of important spaces.',
            'By supporting the Maintenance Fund, you can be part of an effort to care for essential facilities and resources. Every contribution is an opportunity to support the work of Majeedia Trust and the community it serves.',
          ],
        },
      ],
      cta: {
        eyebrow: 'Maintenance Support',
        heading: 'Help Us Care for Essential Spaces',
        text: 'Your generosity can help support necessary upkeep and maintenance. Join us in caring for the facilities and resources that matter to our community.',
      },
    },
    donate: {
      seoTitle: 'Donate to Maintenance Support',
      description:
        'Help Majeedia Trust care for essential facilities and resources. Your donation supports repairs, upkeep and preventive maintenance.',
      h1: 'Maintenance Support',
      eyebrow: 'Caring for Our Community',
      heading: 'Maintaining Essential Spaces for a Better Community',
      image: 'helping-hands-laptop',
      imageAlt: 'A laptop showing a charity logo held by a volunteer at a community meeting',
      body: [
        'Every community needs safe, clean, and well-maintained spaces where people can access essential services and take part in everyday activities. Proper maintenance helps keep these spaces functional, welcoming, and ready to serve the people who depend on them. At Majeedia Trust, we believe that caring for essential facilities and resources is an important part of supporting our community.',
      ],
      extraHeading: 'Why Maintenance Matters',
      extra: [
        'Facilities and shared spaces require regular care to remain useful and in good condition. Over time, everyday use can lead to wear and tear, minor damage, and the need for repairs. Without timely maintenance, small issues can become bigger problems and affect how spaces and resources are used.',
        'Maintenance is not only about repairing what is broken. It is also about taking care of existing facilities, keeping resources usable, and helping create an environment where people feel comfortable and supported.',
        'Through your contribution, Majeedia Trust aims to address essential maintenance needs and care for the facilities and resources connected to its work.',
      ],
      focusHeading: 'Our Focus on Maintenance',
      focus: [
        { title: 'Essential Repairs', text: 'Buildings, facilities, and shared spaces may need repairs to remain safe and functional. Your support can help address necessary repair needs and maintain the condition of these spaces.' },
        { title: 'Facility Upkeep', text: 'Regular upkeep helps keep community facilities clean, organised, and welcoming. Maintenance activities can help ensure that spaces remain suitable for the people who use them.' },
        { title: 'Care of Essential Resources', text: 'Equipment, fixtures, and other essential resources need attention to remain useful. Your contribution can help support the upkeep of resources required for ongoing activities.' },
        { title: 'Preventive Maintenance', text: 'Identifying and addressing minor issues early can help prevent more extensive repairs later. Regular maintenance helps protect existing facilities and supports their continued use.' },
      ],
      appealEyebrow: 'Support Maintenance',
      appealHeading: 'Be Part of Caring for Our Community',
      appeal: [
        'Every contribution can help meet important maintenance needs. By supporting this initiative, you can help Majeedia Trust care for essential facilities and resources and continue its work with the community.',
        'Your support, whether small or large, can contribute towards keeping these spaces and resources in good condition for the people who rely on them.',
      ],
    },
  },
  {
    id: 'sponsor',
    title: 'Sponsor a Widow, Destitute Person or Person with a Disability',
    cardTitle: 'Sponsor a Destitute/Handicap',
    infoPath: '/sponsor-a-widow-destitute-handicap/',
    donatePath: '/destitute-handicap-donate/',
    donateKey: 'sponsorWidow',
    image: 'sponsor-support',
    imageAlt: 'A man pushing a friend in a wheelchair along a quiet path',
    summary: [
      'Some individuals face financial difficulties and need additional support with their everyday needs. We aim to assist eligible widows, destitute individuals, and people with disabilities through practical support and care.',
      'Our goal is to help people maintain their dignity and face daily challenges with greater support.',
    ],
    info: {
      seoTitle: 'Sponsor a Widow, Destitute Person or Person with a Disability',
      description:
        'Help eligible widows, destitute individuals and people with disabilities meet everyday needs with dignity through Majeedia Trust sponsorship.',
      h1: 'Sponsorship Support',
      focus: {
        heading: 'Our Focus on Individual Support',
        items: [
          { title: 'Supporting Widows', text: 'Helping eligible widows facing financial hardship manage essential needs and responsibilities.' },
          { title: 'Supporting People in Need', text: 'Offering support to eligible individuals experiencing financial difficulties and challenging circumstances.' },
          { title: 'Supporting People with Disabilities', text: 'Helping address essential needs for eligible people with disabilities while respecting their independence and dignity.' },
          { title: 'Everyday Essentials', text: 'Contributions may help support necessary day-to-day expenses for individuals experiencing hardship.' },
          { title: 'Family Wellbeing', text: 'Supporting eligible individuals and families as they work towards greater stability and wellbeing.' },
          { title: 'Care with Dignity', text: 'We aim to approach every person with compassion, respect, and consideration for their individual circumstances.' },
        ],
      },
      help: {
        heading: 'How Your Support Can Help',
        intro: 'Your contribution can help Majeedia Trust respond to the needs of eligible individuals facing financial hardship.',
        items: [
          { title: 'Essential Needs', text: 'Helping address necessary everyday expenses.' },
          { title: 'Support for Widows', text: 'Contributing towards the needs of eligible widows and their families.' },
          { title: 'Disability-Related Needs', text: 'Helping eligible people with disabilities access practical support.' },
          { title: 'Financial Assistance', text: 'Supporting individuals experiencing difficult financial circumstances.' },
        ],
        images: [
          { name: 'tricycle-wheelchair', alt: 'A man using a hand-powered tricycle wheelchair in a busy courtyard' },
          { name: 'child-wheelchair', alt: 'A boy pushing a wheelchair along a dusty village path' },
        ],
      },
      stories: [
        {
          heading: 'Your Kindness Can Make Someone Feel Supported',
          paragraphs: [
            'Behind every difficult situation is a person with their own hopes, responsibilities, and dreams for the future. Sometimes, a little support at the right time can help ease a burden and remind someone that they are not alone.',
            'By supporting this sponsorship initiative, you can help Majeedia Trust extend care to eligible individuals who are experiencing hardship. Every contribution, whatever its size, is an opportunity to show compassion and support the dignity of others.',
          ],
        },
      ],
      cta: {
        eyebrow: 'Sponsor a Widow/Destitute/Handicap',
        heading: 'Be a Helping Hand to Someone in Need',
        text: 'Your generosity can help provide support to eligible individuals facing financial hardship. Join Majeedia Trust in extending kindness, care, and practical assistance to people who need it.',
      },
    },
    donate: {
      seoTitle: 'Donate – Sponsor a Widow, Destitute Person or Person with a Disability',
      description:
        'Sponsor a widow, a destitute person or a person with a disability. Your donation helps Majeedia Trust address essential needs with compassion and dignity.',
      h1: 'Sponsor a Widow, Destitute Person or Person with a Disability',
      eyebrow: 'Why Your Support Matters',
      heading: 'A Little Support Can Bring Hope and Dignity',
      image: 'sponsor-support',
      imageAlt: 'A man pushing a friend in a wheelchair along a quiet path',
      body: [
        'Life can become challenging when someone loses a loved one, faces financial hardship, or lives with a disability without adequate support. Everyday needs that many people take for granted can become difficult to manage.',
        'Widows, individuals experiencing poverty, and people with disabilities may face barriers to financial independence, healthcare, education, and daily necessities. Beyond material assistance, they also deserve compassion, respect, and the opportunity to live with dignity.',
        'At Majeedia Trust, we believe that everyone deserves care and understanding, regardless of their circumstances. Through your support, we aim to help vulnerable individuals meet essential needs, overcome challenges, and move towards a more secure and hopeful future.',
      ],
      focusHeading: 'Our Focus on Care and Support',
      focus: [
        { title: 'Support for Widows', text: 'Losing a spouse can bring emotional and financial difficulties. We aim to support widows facing hardship by helping them access essential resources and assistance for their everyday needs, so they can move forward with greater confidence and security.' },
        { title: 'Assistance for Destitute Individuals', text: 'No one should have to struggle alone for life’s basic necessities. We aim to help individuals experiencing poverty or difficult circumstances access essential support, including food, clothing, and other necessities according to their needs.' },
        { title: 'Support for People with Disabilities', text: 'Every person deserves the opportunity to live with dignity, independence, and a sense of belonging. We aim to support people with disabilities by helping address everyday challenges and encouraging access to essential resources and opportunities.' },
        { title: 'Restoring Hope and Confidence', text: 'Sometimes, a little help can make a meaningful difference. Your contribution can help ease daily difficulties, strengthen a person’s confidence, and remind them that they are not alone.' },
      ],
      appealEyebrow: 'Sponsor Someone in Need',
      appealHeading: 'Your Kindness Can Make a Difference',
      appeal: [
        'Your support can help Majeedia Trust provide assistance to widows, destitute individuals, and people with disabilities who are facing difficult circumstances.',
        'Every contribution, whatever its size, can help address essential needs and bring comfort, hope, and dignity to someone’s life.',
      ],
    },
  },
  {
    id: 'medical',
    title: 'Medical Needs – Sponsorship',
    infoPath: '/medical-needs-sponsorship-2/',
    donatePath: '/medical-needs-donate/',
    donateKey: 'medical',
    image: 'medical-care',
    imageAlt: 'A smiling doctor with a stethoscope talking with a young girl',
    summary: [
      'Medical expenses can create financial difficulties for individuals and families. We aim to support eligible healthcare-related needs and assist people who may struggle to access necessary medical care.',
      'Our goal is to help ease financial pressure and provide practical support during challenging times.',
    ],
    info: {
      seoTitle: 'Medical Needs – Sponsorship',
      description:
        'Majeedia Trust supports eligible healthcare-related needs for individuals and families who struggle to afford necessary medical care.',
      h1: 'Medical Sponsorship Support',
      focus: {
        heading: 'Our Focus on Medical Needs',
        items: [
          { title: 'Essential Medical Care', text: 'Helping eligible individuals facing financial hardship with expenses related to essential medical care.' },
          { title: 'Medicines and Prescriptions', text: 'Contributing towards prescribed medicines and related healthcare needs, where eligible and supported by the programme.' },
          { title: 'Medical Tests and Consultations', text: 'Helping address eligible expenses associated with medical consultations, diagnostic tests, and healthcare assessments.' },
          { title: 'Support During Treatment', text: 'Offering financial support towards eligible treatment-related expenses for individuals and families experiencing hardship.' },
          { title: 'Family Healthcare Needs', text: 'Helping families manage certain essential healthcare costs when financial difficulties make them harder to afford.' },
          { title: 'Care with Compassion', text: 'Treating every person and family with dignity, understanding, and respect while considering their individual circumstances.' },
        ],
      },
      help: {
        heading: 'How Your Support Can Help',
        intro: 'Your contribution towards medical sponsorship may help Majeedia Trust support eligible individuals and families with essential healthcare expenses.',
        items: [
          { title: 'Medical Expenses', text: 'Helping address eligible costs associated with necessary healthcare.' },
          { title: 'Medicines', text: 'Contributing towards prescribed medicines and related needs.' },
          { title: 'Consultations and Tests', text: 'Helping with eligible medical consultation and diagnostic expenses.' },
          { title: 'Treatment Support', text: 'Contributing towards approved treatment-related costs for people facing financial hardship.' },
        ],
        images: [
          { name: 'health-clinic', alt: 'Health workers attending to patients at a community clinic table' },
          { name: 'blood-pressure-check', alt: 'A nurse checking an elderly woman’s blood pressure' },
        ],
      },
      stories: [
        {
          heading: 'Your Support Can Bring Relief During Difficult Times',
          paragraphs: [
            'When someone in a family needs medical care, financial worries can make an already difficult situation even harder. A helping hand can ease some of that pressure and allow families to focus more on the care and wellbeing of their loved ones.',
            'Through the Medical Needs – Sponsorship initiative, your generosity can help Majeedia Trust respond to eligible healthcare needs with compassion and care. Every contribution can be part of a collective effort to support people facing challenging circumstances.',
          ],
        },
      ],
      cta: {
        eyebrow: 'Medical Needs – Sponsorship',
        heading: 'Help Someone Access Essential Medical Support',
        text: 'Your contribution can help support eligible individuals and families facing healthcare expenses during difficult times. Join Majeedia Trust in extending care, compassion, and practical assistance to those who need support.',
      },
    },
    donate: {
      seoTitle: 'Donate to Medical Needs – Sponsorship',
      description:
        'Help individuals and families afford medical care. Your donation supports treatment, medicines, diagnostic tests and follow-up care.',
      h1: 'Medical Needs – Sponsorship',
      eyebrow: 'Why Medical Support Matters',
      heading: 'Every Life Deserves Access to Care',
      image: 'medical-care',
      imageAlt: 'A smiling doctor with a stethoscope talking with a young girl',
      body: [
        'Good health is essential to living with dignity, security, and hope. However, for individuals and families facing financial difficulties, accessing medical care can become a serious challenge. The cost of consultations, medicines, diagnostic tests, and ongoing treatment can place a heavy burden on those already struggling to meet their daily needs.',
        'At Majeedia Trust, we believe that financial hardship should not prevent someone from seeking the medical care they need. Through medical sponsorship, we aim to support vulnerable individuals and families facing healthcare-related expenses and help them access essential treatment and assistance.',
        'Your kindness can help ease the burden of medical costs and remind someone facing a difficult health journey that they are not alone.',
      ],
      focusHeading: 'Our Focus on Medical Support',
      focus: [
        { title: 'Access to Medical Treatment', text: 'Medical care can be difficult to afford when household resources are limited. We aim to help individuals facing financial hardship access necessary medical consultations, treatments, and healthcare services according to their needs.' },
        { title: 'Medicines and Essential Supplies', text: 'Prescribed medicines and essential medical supplies can be an ongoing expense for many families. Your support can help eligible individuals manage these costs and continue receiving the care they need.' },
        { title: 'Diagnostic Tests and Follow-Up Care', text: 'Medical tests and follow-up appointments are important parts of many treatment journeys. We aim to assist people who face financial barriers to these services, helping them seek appropriate care when needed.' },
        { title: 'Support During Difficult Health Journeys', text: 'Illness can affect not only a person’s health but also the emotional and financial well-being of their entire family. Compassionate support can help reduce some of this pressure and give families greater peace of mind as they navigate challenging circumstances.' },
      ],
      appealEyebrow: 'Sponsor a Medical Need',
      appealHeading: 'Help Someone Access the Care They Need',
      appeal: [
        'Your contribution can help Majeedia Trust support individuals and families who struggle to afford essential medical expenses.',
        'By sponsoring medical needs, you can help ease financial burdens, support access to necessary care, and remind someone facing illness that their well-being matters.',
      ],
    },
  },
  {
    id: 'hifz',
    title: 'Girls’ Hifz Sponsorship',
    infoPath: '/girls-hifz-sponsorship/',
    donatePath: '/girls-hifz-sponsorship-donate/',
    donateKey: 'hifz',
    image: 'girls-hifz',
    imageAlt: 'A girl in a lilac headscarf studying at her desk with classmates behind her',
    summary: [
      'Hifz is the journey of memorising the Holy Quran. We aim to support girls with eligible educational needs and encourage them to continue their Quran memorisation studies.',
      'Our goal is to help girls pursue their religious education in a supportive learning environment.',
    ],
    info: {
      seoTitle: 'Girls’ Hifz Sponsorship',
      description:
        'Support girls memorising the Holy Quran. Majeedia Trust helps with eligible educational needs so girls can continue their Hifz studies.',
      h1: 'Girls’ Hifz Sponsorship',
      focus: {
        heading: 'Our Focus on Hifz Education',
        items: [
          { title: 'Supporting Quran Memorisation', text: 'Encouraging girls who are dedicated to learning and memorising the Holy Quran as part of their educational journey.' },
          { title: 'Educational Assistance', text: 'Helping address eligible education-related expenses for girls pursuing Hifz.' },
          { title: 'Learning Resources', text: 'Supporting eligible learning materials and resources that may assist with Quran memorisation studies.' },
          { title: 'Continuity in Learning', text: 'Helping girls continue their studies when financial difficulties create challenges for their educational progress.' },
          { title: 'A Supportive Learning Environment', text: 'Encouraging access to suitable learning opportunities where girls can focus on their studies and personal development.' },
          { title: 'Encouragement and Care', text: 'Recognizing the dedication of girls pursuing Hifz and supporting their efforts with kindness, respect, and encouragement.' },
        ],
      },
      help: {
        heading: 'How Your Support Can Help',
        intro: 'Your contribution towards Girls’ Hifz Sponsorship may help Majeedia Trust address eligible educational needs and support girls as they continue their Quran memorization journey.',
        items: [
          { title: 'Educational Expenses', text: 'Helping address eligible costs associated with Hifz studies.' },
          { title: 'Learning Materials', text: 'Contributing towards relevant books and educational resources.' },
          { title: 'Study Support', text: 'Helping meet approved learning-related needs.' },
          { title: 'Continuity of Education', text: 'Supporting girls who may face financial barriers to continuing their studies.' },
        ],
        images: [
          { name: 'girls-quran-reading', alt: 'Girls in headscarves sitting on the floor reading from their books' },
          { name: 'elder-girls-reading', alt: 'An elderly man reading the Quran with two young girls' },
        ],
      },
      stories: [
        {
          heading: 'Help a Girl Continue Her Hifz Journey',
          paragraphs: [
            'Every girl deserves the opportunity to pursue her learning with dedication and hope. The journey of memorising the Holy Quran takes commitment, time, and encouragement. For families facing financial difficulties, additional educational expenses can sometimes make that journey more challenging.',
            'Through Girls’ Hifz Sponsorship, your generosity can help Majeedia Trust support eligible girls and their educational needs. Your contribution is a way to encourage their efforts and help them continue working towards their learning goals.',
          ],
        },
      ],
      cta: {
        eyebrow: 'Girls’ Hifz Sponsorship',
        heading: 'Be Part of a Girl’s Hifz Journey',
        text: 'Your generosity can help support girls pursuing Quran memorization and address eligible educational needs along the way. Join Majeedia Trust in encouraging learning, dedication, and continued progress.',
      },
    },
    donate: {
      seoTitle: 'Donate to Girls’ Hifz Sponsorship',
      description:
        'Sponsor a girl’s Hifz education. Your donation helps with tuition, learning materials and other educational needs on her Qur’anic learning journey.',
      h1: 'Girls’ Hifz Sponsorship',
      eyebrow: 'Why Hifz Education Matters',
      heading: 'Nurturing Faith, Knowledge, and a Brighter Future',
      image: 'girls-hifz',
      imageAlt: 'A girl in a lilac headscarf studying at her desk with classmates behind her',
      body: [
        'For many girls, the journey of memorising the Holy Qur’an is a meaningful path of faith, learning, discipline, and personal growth. However, financial difficulties can make it challenging for some families to provide the educational resources and support their daughters need to continue their Hifz journey.',
        'At Majeedia Trust, we believe that every girl who wishes to pursue Qur’anic education deserves encouragement and an opportunity to learn. Through Girls Hifz Sponsorship, we aim to support girls facing financial barriers and help them continue their memorization of the Holy Qur’an in a supportive learning environment.',
        'Your contribution can help ease educational expenses and encourage young girls to grow in knowledge, confidence, and faith.',
      ],
      focusHeading: 'Our Focus on Girls Hifz Sponsorship',
      focus: [
        { title: 'Access to Qur’anic Education', text: 'Every girl deserves the opportunity to pursue meaningful learning. We aim to support girls from financially disadvantaged families who wish to undertake Hifz education and need assistance to continue their studies.' },
        { title: 'Educational Expenses and Learning Resources', text: 'The journey of Hifz may involve expenses related to tuition, learning materials, and other educational needs. Your sponsorship can help eligible students and their families manage these costs.' },
        { title: 'A Supportive Learning Environment', text: 'Memorising the Holy Qur’an requires patience, consistency, guidance, and encouragement. We believe that a supportive educational environment can help girls stay motivated and continue their learning journey with confidence.' },
        { title: 'Encouraging Personal Growth', text: 'Hifz education can nurture dedication, discipline, and a lifelong connection with the Holy Qur’an. By supporting a girl’s educational journey, you can help create opportunities for her spiritual development and personal growth.' },
      ],
      appealEyebrow: 'Sponsor a Girl’s Hifz Education',
      appealHeading: 'Help a Girl Continue Her Qur’anic Learning Journey',
      appeal: [
        'Your contribution can help Majeedia Trust support girls from families facing financial difficulties as they pursue Hifz education.',
        'Every contribution, whatever its size, can help address educational expenses and give a young learner encouragement to continue her journey of memorising the Holy Qur’an.',
      ],
    },
  },
];

export const donateUrlFor = (cause) => DONATION_URLS[cause.donateKey];
export const causeById = (id) => CAUSES.find((c) => c.id === id);
export const GENERAL_CAUSES = ['education', 'maintenance'].map(causeById);
export const SPONSORSHIP_CAUSES = ['sponsor', 'medical', 'hifz'].map(causeById);
