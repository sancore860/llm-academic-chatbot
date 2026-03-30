// Preprocessed B.Tech Academic Knowledge Base
// This data is used to train/prime the AI assistant

const btechKnowledgeBase = {
  subjects: {
    CSE: {
      sem1: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Electrical Engineering', 'Programming in C', 'Engineering Drawing'],
      sem2: ['Engineering Mathematics II', 'Data Structures', 'Digital Electronics', 'Object Oriented Programming', 'Environmental Science'],
      sem3: ['Discrete Mathematics', 'Computer Organization & Architecture', 'Database Management Systems', 'Operating Systems', 'Theory of Computation'],
      sem4: ['Design & Analysis of Algorithms', 'Computer Networks', 'Software Engineering', 'Microprocessors', 'Web Technologies'],
      sem5: ['Artificial Intelligence', 'Compiler Design', 'Information Security', 'Machine Learning', 'Mobile Computing'],
      sem6: ['Cloud Computing', 'Big Data Analytics', 'Internet of Things', 'Natural Language Processing', 'Distributed Systems'],
      sem7: ['Deep Learning', 'Blockchain Technology', 'Data Mining', 'Project Management', 'Elective I'],
      sem8: ['Major Project', 'Elective II', 'Industrial Training', 'Seminar']
    },
    ECE: {
      sem1: ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electronics', 'C Programming', 'Engineering Drawing'],
      sem2: ['Engineering Mathematics II', 'Electronic Devices & Circuits', 'Network Theory', 'Digital Electronics'],
      sem3: ['Signals and Systems', 'Analog Circuits', 'Electromagnetic Theory', 'Microprocessors'],
      sem4: ['Communication Systems', 'VLSI Design', 'Control Systems', 'Digital Signal Processing'],
      sem5: ['Wireless Communication', 'Embedded Systems', 'Antenna Theory', 'Optical Communication'],
      sem6: ['Advanced Communication', 'IoT', 'Radar Systems', 'Digital Image Processing'],
      sem7: ['5G Networks', 'FPGA Design', 'Robotics', 'Elective I'],
      sem8: ['Major Project', 'Industrial Training', 'Seminar']
    }
  },

  topics: {
    'Data Structures': {
      concepts: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Hashing', 'Sorting Algorithms', 'Searching Algorithms'],
      timeComplexity: {
        'Array Access': 'O(1)',
        'Array Search': 'O(n)',
        'Array Insert': 'O(n)',
        'Linked List Insert': 'O(1)',
        'Binary Search': 'O(log n)',
        'Bubble Sort': 'O(n²)',
        'Merge Sort': 'O(n log n)',
        'Quick Sort': 'O(n log n) average',
        'Heap Sort': 'O(n log n)',
        'BFS/DFS': 'O(V+E)'
      },
      importantAlgorithms: ['Dijkstra', 'Floyd-Warshall', 'Kruskal', 'Prim', 'Bellman-Ford', 'KMP String Matching', 'Rabin-Karp']
    },
    'DBMS': {
      concepts: ['ER Diagrams', 'Normalization (1NF, 2NF, 3NF, BCNF)', 'SQL', 'Transactions', 'ACID Properties', 'Indexing', 'B-Trees', 'Query Optimization', 'Concurrency Control'],
      sqlCommands: {
        DDL: ['CREATE', 'ALTER', 'DROP', 'TRUNCATE'],
        DML: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        DCL: ['GRANT', 'REVOKE'],
        TCL: ['COMMIT', 'ROLLBACK', 'SAVEPOINT']
      },
      joins: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'SELF JOIN'],
      normalForms: {
        '1NF': 'Atomic values, no repeating groups',
        '2NF': '1NF + no partial dependencies',
        '3NF': '2NF + no transitive dependencies',
        'BCNF': 'Stricter form of 3NF'
      }
    },
    'Operating Systems': {
      concepts: ['Process Management', 'Memory Management', 'File Systems', 'I/O Management', 'Deadlocks', 'Scheduling Algorithms', 'Virtual Memory', 'Semaphores', 'Mutual Exclusion'],
      schedulingAlgorithms: ['FCFS', 'SJF', 'SRTF', 'Round Robin', 'Priority Scheduling', 'Multilevel Queue'],
      memoryManagement: ['Paging', 'Segmentation', 'Page Replacement (LRU, FIFO, Optimal)', 'Thrashing'],
      deadlockConditions: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait']
    },
    'Computer Networks': {
      osiLayers: {
        7: 'Application (HTTP, FTP, DNS, SMTP)',
        6: 'Presentation (SSL/TLS, Encryption)',
        5: 'Session (NetBIOS, PPTP)',
        4: 'Transport (TCP, UDP)',
        3: 'Network (IP, ICMP, ARP)',
        2: 'Data Link (Ethernet, MAC)',
        1: 'Physical (Cables, Hubs)'
      },
      tcpipModel: ['Application', 'Transport', 'Internet', 'Network Access'],
      protocols: {
        'HTTP': 'Port 80 - Web browsing',
        'HTTPS': 'Port 443 - Secure web',
        'FTP': 'Port 21 - File transfer',
        'SSH': 'Port 22 - Secure shell',
        'DNS': 'Port 53 - Domain resolution',
        'SMTP': 'Port 25 - Email sending',
        'POP3': 'Port 110 - Email retrieval',
        'DHCP': 'Port 67/68 - IP assignment'
      },
      ipSubnetting: 'CIDR notation, subnetting, supernetting concepts'
    },
    'OOP Concepts': {
      pillars: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
      concepts: {
        'Encapsulation': 'Binding data and methods together, hiding internal details',
        'Inheritance': 'Child class inherits properties from parent class',
        'Polymorphism': 'Same interface for different data types (overloading/overriding)',
        'Abstraction': 'Hiding complexity, showing only essential features'
      },
      designPatterns: ['Singleton', 'Factory', 'Observer', 'Strategy', 'Decorator', 'MVC']
    },
    'Machine Learning': {
      types: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Semi-supervised Learning'],
      algorithms: {
        supervised: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'KNN', 'Naive Bayes', 'Neural Networks'],
        unsupervised: ['K-Means Clustering', 'Hierarchical Clustering', 'PCA', 'Autoencoders', 'DBSCAN'],
        evaluation: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'ROC-AUC', 'Confusion Matrix', 'Cross-validation']
      }
    },
    'Engineering Mathematics': {
      topics: ['Calculus', 'Linear Algebra', 'Differential Equations', 'Probability & Statistics', 'Numerical Methods', 'Fourier Series', 'Laplace Transform', 'Z-Transform', 'Complex Analysis'],
      importantFormulas: {
        'Euler Formula': 'e^(iθ) = cos θ + i sin θ',
        'Laplace Transform': 'L{f(t)} = ∫₀^∞ e^(-st) f(t) dt',
        'Fourier Series': 'f(x) = a₀/2 + Σ[aₙcos(nπx/L) + bₙsin(nπx/L)]',
        'Bayes Theorem': 'P(A|B) = P(B|A)P(A)/P(B)'
      }
    },
    'Software Engineering': {
      sdlcModels: ['Waterfall', 'Agile', 'Spiral', 'V-Model', 'RAD', 'Prototype', 'Incremental'],
      agileMethodologies: ['Scrum', 'Kanban', 'XP (Extreme Programming)', 'SAFe'],
      testingTypes: ['Unit Testing', 'Integration Testing', 'System Testing', 'Acceptance Testing', 'Regression Testing', 'Performance Testing'],
      designPrinciples: ['SOLID', 'DRY', 'KISS', 'YAGNI']
    },
    'Digital Electronics': {
      numberSystems: ['Binary', 'Octal', 'Hexadecimal', 'BCD', 'Gray Code'],
      logicGates: ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'],
      combinational: ['Half Adder', 'Full Adder', 'Decoder', 'Encoder', 'Multiplexer', 'Demultiplexer'],
      sequential: ['SR Flip-Flop', 'JK Flip-Flop', 'D Flip-Flop', 'T Flip-Flop', 'Registers', 'Counters']
    },
    'Theory of Computation': {
      concepts: ['Automata Theory', 'Regular Languages', 'Context-Free Grammar', 'Turing Machine', 'Decidability', 'Complexity Classes'],
      automata: ['DFA', 'NFA', 'PDA', 'Turing Machine'],
      complexityClasses: ['P', 'NP', 'NP-Hard', 'NP-Complete', 'PSPACE']
    }
  },

  examTips: {
    general: [
      'Start studying at least 2 weeks before exams',
      'Make short notes and formula sheets',
      'Practice previous year question papers',
      'Focus on high-weightage topics first',
      'Form study groups for difficult subjects',
      'Take breaks every 45-60 minutes using Pomodoro technique'
    ],
    paperPattern: {
      'University Exams': '3 hours, 100 marks, mix of theory and problems',
      'Mid-term': '1.5 hours, 30-40 marks, short answer and MCQ',
      'Internals': 'Assignments, quizzes, attendance (20-30 marks)'
    }
  },

  careerPaths: {
    CSE: ['Software Developer', 'Data Scientist', 'DevOps Engineer', 'Cybersecurity Analyst', 'Cloud Architect', 'AI/ML Engineer', 'Full Stack Developer', 'System Analyst'],
    ECE: ['VLSI Engineer', 'Embedded Systems Engineer', 'RF Engineer', 'Telecom Engineer', 'Signal Processing Engineer', 'IoT Developer'],
    general: ['Technical Writer', 'Product Manager', 'Business Analyst', 'Entrepreneur', 'Research Scientist', 'Professor']
  },

  placementPrep: {
    aptitude: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'],
    technicalRounds: ['DSA', 'System Design', 'OOP', 'DBMS', 'OS', 'CN', 'Project Discussion'],
    topCompanies: {
      'FAANG+': ['Google', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Microsoft'],
      'Indian IT Giants': ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra'],
      'Product Companies': ['Flipkart', 'Paytm', 'Zomato', 'Swiggy', 'CRED', 'PhonePe'],
      'PSUs': ['BHEL', 'ONGC', 'SAIL', 'NTPC', 'DRDO', 'ISRO', 'BARC']
    },
    resources: ['LeetCode', 'GeeksForGeeks', 'HackerRank', 'CodeForces', 'InterviewBit', 'Cracking the Coding Interview']
  },

  higherstudies: {
    exams: {
      'GATE': 'Graduate Aptitude Test in Engineering - For M.Tech/PSU jobs',
      'GRE': 'Graduate Record Examination - For MS abroad',
      'TOEFL/IELTS': 'English proficiency for foreign universities',
      'GMAT': 'For MBA programs',
      'CAT': 'For IIM MBA programs'
    },
    topInstitutes: {
      India: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IISc Bangalore', 'BITS Pilani', 'NIT Trichy'],
      Abroad: ['MIT', 'Stanford', 'Carnegie Mellon', 'UC Berkeley', 'University of Toronto', 'ETH Zurich']
    }
  }
};

const systemPrompt = `You are EduBot, an expert academic assistant specifically designed for B.Tech students in India. You have deep knowledge about all B.Tech subjects, university examinations, placement preparation, and career guidance.

## Your Knowledge Base:
You are trained on comprehensive B.Tech academic content including:
- All major branches: CSE, ECE, ME, CE, EE, IT
- All 8 semesters of curriculum
- Core subjects: Data Structures, DBMS, OS, CN, OOP, Algorithms, Machine Learning, Digital Electronics, TOC, Software Engineering, Engineering Mathematics
- Placement preparation for top tech companies
- GATE exam guidance
- Higher studies (MS abroad, M.Tech)
- Project ideas and implementation help
- Study strategies and exam preparation tips

## Detailed Subject Knowledge:

### DATA STRUCTURES & ALGORITHMS:
- Time Complexities: Array Access O(1), Binary Search O(log n), BFS/DFS O(V+E), Sorting - Bubble O(n²), Merge O(n log n), Quick O(n log n) avg
- Important Algorithms: Dijkstra's (shortest path), Floyd-Warshall (all-pairs shortest path), Kruskal/Prim (MST), Bellman-Ford, KMP (string matching)

### DBMS:
- Normalization: 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF
- SQL: DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), Joins (INNER, LEFT, RIGHT, FULL OUTER)
- ACID Properties: Atomicity, Consistency, Isolation, Durability

### OPERATING SYSTEMS:
- Scheduling: FCFS, SJF, SRTF, Round Robin, Priority
- Memory: Paging, Segmentation, LRU/FIFO page replacement
- Deadlock: 4 conditions - Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait

### COMPUTER NETWORKS:
- OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application
- Key Protocols: HTTP(80), HTTPS(443), FTP(21), SSH(22), DNS(53), SMTP(25)

### OOP (Java/C++):
- 4 Pillars: Encapsulation, Inheritance, Polymorphism, Abstraction
- Design Patterns: Singleton, Factory, Observer, Strategy, MVC

### MACHINE LEARNING:
- Types: Supervised (regression, classification), Unsupervised (clustering, dimensionality reduction), Reinforcement
- Algorithms: Linear/Logistic Regression, Decision Trees, Random Forest, SVM, KNN, K-Means, Neural Networks

## How to Respond:
1. Give clear, accurate, structured answers
2. Use examples relevant to B.Tech curriculum
3. Include code snippets when explaining programming concepts
4. Provide time complexities for algorithms
5. Mention exam tips when relevant
6. Suggest resources like GeeksForGeeks, LeetCode, NPTEL
7. Be encouraging and supportive
8. If asked about subjects outside your domain, guide toward related academic resources
9. For placement queries, give practical actionable advice
10. Format responses with headers, bullet points, and code blocks for clarity

Always stay focused on academic and career topics relevant to B.Tech students. Be precise, helpful, and encouraging.`;

module.exports = { btechKnowledgeBase, systemPrompt };
