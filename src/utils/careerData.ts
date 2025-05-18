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
  relevantFields: string[];
  countrySpecificInfo?: { [country: string]: { demand: string, regulations?: string } };
  matchScore?: number;
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Data Science', 'Statistics', 'Computer Science', 'Mathematics'],
    countrySpecificInfo: {
      'USA': { demand: 'Very High', regulations: 'No specific certifications required but specialized knowledge in industry regulations may be needed' },
      'UK': { demand: 'High', regulations: 'GDPR knowledge required' },
      'India': { demand: 'Very High', regulations: 'Knowledge of India\'s data protection laws beneficial' },
      'Germany': { demand: 'High', regulations: 'Strong emphasis on data privacy laws compliance' }
    }
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Computer Science', 'Software Engineering', 'Information Technology']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Design', 'Human-Computer Interaction', 'User Experience', 'Visual Design']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Marketing', 'Business', 'Communications', 'Advertising']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Nursing', 'Healthcare', 'Medicine', 'Health Sciences']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Finance', 'Economics', 'Accounting', 'Business']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Education', 'Teaching', 'Subject Specialization']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Civil Engineering', 'Engineering', 'Construction', 'Infrastructure']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Human Resources', 'Business', 'Psychology', 'Management']
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
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Physical Therapy', 'Health Sciences', 'Rehabilitation', 'Kinesiology']
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect computer systems and networks by identifying vulnerabilities and implementing security measures.',
    educationRequired: "Bachelor's degree in Cybersecurity, Computer Science, or related field",
    skills: ['Network security', 'Threat analysis', 'Security protocols', 'Incident response', 'Security software'],
    personalityTraits: ['Detail-oriented', 'Problem-solver', 'Vigilant', 'Ethical', 'Adaptable'],
    averageSalary: {
      'USA': '$90,000 - $130,000',
      'UK': '£45,000 - £75,000',
      'India': '₹6,00,000 - ₹16,00,000',
      'Canada': 'CA$75,000 - CA$115,000',
      'Australia': 'AU$85,000 - AU$130,000',
      'Germany': '€50,000 - €80,000',
      'Global': '$70,000 - $110,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Cybersecurity', 'Computer Science', 'Information Technology', 'Network Security']
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Oversee the development of products from conception to launch, ensuring they meet user needs and business goals.',
    educationRequired: "Bachelor's degree in Business, Engineering, Computer Science, or related field",
    skills: ['Product strategy', 'User research', 'Market analysis', 'Project management', 'Communication'],
    personalityTraits: ['Strategic thinker', 'Customer-focused', 'Decisive', 'Collaborative', 'Analytical'],
    averageSalary: {
      'USA': '$100,000 - $150,000',
      'UK': '£50,000 - £90,000',
      'India': '₹15,00,000 - ₹30,00,000',
      'Canada': 'CA$90,000 - CA$140,000',
      'Australia': 'AU$100,000 - AU$150,000',
      'Germany': '€60,000 - €90,000',
      'Global': '$85,000 - $130,000'
    },
    growthOutlook: 'Growing faster than average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Product Management', 'Business', 'Engineering', 'Computer Science']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Collect, process, and analyze data to help organizations make better business decisions.',
    educationRequired: "Bachelor's degree in Statistics, Mathematics, Economics, or related field",
    skills: ['Data visualization', 'SQL', 'Excel/Spreadsheets', 'Statistical analysis', 'Critical thinking'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Methodical', 'Curious', 'Communicative'],
    averageSalary: {
      'USA': '$65,000 - $95,000',
      'UK': '£30,000 - £55,000',
      'India': '₹5,00,000 - ₹12,00,000',
      'Canada': 'CA$60,000 - CA$90,000',
      'Australia': 'AU$70,000 - AU$100,000',
      'Germany': '€40,000 - €65,000',
      'Global': '$55,000 - $85,000'
    },
    growthOutlook: 'Growing faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Data Analysis', 'Statistics', 'Economics', 'Mathematics']
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    description: 'Create visual concepts to communicate ideas that inspire, inform, or engage consumers.',
    educationRequired: "Bachelor's degree in Graphic Design, Fine Arts, or related field",
    skills: ['Visual design', 'Typography', 'Color theory', 'Adobe Creative Suite', 'Layout design'],
    personalityTraits: ['Creative', 'Detail-oriented', 'Communicative', 'Adaptable', 'Patient'],
    averageSalary: {
      'USA': '$50,000 - $85,000',
      'UK': '£25,000 - £45,000',
      'India': '₹3,00,000 - ₹8,00,000',
      'Canada': 'CA$45,000 - CA$75,000',
      'Australia': 'AU$55,000 - AU$90,000',
      'Germany': '€35,000 - €60,000',
      'Global': '$45,000 - $75,000'
    },
    growthOutlook: 'Growing as fast as average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Graphic Design', 'Fine Arts', 'Visual Communications', 'Design']
  },
  {
    id: 'content-writer',
    title: 'Content Writer/Copywriter',
    description: 'Create engaging written content for websites, blogs, social media, and marketing materials.',
    educationRequired: "Bachelor's degree in English, Journalism, Communications, or related field",
    skills: ['Writing', 'Editing', 'SEO knowledge', 'Research', 'Creativity'],
    personalityTraits: ['Creative', 'Detail-oriented', 'Self-motivated', 'Adaptable', 'Communicative'],
    averageSalary: {
      'USA': '$45,000 - $80,000',
      'UK': '£25,000 - £45,000',
      'India': '₹3,00,000 - ₹8,00,000',
      'Canada': 'CA$45,000 - CA$75,000',
      'Australia': 'AU$55,000 - AU$85,000',
      'Germany': '€30,000 - €55,000',
      'Global': '$40,000 - $70,000'
    },
    growthOutlook: 'Growing as fast as average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Writing', 'English', 'Journalism', 'Communications', 'Marketing']
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Analyze business needs and processes to recommend improvements and solutions.',
    educationRequired: "Bachelor's degree in Business Administration, Finance, Economics, or related field",
    skills: ['Data analysis', 'Process modeling', 'Requirements gathering', 'Problem-solving', 'Communication'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Communicative', 'Organized', 'Problem-solver'],
    averageSalary: {
      'USA': '$70,000 - $100,000',
      'UK': '£35,000 - £60,000',
      'India': '₹6,00,000 - ₹14,00,000',
      'Canada': 'CA$65,000 - CA$95,000',
      'Australia': 'AU$75,000 - AU$110,000',
      'Germany': '€45,000 - €70,000',
      'Global': '$60,000 - $90,000'
    },
    growthOutlook: 'Growing faster than average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Business Administration', 'Finance', 'Economics', 'Information Systems']
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketing Specialist',
    description: 'Plan and execute marketing campaigns across digital channels to increase brand awareness and drive sales.',
    educationRequired: "Bachelor's degree in Marketing, Communications, Business, or related field",
    skills: ['SEO/SEM', 'Social media marketing', 'Content strategy', 'Analytics', 'Email marketing'],
    personalityTraits: ['Creative', 'Analytical', 'Adaptable', 'Strategic thinker', 'Communicative'],
    averageSalary: {
      'USA': '$55,000 - $90,000',
      'UK': '£28,000 - £50,000',
      'India': '₹4,00,000 - ₹12,00,000',
      'Canada': 'CA$50,000 - CA$85,000',
      'Australia': 'AU$60,000 - AU$95,000',
      'Germany': '€35,000 - €65,000',
      'Global': '$50,000 - $85,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Digital Marketing', 'Marketing', 'Communications', 'Business']
  },
  {
    id: 'frontend-developer',
    title: 'Front-End Developer',
    description: 'Build user interfaces and user experiences for websites and applications.',
    educationRequired: "Bachelor's degree in Computer Science, Web Development, or related field",
    skills: ['HTML/CSS', 'JavaScript', 'UI frameworks', 'Responsive design', 'Web performance'],
    personalityTraits: ['Creative', 'Detail-oriented', 'Problem-solver', 'User-focused', 'Continuous learner'],
    averageSalary: {
      'USA': '$75,000 - $120,000',
      'UK': '£35,000 - £70,000',
      'India': '₹6,00,000 - ₹15,00,000',
      'Canada': 'CA$70,000 - CA$110,000',
      'Australia': 'AU$80,000 - AU$125,000',
      'Germany': '€45,000 - €75,000',
      'Global': '$65,000 - $100,000'
    },
    growthOutlook: 'Growing faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Front-End Development', 'Web Development', 'Computer Science', 'UI/UX']
  },
  {
    id: 'architect',
    title: 'Architect',
    description: 'Design buildings and structures that are functional, safe, and visually appealing.',
    educationRequired: "Bachelor's or Master's degree in Architecture plus licensure",
    skills: ['Design skills', 'CAD software', 'Building codes', 'Project management', 'Visualization'],
    personalityTraits: ['Creative', 'Detail-oriented', 'Analytical', 'Spatial awareness', 'Problem-solver'],
    averageSalary: {
      'USA': '$70,000 - $120,000',
      'UK': '£35,000 - £70,000',
      'India': '₹5,00,000 - ₹15,00,000',
      'Canada': 'CA$65,000 - CA$110,000',
      'Australia': 'AU$70,000 - AU$120,000',
      'Germany': '€40,000 - €70,000',
      'Global': '$60,000 - $100,000'
    },
    growthOutlook: 'Growing as fast as average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'India', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Architecture', 'Design', 'Construction', 'Urban Planning']
  },
  {
    id: 'ai-ethics-specialist',
    title: 'AI Ethics Specialist',
    description: 'Ensure artificial intelligence systems are designed and implemented ethically, focusing on fairness, accountability, and transparency.',
    educationRequired: "Master's or PhD in Computer Science, Ethics, Philosophy, or related field with AI focus",
    skills: ['AI systems', 'Ethics frameworks', 'Policy development', 'Research', 'Technical writing'],
    personalityTraits: ['Analytical', 'Ethical', 'Detail-oriented', 'Critical thinker', 'Communicative'],
    averageSalary: {
      'USA': '$120,000 - $180,000',
      'UK': '£65,000 - £95,000',
      'Canada': 'CA$100,000 - CA$150,000',
      'Germany': '€70,000 - €110,000',
      'Australia': 'AU$115,000 - AU$170,000',
      'Global': '$95,000 - $160,000'
    },
    growthOutlook: 'Growing rapidly as AI adoption increases',
    icon: 'laptop',
    countries: ['USA', 'UK', 'Canada', 'Germany', 'Australia'],
    relevantFields: ['Artificial Intelligence', 'Ethics', 'Philosophy', 'Computer Science', 'Policy'],
    countrySpecificInfo: {
      'USA': { demand: 'High', regulations: 'Emerging regulations across different sectors' },
      'UK': { demand: 'High', regulations: 'Strong focus on ethical AI frameworks' },
      'Germany': { demand: 'Very High', regulations: 'Strict regulatory environment for AI applications' }
    }
  },
  {
    id: 'sustainability-consultant',
    title: 'Sustainability Consultant',
    description: 'Advise organizations on environmental sustainability practices, carbon footprint reduction, and ESG (Environmental, Social, Governance) initiatives.',
    educationRequired: "Bachelor's or Master's degree in Environmental Science, Sustainability, or related field",
    skills: ['Environmental assessment', 'Carbon accounting', 'Sustainability reporting', 'Strategy development', 'Stakeholder engagement'],
    personalityTraits: ['Analytical', 'Strategic thinker', 'Communicative', 'Passionate', 'Detail-oriented'],
    averageSalary: {
      'USA': '$75,000 - $120,000',
      'UK': '£40,000 - £80,000',
      'Canada': 'CA$70,000 - CA$110,000',
      'Australia': 'AU$80,000 - AU$130,000',
      'Germany': '€50,000 - €90,000',
      'Global': '$65,000 - $100,000'
    },
    growthOutlook: 'Growing much faster than average due to climate concerns',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Environmental Science', 'Sustainability', 'Business', 'Policy'],
    countrySpecificInfo: {
      'Germany': { demand: 'Very High', regulations: 'Advanced sustainability regulations and standards' },
      'Australia': { demand: 'High', regulations: 'Growing focus on climate adaptation strategies' },
      'UK': { demand: 'High', regulations: 'Strong ESG reporting requirements' }
    }
  },
  {
    id: 'renewable-energy-engineer',
    title: 'Renewable Energy Engineer',
    description: 'Design, develop, and implement renewable energy systems such as solar, wind, and hydroelectric power.',
    educationRequired: "Bachelor's or Master's degree in Engineering with focus on renewable energy",
    skills: ['Engineering design', 'System optimization', 'Project management', 'Technical analysis', 'Sustainability assessment'],
    personalityTraits: ['Analytical', 'Innovative', 'Detail-oriented', 'Problem-solver', 'Environmentally conscious'],
    averageSalary: {
      'USA': '$80,000 - $120,000',
      'UK': '£45,000 - £70,000',
      'Germany': '€55,000 - €85,000',
      'Australia': 'AU$85,000 - AU$130,000',
      'India': '₹8,00,000 - ₹15,00,000',
      'Global': '$70,000 - $110,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'Germany', 'Australia', 'India'],
    relevantFields: ['Engineering', 'Environmental Science', 'Energy', 'Sustainability'],
    countrySpecificInfo: {
      'Germany': { demand: 'Very High', regulations: 'Strong government support and regulations for renewable energy' },
      'Australia': { demand: 'High', regulations: 'Growing renewable energy sector with supportive policies' },
      'India': { demand: 'Very High', regulations: 'Rapidly expanding renewable energy industry with government incentives' }
    }
  },
  {
    id: 'healthcare-data-analyst',
    title: 'Healthcare Data Analyst',
    description: 'Analyze healthcare data to improve patient outcomes, operational efficiency, and cost-effectiveness in healthcare organizations.',
    educationRequired: "Bachelor's or Master's degree in Health Informatics, Data Science, or related field",
    skills: ['Healthcare analytics', 'Statistical analysis', 'Data visualization', 'SQL', 'Healthcare systems'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Problem-solver', 'Patient', 'Ethical'],
    averageSalary: {
      'USA': '$75,000 - $110,000',
      'UK': '£40,000 - £65,000',
      'Canada': 'CA$70,000 - CA$100,000',
      'Australia': 'AU$80,000 - AU$120,000',
      'Germany': '€45,000 - €75,000',
      'Global': '$65,000 - $95,000'
    },
    growthOutlook: 'Growing faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'Canada', 'Australia', 'Germany'],
    relevantFields: ['Health Informatics', 'Data Science', 'Healthcare', 'Statistics'],
    countrySpecificInfo: {
      'USA': { demand: 'Very High', regulations: 'HIPAA compliance knowledge required' },
      'UK': { demand: 'High', regulations: 'NHS data governance framework understanding needed' },
      'Canada': { demand: 'High', regulations: 'Provincial health data regulations apply' }
    }
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    description: 'Design and implement blockchain-based solutions for various industries, including finance, supply chain, and healthcare.',
    educationRequired: "Bachelor's degree in Computer Science or related field with specialization in blockchain technology",
    skills: ['Smart contracts', 'Cryptography', 'Distributed systems', 'Programming languages', 'Security'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Innovative', 'Continuous learner', 'Problem-solver'],
    averageSalary: {
      'USA': '$120,000 - $180,000',
      'UK': '£60,000 - £110,000',
      'Canada': 'CA$90,000 - CA$150,000',
      'Singapore': 'S$100,000 - S$160,000',
      'Switzerland': 'CHF110,000 - CHF180,000',
      'Global': '$100,000 - $150,000'
    },
    growthOutlook: 'Growing rapidly in specific sectors',
    icon: 'laptop',
    countries: ['USA', 'UK', 'Canada', 'Singapore', 'Switzerland'],
    relevantFields: ['Computer Science', 'Cryptography', 'Finance', 'Security'],
    countrySpecificInfo: {
      'Singapore': { demand: 'Very High', regulations: 'Progressive regulatory environment for blockchain' },
      'Switzerland': { demand: 'Very High', regulations: 'Crypto Valley ecosystem with favorable regulations' },
      'USA': { demand: 'High', regulations: 'Varied regulations across different states' }
    }
  },
  {
    id: 'telehealth-specialist',
    title: 'Telehealth Specialist',
    description: 'Facilitate remote healthcare services using technology to improve access to care and patient outcomes.',
    educationRequired: "Bachelor's degree in Nursing, Health Sciences, or related field with telehealth certification",
    skills: ['Healthcare knowledge', 'Digital communication', 'Technical troubleshooting', 'Patient education', 'Documentation'],
    personalityTraits: ['Patient', 'Empathetic', 'Communicative', 'Adaptable', 'Detail-oriented'],
    averageSalary: {
      'USA': '$65,000 - $95,000',
      'UK': '£35,000 - £60,000',
      'Canada': 'CA$60,000 - CA$90,000',
      'Australia': 'AU$70,000 - AU$100,000',
      'India': '₹5,00,000 - ₹10,00,000',
      'Global': '$55,000 - $85,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'user',
    countries: ['USA', 'UK', 'Canada', 'Australia', 'India'],
    relevantFields: ['Healthcare', 'Nursing', 'Health Informatics', 'Telemedicine'],
    countrySpecificInfo: {
      'USA': { demand: 'Very High', regulations: 'State-by-state licensing requirements' },
      'Australia': { demand: 'High', regulations: 'Government-supported telehealth initiatives' },
      'India': { demand: 'Very High', regulations: 'Expanding telehealth infrastructure with government support' }
    }
  },
  {
    id: 'robotic-process-automation-developer',
    title: 'RPA Developer',
    description: 'Design and implement software robots to automate repetitive business processes across various industries.',
    educationRequired: "Bachelor's degree in Computer Science, IT, or related field with RPA certification",
    skills: ['Process analysis', 'Automation tools (UiPath, Blue Prism, Automation Anywhere)', 'Programming', 'System integration', 'Problem-solving'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Creative', 'Logical', 'Process-driven'],
    averageSalary: {
      'USA': '$85,000 - $130,000',
      'UK': '£45,000 - £80,000',
      'India': '₹6,00,000 - ₹15,00,000',
      'Japan': '¥7,000,000 - ¥12,000,000',
      'Global': '$70,000 - $120,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'India', 'Japan'],
    relevantFields: ['Software Development', 'Automation', 'Business Process Management', 'IT'],
    countrySpecificInfo: {
      'Japan': { demand: 'Very High', regulations: 'Strong focus on automation due to aging workforce' },
      'India': { demand: 'Very High', regulations: 'Major global RPA delivery center' },
      'USA': { demand: 'High', regulations: 'Strong demand across finance, healthcare, and insurance sectors' }
    }
  },
  {
    id: 'bioinformatics-scientist',
    title: 'Bioinformatics Scientist',
    description: 'Apply computational techniques to analyze and interpret biological data, particularly in genomics and proteomics.',
    educationRequired: "Master's or PhD in Bioinformatics, Computational Biology, or related field",
    skills: ['Genomic data analysis', 'Programming (Python, R)', 'Statistical modeling', 'Database management', 'Molecular biology knowledge'],
    personalityTraits: ['Analytical', 'Detail-oriented', 'Patient', 'Curious', 'Methodical'],
    averageSalary: {
      'USA': '$90,000 - $140,000',
      'UK': '£45,000 - £75,000',
      'Germany': '€55,000 - €85,000',
      'Switzerland': 'CHF90,000 - CHF140,000',
      'Global': '$80,000 - $120,000'
    },
    growthOutlook: 'Growing faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'Germany', 'Switzerland'],
    relevantFields: ['Bioinformatics', 'Computational Biology', 'Genetics', 'Data Science'],
    countrySpecificInfo: {
      'Switzerland': { demand: 'High', regulations: 'Strong pharmaceutical industry presence' },
      'Germany': { demand: 'High', regulations: 'Growing biotech sector with government support' },
      'USA': { demand: 'Very High', regulations: 'Leading research institutions and biotechnology companies' }
    }
  },
  {
    id: 'virtual-reality-developer',
    title: 'Virtual Reality Developer',
    description: 'Design and create immersive virtual reality experiences for entertainment, education, healthcare, and training purposes.',
    educationRequired: "Bachelor's degree in Computer Science, Game Development, or related field",
    skills: ['3D modeling', 'VR platforms (Unity, Unreal)', 'UI/UX design', 'Programming', 'Spatial design'],
    personalityTraits: ['Creative', 'Detail-oriented', 'Technical', 'Innovative', 'User-focused'],
    averageSalary: {
      'USA': '$85,000 - $140,000',
      'UK': '£45,000 - £80,000',
      'Japan': '¥7,000,000 - ¥12,000,000',
      'South Korea': '₩60,000,000 - ₩100,000,000',
      'Global': '$75,000 - $120,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'laptop',
    countries: ['USA', 'UK', 'Japan', 'South Korea'],
    relevantFields: ['Game Development', 'Computer Science', 'Digital Media', '3D Design'],
    countrySpecificInfo: {
      'Japan': { demand: 'Very High', regulations: 'Strong gaming and entertainment industry focus' },
      'South Korea': { demand: 'Very High', regulations: 'Advanced digital entertainment ecosystem' },
      'USA': { demand: 'High', regulations: 'Growing applications in healthcare, education, and enterprise' }
    }
  },
  {
    id: 'digital-transformation-consultant',
    title: 'Digital Transformation Consultant',
    description: 'Help organizations adopt digital technologies and processes to improve business operations and customer experiences.',
    educationRequired: "Bachelor's or Master's degree in Business, IT, or related field",
    skills: ['Change management', 'Digital strategy', 'Process optimization', 'Project management', 'Data analysis'],
    personalityTraits: ['Strategic thinker', 'Adaptable', 'Communicative', 'Problem-solver', 'Collaborative'],
    averageSalary: {
      'USA': '$100,000 - $160,000',
      'UK': '£60,000 - £110,000',
      'Canada': 'CA$90,000 - CA$140,000',
      'UAE': 'AED350,000 - AED550,000',
      'Singapore': 'S$100,000 - S$170,000',
      'Global': '$90,000 - $140,000'
    },
    growthOutlook: 'Growing much faster than average',
    icon: 'briefcase',
    countries: ['USA', 'UK', 'Canada', 'UAE', 'Singapore'],
    relevantFields: ['Business Consulting', 'Information Technology', 'Digital Strategy', 'Change Management'],
    countrySpecificInfo: {
      'UAE': { demand: 'Very High', regulations: 'Major governmental digital transformation initiatives' },
      'Singapore': { demand: 'Very High', regulations: 'Smart Nation initiative driving digital adoption' },
      'UK': { demand: 'High', regulations: 'Strong focus on digital government and public services' }
    }
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
  { value: 'Japan', label: 'Japan', currency: '¥' },
  { value: 'Singapore', label: 'Singapore', currency: 'S$' },
  { value: 'Switzerland', label: 'Switzerland', currency: 'CHF' },
  { value: 'South Korea', label: 'South Korea', currency: '₩' },
  { value: 'UAE', label: 'United Arab Emirates', currency: 'AED' },
  { value: 'Global', label: 'Global Average', currency: '$' }
];

export const specializationOptions = {
  'high-school': [],
  'associate': [
    { value: 'general-studies', label: 'General Studies' },
    { value: 'business-admin', label: 'Business Administration' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'liberal-arts', label: 'Liberal Arts' }
  ],
  'bachelor': [
    { value: 'business', label: 'Business & Management' },
    { value: 'computer-science', label: 'Computer Science & IT' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'health-sciences', label: 'Health Sciences' },
    { value: 'social-sciences', label: 'Social Sciences' },
    { value: 'arts-humanities', label: 'Arts & Humanities' },
    { value: 'education', label: 'Education' },
    { value: 'natural-sciences', label: 'Natural Sciences' }
  ],
  'master': [
    { value: 'mba', label: 'Business Administration (MBA)' },
    { value: 'computer-science', label: 'Computer Science & IT' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'health-sciences', label: 'Health Sciences' },
    { value: 'education', label: 'Education' },
    { value: 'public-admin', label: 'Public Administration' },
    { value: 'arts-humanities', label: 'Arts & Humanities' },
    { value: 'natural-sciences', label: 'Natural Sciences' }
  ],
  'doctorate': [
    { value: 'phd-science', label: 'PhD in Sciences' },
    { value: 'phd-engineering', label: 'PhD in Engineering' },
    { value: 'phd-humanities', label: 'PhD in Humanities' },
    { value: 'medical', label: 'Medical Degree' },
    { value: 'law', label: 'Law Degree' },
    { value: 'education', label: 'Doctorate in Education' }
  ]
};
