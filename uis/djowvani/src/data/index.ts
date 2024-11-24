import { IExperience } from "@/components/Experience";

import {
  reactColor,
  javaScriptColor,
  typeScriptColor,
  styledComponentsColor,
  ecmaScriptColor,
  threeJsColor,
  sassColor,
  reactHookFormColor,
  reduxColor,
  jenkinsColor,
  gitHubColor,
  gitLabColor,
  dBeaverColor,
  postgreSqlColor,
  reactNativeColor,
  expoColor,
  sonarQubeColor,
  lighthouseColor,
  nodeJsColor,
  reactQueryColor,
  axiosColor,
  devopsColor,
  agileColor,
  scrumColor,
  formikColor,
  notionColor,
  trelloColor,
  jiraColor,
  yupColor,
  tailwindColor,
  lodashColor,
  nextjsColor,
  jestColor,
  awsColor,
  cypressColor,
  asciidoctorColor,
  d3Color,
  vercelColor,
  herokuColor,
  highChartsColor,
  microfrontendColor,
  viteColor,
  cloudfrontColor,
  gitColor,
  swcColor,
  pnpmColor,
  yarnColor,
  admobColor,
  insomniaColor,
  postmanColor,
  mongoDbColor,
  cordovaColor,
  jspColor,
} from "@/styles/abstracts/_variables";

export const headTabTitle = "Djow | Software Engineer";

export const headerOptions = [
  {
    name: "about",
    scrollTarget: "2",
    aria: "Go to about me section",
  },
  {
    name: "work",
    scrollTarget: "3",
    aria: "Go to work and experience section",
  },
  {
    name: "contact",
    scrollTarget: "4",
    aria: "Go to contact me section",
  },
];

export const professionalBio_1 =
  "I'm Giovani, a Front-end focused software engineer.";
export const professionalBio_2 =
  "I strive to create high-quality software experiences by developing clean, readable and scalable code. My goal is to deliver an elegant UI/UX that adds value in the most performant and intuitive way.";

export const personalBio_1 =
  "A bit of background on web and graphic design. \n Big enthusiast of gaming, music and arts.";
export const personalBio_2 = "ᴋᴀɪᴢᴇɴ 改善";

export const education: IExperience[] = [
  {
    title: "Bachelor in Software Engineering",
    where: "Pontifical Catholic University of Campinas",
    timespan: "2017 - 2021",
    description:
      "The Software Engineering course (bachelor's degree) aims to train qualified professionals to work in the Information Technology (IT) area, with a focus on the development lifecycle of application software: design, develop, implement and maintain software infrastructure. The course was an academic step on shaping my worldview of life using technology, it helped me build knowledge on the IT ecosystem: software product solutions, business opportunities, project management methodologies and processes improvement. To understand and problem solve through modern society's needs.",
    link: "https://www.puc-campinas.edu.br/",
    aria: "View Pontifical Catholic University of Campinas' website",
  },
];

export const jobs: IExperience[] = [
  {
    title: "Software Development Analyst",
    where: "Venturus - Developing the Future",
    format: "full-time",
    timespan: "2020 - current",
    description:
      "As a frontend developer, I contributed to various projects, both internal products and as a contractor for international clients. Proficient in agile development methodologies, I consistently applied best practices to ensure clean, cohesive, and scalable code and project architecture. Special attention to ensuring a seamless UI/UX experience.",
    link: "https://venturus.org.br/",
    aria: "View Venturus' website",
  },
  {
    title: "Software Development Intern",
    where: "Stoom E-commerce Platform",
    format: "part-time",
    timespan: "2019",
    description:
      "Handled fullstack activities related to updates and maintenance of e-commerce plataforms.",
    link: "https://stoom.com.br/",
    aria: "View Stoom's website",
  },
  {
    title: "Software Development Intern",
    where: "Embrapa Agricultural Informatics",
    format: "part-time",
    timespan: "2018",
    description:
      "For my initial internship, I worked on an app project at a state-owned company, assisting in the management of water resources in critical river basins.",
    link: "https://www.embrapa.br/agricultura-digital",
    aria: "View Embrapa's website",
  },
];

export const personalProjects: IExperience[] = [
  {
    title: "Webpage portfolio",
    timespan: "2024",
    description:
      "Yes, the webpage you're looking at right now! The culmination of a years-long desire to feel author of something with my own aesthetic, tunneled into a webpage that could act as both curriculum and technical demonstration.",
  },
  {
    title: "Troca Figurinhas",
    timespan: "2022",
    description:
      'Troca Figurinhas ("Exchange Stickers") was a mobile app developed using React Native + Expo, with the intent of easing Qatar World Cup 2022 sticker exchanges. I was co-author of this project with ',
    extraLink: {
      content: "a dear friend of mine.",
      source: "https://www.linkedin.com/in/haniel-biazon/",
      aria: "View Haniel Biazon's webpage",
    },
  },
  {
    title: "Google Developer Group Campinas",
    timespan: "2017 - 2019",
    description:
      "GDG (Google Developer Group) is a Google initiative to encourage the existence of local developer communities to share knowledge on various topics and aspects of Technology, including personal/academic/professional self-development. I helped Campinas' GDG community mostly in 2017, creating promotional designs and staff at events.",
  },
];

const experienceCore = [
  {
    icon: "/img/react-icon.webp",
    value: "React",
    category: "frontend",
    count: 40,
    color: reactColor,
    blackText: true,
    description:
      "A JavaScript library for building user interfaces. React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
  },
  {
    icon: "/img/next-icon.webp",
    value: "Next.js",
    category: "frontend",
    count: 40,
    color: nextjsColor,
    description:
      "A React framework that handles tooling and configuration, providing additional structure, features, and optimizations for an application. Mainly for a static webpages approach, a bit different from your regular Single-page Application.",
  },
  {
    icon: "/img/javascript-icon.webp",
    value: "JavaScript",
    category: "frontend",
    count: 40,
    color: javaScriptColor,
    blackText: true,
    description:
      "JavaScript is a scripting or programming language that allows the implementation of complex features on web pages. It acts as the logic layer of a webpage, since it can update and change both HTML and CSS, calculate, manipulate, validate data and so much more.",
  },
  {
    icon: "/img/typescript-icon.webp",
    value: "TypeScript",
    category: "frontend",
    count: 40,
    color: typeScriptColor,
    description:
      "A superset of JavaScript to enable more solid control over code. It supports type annotations, interfaces, and classes, as well as detect errors upon compile-time (instead of testing and encountering them on run-time as in JavaScript).",
  },
  {
    icon: "/img/ecmascript-icon.webp",
    value: "ECMAScript",
    category: "frontend",
    count: 40,
    color: ecmaScriptColor,
    blackText: true,
    description:
      "ECMAScript is a specification (whose JavaScript is based on). It provides the rules, details, and guidelines that a scripting language must observe to be considered ECMAScript compliant.",
  },
  {
    icon: "/img/styled-components-icon.webp",
    value: "Styled Components",
    category: "frontend",
    count: 30,
    color: styledComponentsColor,
    description:
      "A library that allows you to write CSS in JS while building custom components. It is the meant to be a successor of CSS Modules, a way to write CSS that's scoped to a single component, and not leak to any other element in the page.",
  },
  {
    icon: "/img/sass-icon.webp",
    value: "Sass",
    category: "frontend",
    count: 30,
    color: sassColor,
    description:
      "Sass (Syntactically Awesome Stylesheet) is an extension and pre-processor to CSS. It's intent is to reduce repetition of CSS and therefore save time. More in depth specifically, I've mostly used SCSS.",
  },
  {
    icon: "/img/microfrontend-icon.webp",
    value: "Micro-frontend",
    category: "frontend",
    count: 30,
    color: microfrontendColor,
    description:
      "An architectural approach that involves breaking down a monolithic frontend application into smaller, independently deployable and scalable modules that represent a specific functionality or feature of the application. On some scenarios, it can benefit the workflow of multiple teams working independently on different parts of an application and it's scalability.",
  },
  {
    icon: "/img/react-hook-form-icon.webp",
    value: "React Hook Form",
    category: "frontend",
    count: 30,
    color: reactHookFormColor,
    description:
      "A handy library that helps managing complex website forms. With excellent performance, super lightweight size with zero dependencies, it provides an intuitive API and excellent developer experience.",
  },
  {
    icon: "/img/yup-icon.webp",
    value: "Yup",
    category: "frontend",
    count: 30,
    color: yupColor,
    description:
      "Another handy library to aid in complex forms. Yup is a schema builder for runtime value parsing and validation. It can transform a value to match, assert the shape of an existing value, make interdependent validations and more.",
  },
  {
    icon: "/img/vercel-icon.webp",
    value: "Vercel",
    category: "tool",
    count: 30,
    color: vercelColor,
    description:
      "A platform for frontend developers, aimed at hosting applications in a simple and fast way. It is known for being the creator of the Next JS framework.",
  },
  {
    icon: "/img/lighthouse-icon.webp",
    value: "Lighthouse",
    category: "tool",
    count: 30,
    color: lighthouseColor,
    description:
      "Google Lighthouse is an open-source free automated tool for improving the performance, quality, and correctness of your web apps. It audits and offers improvement suggestions for your pages' performance, accessibility, SEO, and more.",
  },
  {
    icon: "/img/vite-icon.webp",
    value: "Vite",
    category: "frontend",
    count: 20,
    color: viteColor,
    blackText: true,
    description:
      "A platform-agnostic frontend tool for building web applications quickly, with advantages such as faster build times, optimized code sizes and more.",
  },
  {
    icon: "/img/tailwind-icon.webp",
    value: "Tailwind",
    category: "frontend",
    count: 20,
    color: tailwindColor,
    blackText: true,
    description:
      "An utility-first CSS framework designed to enable users to create applications faster and easier. It benefits on writing less custom CSS, keeping files small using using PurgeCSS optimization (removal of unnecessary unused styles), and more.",
  },
  {
    icon: "/img/three-icon.webp",
    value: "Three.js",
    category: "frontend",
    count: 20,
    color: threeJsColor,
    description:
      "Three.js is a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser using WebGL.",
  },
  {
    icon: "/img/redux-icon.webp",
    value: "Redux",
    category: "frontend",
    count: 20,
    color: reduxColor,
    description:
      "An open-source JavaScript library for managing application state. A predictable state container designed to help you write apps that behave consistently across client, server, and native environments.",
  },
  {
    icon: "/img/react-native-icon.webp",
    value: "React Native",
    category: "frontend",
    count: 20,
    color: reactNativeColor,
    blackText: true,
    description:
      "React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android. It’s based on React, Facebook’s JavaScript library for building user interfaces, but instead of targeting the browser, it targets mobile platforms.",
  },
  {
    icon: "/img/expo-icon.webp",
    value: "Expo",
    category: "frontend",
    count: 20,
    color: expoColor,
    description:
      "A framework that extends React Native, it brings together the best of mobile and the web and enables many important features for building and scaling an app such as live updates, instantly sharing your app, and web support.",
  },
  {
    icon: "/img/highcharts-icon.webp",
    value: "Highcharts",
    category: "frontend",
    count: 20,
    color: highChartsColor,
    description:
      "A JavaScript library that allows implementation of interactive and dynamic charts inside a web application as SVG or VML (for Internet Explorer), which are vector image formats.",
  },
  {
    icon: "/img/yarn-icon.webp",
    value: "Yarn",
    category: "frontend",
    count: 20,
    color: yarnColor,
    description:
      "An alternative npm package manager, Yarn was created as a collaboration of Facebook (now Meta), Exponent (now Expo.dev), Google, and Tilde (the company behind Ember.js) to solve consistency, security, and performance problems with large codebases.",
  },
  {
    icon: "/img/pnpm-icon.webp",
    value: "pnpm",
    category: "frontend",
    count: 20,
    color: pnpmColor,
    blackText: true,
    description:
      "An alternative package manager for Node.js which stands for “Performant NPM”. The main purpose of PNPM is to hold all the packages at a global (centralized) store and use them if needed by other projects too by creating hard links to it.",
  },
  {
    icon: "/img/heroku-icon.webp",
    value: "Heroku",
    category: "tool",
    count: 20,
    color: herokuColor,
    description:
      "A container-based cloud Platform as a Service (PaaS). Used to deploy, manage, and scale modern apps. It supports several programming languages like Java, Node.js, Scala, Clojure, Python, PHP, and Go.",
  },
  {
    icon: "/img/trello-icon.webp",
    value: "Trello",
    category: "tool",
    count: 20,
    color: trelloColor,
    description:
      "A popular, simple, and easy-to-use collaboration tool that enables you to organize projects and everything related to them into boards. It benefits finding all kinds of information, regarding your teams' workflow.",
  },
  {
    icon: "/img/jira-icon.webp",
    value: "Jira",
    category: "",
    count: 20,
    color: jiraColor,
    description:
      "A bug tracking tool that allows software developers to plan, track and work faster. It acts as the main source of information for future software release. Developers can plan new features to be added and bugs to be fixed in the next release.",
  },
  {
    icon: "/img/agile-icon.webp",
    value: "Agile",
    category: "tool",
    count: 20,
    color: agileColor,
    description:
      "Agile is a project management methodology approach that involves breaking the project into phases, and emphasizes continuous collaboration and improvement. Teams follow a cycle of planning, executing, and evaluating.",
  },
  {
    icon: "/img/scrum-icon.webp",
    value: "Scrum",
    category: "tool",
    count: 20,
    color: scrumColor,
    description:
      "An implementation of agile methodology in which incremental changes are delivered timely, with continuous experimentation and feedback loops along the way to learn and improve as it goes. It provides structure for teams to integrate how they work, while adding the right practices to optimize for their specific needs.",
  },
  {
    icon: "/img/sonarqube-icon.webp",
    value: "SonarQube",
    category: "tool",
    count: 15,
    color: sonarQubeColor,
    description:
      "A Code Quality Assurance tool that collects and analyzes source code, and provides reports for the code quality of your project. It combines static and dynamic analysis tools and enables quality to be measured continually over time.",
  },
  {
    icon: "/img/jenkins-icon.webp",
    value: "Jenkins",
    category: "tool",
    count: 15,
    color: jenkinsColor,
    description:
      "An open-source automation tool built for software continuous integration and delivery. Used to build, test and deploy software projects continuously, it aims to ease integrating changes to the project, and for users to obtain a fresh build.",
  },
  {
    icon: "/img/d3-icon.webp",
    value: "D3",
    category: "frontend",
    count: 15,
    color: d3Color,
    description:
      "A JavaScript library and framework for creating visualizations. It creates visualizations by binding the data and graphical elements to the Document Object Model using HTML, SVG, and CSS.",
  },
  {
    icon: "/img/react-query-icon.webp",
    value: "React Query",
    category: "frontend",
    count: 15,
    color: reactQueryColor,
    blackText: true,
    description:
      "A data-fetching and state management library for React applications that simplifies fetching, caching, and updating data. It provides an API for fetching data from RESTful or GraphQL APIs, as well as caching the results.",
  },
  {
    icon: "/img/axios-icon.webp",
    value: "Axios",
    category: "frontend",
    count: 15,
    color: axiosColor,
    description:
      "A promise-based HTTP library that lets developers make requests to either their own or a third-party server to fetch data.",
  },
  {
    icon: "/img/lodash-icon.webp",
    value: "Lodash",
    category: "frontend",
    count: 15,
    color: lodashColor,
    description:
      "A Javascript library that provides a set of functions so that the programmer can work more easily on tasks involving the manipulation of matrices, strings, objects, numbers, etc. It is known for being the successor to the Underscore library and for the simplicity it brings to coding.",
  },
  {
    icon: "/img/jest-icon.webp",
    value: "Jest",
    category: "frontend",
    count: 15,
    color: jestColor,
    description:
      "A popular testing framework specifically built to perform mainly unit testing of React and React Native applications. It aims to provide support and simplicity in testing heavy web apps.",
  },
  {
    icon: "/img/admob-icon.webp",
    value: "AdMob",
    category: "tool",
    count: 15,
    color: admobColor,
    description:
      "AdMob is Google’s advertising platform for promoting and monetizing mobile applications. It allows application developers to promote their applications through in-app ads, monetize their applications by enabling in-app advertising, and provides intelligent insights through Google Analytics.",
  },
  {
    icon: "/img/asciidoctor-icon.webp",
    value: "Asciidoctor",
    category: "frontend",
    count: 15,
    color: asciidoctorColor,
    description:
      "And open source Ruby-based text processor for parsing AsciiDoc® into a document model and converting it to output formats such as HTML 5, DocBook 5, manual pages, PDF, EPUB 3, and other formats.",
  },
  {
    icon: "/img/aws-icon.webp",
    value: "AWS",
    category: "tool",
    count: 10,
    color: awsColor,
    blackText: true,
    description:
      "AWS (Amazon Web Services), is one of the leading cloud provider in the marketplace is Amazon Web Services. It provides over 170 AWS services to assist developers and companies to achieve their application's goals.",
  },
  {
    icon: "/img/cloudfront-icon.webp",
    value: "CloudFront",
    category: "tool",
    count: 10,
    color: cloudfrontColor,
    blackText: true,
    description:
      "An AWS web service that aims to speed up distribution of static and dynamic web content, such as .html, .css, .js, and image files, to users. CloudFront delivers content through a worldwide network of data centers called edge locations.",
  },
  {
    icon: "/img/swc-icon.webp",
    value: "SWC",
    category: "frontend",
    count: 10,
    color: swcColor,
    blackText: true,
    description:
      "A tool that takes any JavaScript or TypeScript code and outputs JavaScript that works also on older browser, as well as modern browsers. It aims to be the new and better Babel.",
  },
  {
    icon: "/img/formik-icon.webp",
    value: "Formik",
    category: "frontend",
    count: 10,
    color: formikColor,
    description:
      "A free and open source, lightweight library for React or React Native to assist in key points of form creation, such as how the form state is manipulated, how the form validation and error messages are handled, and how form submission is handled.",
  },
  {
    icon: "/img/postgresql-icon.webp",
    value: "PostgreSQL",
    category: "tool",
    count: 10,
    color: postgreSqlColor,
    description:
      "A free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance.",
  },
  {
    icon: "/img/node-icon.webp",
    value: "Node.js",
    category: "backend",
    count: 10,
    color: nodeJsColor,
    blackText: true,
    description:
      "A cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.",
  },
];
const experienceAlt = [
  {
    icon: "/img/git-icon.webp",
    value: "Git",
    category: "tool",
    count: 20,
    color: gitColor,
    description:
      "A distributed version control system to track changes in any set of computer files, usually for coordinating software development work in teams. It is meant for speed, data integrity, and support for distributed non-linear workflows.",
  },
  {
    icon: "/img/github-icon.webp",
    value: "GitHub",
    category: "tool",
    count: 20,
    color: gitHubColor,
    description:
      "A web-based interface that uses Git, the open source version control software that lets multiple people make separate changes to web pages at the same time.",
  },
  {
    icon: "/img/gitlab-icon.webp",
    value: "GitLab",
    category: "tool",
    count: 20,
    color: gitLabColor,
    description:
      "An open source code repository and collaborative software development platform, works like GitHub, but free.",
  },
  {
    icon: "/img/notion-icon.webp",
    value: "Notion",
    category: "tool",
    count: 20,
    color: notionColor,
    description:
      "Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.",
  },
  {
    icon: "/img/cypress-icon.webp",
    value: "Cypress",
    category: "tool",
    count: 15,
    color: cypressColor,
    description:
      "A JavaScript-based end-to-end testing tool designed for modern web test automation. A tool that operates directly in the browser using a DOM manipulation technique and enables front-end developers and QA engineers to write automated web tests.",
  },
  {
    icon: "/img/devops-icon.webp",
    value: "DevOps",
    category: "tool",
    count: 10,
    color: devopsColor,
    description:
      "The combination of cultural philosophies, practices, and tools that increases an organization’s ability to deliver applications and services at high velocity, to better serve their customers and compete more effectively in the market. Creating high quality software demands a robust pipeline of continuous integration and continuous feedback, that loops based on: planning, coding, building, testing, releasing, deploying, operating, and monitoring.",
  },
  {
    icon: "/img/dbeaver-icon.webp",
    value: "DBeaver",
    category: "tool",
    count: 10,
    color: dBeaverColor,
    description:
      "A SQL client software application and a database administration tool. For relational databases it uses the JDBC application programming interface (API) to interact with databases via a JDBC driver. For other databases (NoSQL) it uses proprietary database drivers.",
  },
  {
    icon: "/img/postman-icon.webp",
    value: "Postman",
    category: "tool",
    count: 10,
    color: postmanColor,
    description:
      "An enterprise API platform for developers. It allows users to store, catalog, and collaborate around API artifacts in a central platform within public, private, or partner networks.",
  },
  {
    icon: "/img/insomnia-icon.webp",
    value: "Insomnia",
    category: "tool",
    count: 10,
    color: insomniaColor,
    description:
      "A free, cross-platform desktop application that simplifies the interaction and design of HTTP-based APIs. Like Postman, it combines an easy-to-use interface with advanced features like authentication wizards, code generation, and environment variables.",
  },
  {
    icon: "/img/mongo-db-icon.webp",
    value: "MongoDB",
    category: "tool",
    count: 5,
    color: mongoDbColor,
    description:
      "A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.",
  },
  {
    icon: "/img/cordova-icon.webp",
    value: "Cordova",
    category: "tool",
    count: 5,
    color: cordovaColor,
    description:
      "An open-source mobile application development framework. It enables software programmers to build hybrid web applications for mobile devices using CSS3, HTML5, and JavaScript, instead of relying on platform-specific APIs like those in Android, iOS, or Windows Phone.",
  },
  {
    icon: "/img/jsp-icon.webp",
    value: "JSP",
    category: "tool",
    count: 5,
    color: jspColor,
    description:
      "JSP is a core Java web technology. As developers, we can build JSP pages relatively quickly and easily, and they interact seamlessly with servlets in a servlet container like Tomcat.",
  },
];
export const experience = {
  experienceCore: experienceCore,
  experienceAlt: experienceAlt,
};

export const defaultWordCloudFilterSettings = {
  showOnlyMainSkills: true,
  frontend: true,
  backend: false,
  tools: false,
};

export const whereToFindMe = [
  {
    srcPath: "/img/github-icon.webp",
    altText: "GitHub icon",
    link: "https://github.com/djowvani",
    aria: "View Giovani's Github page",
  },
  {
    srcPath: "/img/medium-icon.webp",
    altText: "Medium icon",
    link: "https://medium.com/@gioanhesini",
    aria: "View Giovani's Medium page",
  },
  {
    srcPath: "/img/linkedin-icon.webp",
    altText: "LinkedIn icon",
    link: "https://www.linkedin.com/in/gioanhesini/",
    aria: "View Giovani's Linkedin page",
  },
  {
    srcPath: "/img/whatsapp-icon.webp",
    altText: "WhatsApp icon",
    link: "https://api.whatsapp.com/send?phone=5519989613158&text=[Portfolio Contact]%20Hey!",
    aria: "Call Giovani's number on WhatsApp",
  },
];

export const soundEffectsArray = [
  {
    id: "arrival",
    url: "/sounds/arrival.mp3",
  },
  {
    id: "headerOptionHover",
    url: "/sounds/headerOptionHover.mp3",
  },
  {
    id: "tabChange",
    url: "/sounds/tabChange.mp3",
  },
  {
    id: "filterChange",
    url: "/sounds/filterChange.mp3",
  },
  {
    id: "experienceHover",
    url: "/sounds/experienceHover.mp3",
  },
  {
    id: "scroll",
    url: "/sounds/scroll.mp3",
  },
  {
    id: "thankYou",
    url: "/sounds/thankYou.mp3",
  },
  {
    id: "changeCamera",
    url: "/sounds/changeCamera.mp3",
  },
  {
    id: "bearLvl0",
    url: "/sounds/bearClick.mp3",
  },
  {
    id: "bearLvl1",
    url: "/sounds/eventXK7T.mp3",
  },
  {
    id: "bearLvl2",
    url: "/sounds/eventTDTP.mp3",
  },
  {
    id: "bearLvl3",
    url: "/sounds/eventCDC6.mp3",
  },
  {
    id: "bearLvl4",
    url: "/sounds/eventVPBT.mp3",
  },
  {
    id: "bearLvl5",
    url: "/sounds/eventXPQN.mp3",
  },
  {
    id: "prompt",
    url: "/sounds/event0O0H.mp3",
  },
  {
    id: "scary",
    url: "/sounds/eventSF0R.mp3",
  },
  {
    id: "ending",
    url: "/sounds/eventFUD3.mp3",
  },
];
