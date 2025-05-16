
export interface Career {
  id: string;
  title: string;
  description: string;
  educationRequired: string;
  skills: string[];
  personalityTraits: string[];
  averageSalary: { [country: string]: string };
  growthOutlook: string;
  icon: string;
  countries: string[];
}

// Sample career data
export const careers: Career[] = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to identify trends and insights that help organizations make better decisions.',
    educationRequired: "Bachelor's or Master's degree in Data Science, Statistics, Computer Science, or related field",
    skills: ['Machine learning', 'Statistical analysis', 'Python/R programming', 'SQL', 'Data visualization'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Problem-solver', 'Curious', 'Patient'],
    averageSalary: {
      'USA': '$100,000 - $150,000',
      'UK': '£60,000 - £90,000',
      'India': '₹12,00,000 - ₹20,00,000',
      'Canada': 'CA$90,000 - CA$130,000',
      'Australia': 'AU$110,000 - AU$160,000',
      'Germany': '€60,000 - €90,000',
      'Global': '$85,000 - $130,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems to solve specific problems.',
    educationRequired: "Bachelor's degree in Computer Science, Software Engineering, or related field",
    skills: ['Programming languages', 'Algorithms', 'System design', 'Testing', 'Problem-solving'],
    personalityTraits: ['Logical', 'Detail-oriented', 'Creative', 'Team player', 'Continuous learner'],
    averageSalary: {
      'USA': '$90,000 - $140,000',
      'UK': '£50,000 - £80,000',
      'India': '₹8,00,000 - ₹18,00,000',
      'Canada': 'CA$80,000 - CA$120,000',
      'Australia': 'AU$90,000 - AU$140,000',
      'Germany': '€55,000 - €85,000',
      'Global': '$75,000 - $120,000'
    },
    growthOutlook: 'Growing faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Create meaningful and relevant experiences for users by focusing on ease of use and accessibility.',
    educationRequired: "Bachelor's degree in Design, Human-Computer Interaction, or related field",
    skills: ['User research', 'Wireframing', 'Prototyping', 'Usability testing', 'Visual design'],
    personalityTraits: ['Empathetic', 'Creative', 'Collaborative', 'Curious', 'Adaptable'],
    averageSalary: {
      'USA': '$85,000 - $125,000',
      'UK': '£45,000 - £75,000',
      'India': '₹7,00,000 - ₹15,00,000',
      'Canada': 'CA$75,000 - CA$110,000',
      'Australia': 'AU$85,000 - AU$130,000',
      'Germany': '€50,000 - €80,000',
      'Global': '$70,000 - $110,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    description: 'Develop and implement marketing strategies to promote products or services.',
    educationRequired: "Bachelor's degree in Marketing, Business, Communications, or related field",
    skills: ['Market research', 'Campaign management', 'Social media', 'Analytics', 'Content creation'],
    personalityTraits: ['Creative', 'Analytical', 'Communicative', 'Strategic thinker', 'Adaptable'],
    averageSalary: {
      'USA': '$70,000 - $120,000',
      'UK': '£40,000 - £70,000',
      'India': '₹6,00,000 - ₹14,00,000',
      'Canada': 'CA$65,000 - CA$110,000',
      'Australia': 'AU$80,000 - AU$130,000',
      'Germany': '€45,000 - €75,000',
      'Global': '$60,000 - $100,000'
    },
    growthOutlook: 'Growing as fast as average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'nurse-practitioner',
    title: 'Nurse Practitioner',
    description: 'Provide advanced nursing care, often specializing in a specific patient population or healthcare area.',
    educationRequired: "Master's or Doctorate in Nursing plus certification",
    skills: ['Patient assessment', 'Clinical decision-making', 'Prescribing treatment', 'Communication', 'Compassion'],
    personalityTraits: ['Compassionate', 'Detail-oriented', 'Resilient', 'Communicative', 'Composed'],
    averageSalary: {
      'USA': '$100,000 - $130,000',
      'UK': '£45,000 - £70,000',
      'India': '₹5,00,000 - ₹10,00,000',
      'Canada': 'CA$90,000 - CA$120,000',
      'Australia': 'AU$95,000 - AU$130,000',
      'Germany': '€50,000 - €75,000',
      'Global': '$70,000 - $110,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'user',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    description: 'Evaluate investment opportunities and provide financial guidance to businesses and individuals.',
    educationRequired: "Bachelor's degree in Finance, Economics, Accounting, or related field",
    skills: ['Financial modeling', 'Data analysis', 'Research', 'Excel proficiency', 'Written communication'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Organized', 'Ethical', 'Problem-solver'],
    averageSalary: {
      'USA': '$65,000 - $100,000',
      'UK': '£35,000 - £65,000',
      'India': '₹5,00,000 - ₹12,00,000',
      'Canada': 'CA$60,000 - CA$95,000',
      'Australia': 'AU$70,000 - AU$110,000',
      'Germany': '€45,000 - €70,000',
      'Global': '$55,000 - $90,000'
    },
    growthOutlook: 'Growing as fast as average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'Educate students on specific subjects and help them develop critical thinking and social skills.',
    educationRequired: "Bachelor's degree in Education or subject area, plus teaching certification",
    skills: ['Curriculum planning', 'Classroom management', 'Assessment', 'Communication', 'Patience'],
    personalityTraits: ['Patient', 'Creative', 'Communicative', 'Adaptable', 'Empathetic'],
    averageSalary: {
      'USA': '$45,000 - $80,000',
      'UK': '£25,000 - £45,000',
      'India': '₹3,00,000 - ₹8,00,000',
      'Canada': 'CA$50,000 - CA$85,000',
      'Australia': 'AU$65,000 - AU$95,000',
      'Germany': '€40,000 - €65,000',
      'Global': '$40,000 - $70,000'
    },
    growthOutlook: 'Growing about as fast as average',
    icon: 'school',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    description: 'Design, develop, and supervise infrastructure projects and systems.',
    educationRequired: "Bachelor's degree in Civil Engineering, plus licensure for some positions",
    skills: ['Technical design', 'Project management', 'Problem-solving', 'Math', 'Communication'],
    personalityTraits: ['Detail-oriented', 'Problem-solver', 'Team player', 'Analytical', 'Creative'],
    averageSalary: {
      'USA': '$70,000 - $110,000',
      'UK': '£35,000 - £60,000',
      'India': '₹5,00,000 - ₹12,00,000',
      'Canada': 'CA$70,000 - CA$100,000',
      'Australia': 'AU$75,000 - AU$120,000',
      'Germany': '€45,000 - €75,000',
      'Global': '$60,000 - $100,000'
    },
    growthOutlook: 'Growing as fast as average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'hr-specialist',
    title: 'HR Specialist',
    description: 'Recruit, screen, interview, and place workers while handling employee relations and benefits.',
    educationRequired: "Bachelor's degree in Human Resources, Business, or related field",
    skills: ['Interpersonal communication', 'Organization', 'Conflict resolution', 'Employment law', 'Recruiting'],
    personalityTraits: ['Personable', 'Ethical', 'Diplomatic', 'Organized', 'Discreet'],
    averageSalary: {
      'USA': '$60,000 - $90,000',
      'UK': '£30,000 - £55,000',
      'India': '₹4,00,000 - ₹10,00,000',
      'Canada': 'CA$55,000 - CA$85,000',
      'Australia': 'AU$70,000 - AU$100,000',
      'Germany': '€40,000 - €65,000',
      'Global': '$50,000 - $80,000'
    },
    growthOutlook: 'Growing as fast as average',
    icon: 'users',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  },
  {
    id: 'physical-therapist',
    title: 'Physical Therapist',
    description: 'Help injured or ill people improve movement and manage pain through exercises and other techniques.',
    educationRequired: "Doctorate in Physical Therapy",
    skills: ['Patient assessment', 'Treatment planning', 'Anatomy knowledge', 'Communication', 'Physical stamina'],
    personalityTraits: ['Compassionate', 'Patient', 'Motivational', 'Detail-oriented', 'Supportive'],
    averageSalary: {
      'USA': '$85,000 - $120,000',
      'UK': '£35,000 - £60,000',
      'India': '₹4,00,000 - ₹9,00,000',
      'Canada': 'CA$80,000 - CA$110,000',
      'Australia': 'AU$85,000 - AU$120,000',
      'Germany': '€45,000 - €70,000',
      'Global': '$70,000 - $100,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'user',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany']
  }
];

export const educationLevels = [
  { value: 'high-school', label: 'High School Diploma' },
  { value: 'associate', label: 'Associate Degree' },
  { value: 'bachelor', label: 'Bachelor\'s Degree' },
  { value: 'master', label: 'Master\'s Degree' },
  { value: 'doctorate', label: 'Doctorate or Professional Degree' }
];

export const personalityTraits = [
  { value: 'analytical', label: 'Analytical' },
  { value: 'creative', label: 'Creative' },
  { value: 'detail-oriented', label: 'Detail-oriented' },
  { value: 'communicative', label: 'Communicative' },
  { value: 'leader', label: 'Leader' },
  { value: 'team-player', label: 'Team Player' },
  { value: 'adaptable', label: 'Adaptable' },
  { value: 'independent', label: 'Independent' },
  { value: 'patient', label: 'Patient' },
  { value: 'empathetic', label: 'Empathetic' }
];

export const skillCategories = [
  {
    name: 'Technical',
    skills: [
      { value: 'programming', label: 'Programming' },
      { value: 'data-analysis', label: 'Data Analysis' },
      { value: 'design', label: 'Design' },
      { value: 'writing', label: 'Writing' },
      { value: 'research', label: 'Research' }
    ]
  },
  {
    name: 'Soft Skills',
    skills: [
      { value: 'communication', label: 'Communication' },
      { value: 'leadership', label: 'Leadership' },
      { value: 'problem-solving', label: 'Problem Solving' },
      { value: 'time-management', label: 'Time Management' },
      { value: 'teamwork', label: 'Teamwork' }
    ]
  }
];

export const countries = [
  { value: 'USA', label: 'United States', currency: '$' },
  { value: 'UK', label: 'United Kingdom', currency: '£' },
  { value: 'India', label: 'India', currency: '₹' },
  { value: 'Canada', label: 'Canada', currency: 'CA$' },
  { value: 'Australia', label: 'Australia', currency: 'AU$' },
  { value: 'Germany', label: 'Germany', currency: '€' },
  { value: 'Global', label: 'Global Average', currency: '$' }
];

