import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  atonegime,
  aftee,
  netprotections,
  geniac,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "works",
    title: "Works",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "Engineering Manager",
    icon: creator,
  },
  {
    title: "Product Manager",
    icon: backend,
  },
  {
    title: "LLM Developer",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Ruby Backend Developer",
    company_name: "Netprotections, Inc.",
    icon: aftee,
    iconBg: "#FFF",
    date: "March 2020 - Mar 2021",
    points: [
      "台湾で展開している後払い決済AFTEEのバックエンドプログラマー",
      "Ruby/ Ruby on Railsを用いたWebアプリケーションの開発",
      "SQLを用いて与信アルゴリズムを分析、改善設計と実装",
      "テストを実施し、テストケースを作成して品質の向上",
    ],
  },
  {
    title: "Fullstack Developer/ Engineering Manager",
    company_name: "Netprotections, Inc.",
    icon: atonegime,
    iconBg: "#fff",
    date: "Jun 2021 - Mar 2024",
    points: [
      "日本初「感じた価値に応じて支払い価格を決める」ポストプライシング決済唯一の正社員エンジニアとしてジョインしシステム開発全体をマネジメント。",
      "日常消費と応援の距離を0にすることでみんなが自分の世界を愛せる仕組みの社会実装を目指した。",
      "初期メンバーとして月間流通金額が額十数万円から数億円までの事業成長を経験。",
      "その間負債と向き合いながらMVPからサーバレスアーキテクチャへのフルリプレイスや2度のUXリニューアルなど大規模な開発にも従事。",
    ],
  },
  {
    title: "Product Manager",
    company_name: "Netprotections, Inc.",
    icon: atonegime,
    iconBg: "#fff",
    date: "Oct 2022 - Mar 2024",
    points: [
      "「こんな時代に生まれてよかった。」とみんなが思える贈与社会の実現を目指した。",
      "初期メンバーとしてプロダクトビジョンからロードマップの策定にも携わり、経営陣や顧客など幅広いステークホルダーとのコラボレーションを行いながら前例のないプロダクトをつくりあげた。",
      "不確実性の高い状況においてはプロトタイピングベースで顧客提案を行いビルドトラップに陥らない価値ある迅速なプロダクト開発を重視している。",
    ],
  },
  {
    title: "LLM Developer",
    company_name: "GENIAC",
    icon: geniac,
    iconBg: "#EDF0EF",
    date: "Mar 2024 - Present",
    points: [
      "GENIACコミュニティの開発メンバーとしてフルスクラッチでの10B LLM基盤モデルの開発コンペに参加。",
      "チーム全体のプロジェクトマネジメントや事前学習のデータ整備やLLMによる合成データ作成、教師ありファインチューニングを担当。",
      "dropless MoEアーキテクチャやASK-LLMなど最新論文のPoCを経験。",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };