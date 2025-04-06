
interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socialLinks: SocialLinks;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Tannu Chaudhary",
    role: "UI/UX Designer",
    image: "https://avatars.githubusercontent.com/u/142585725?v=4",
    socialLinks: {
      linkedin: "https://linkedin.com/in/tannuchaudhary",
      twitter: "https://twitter.com/tannuchaudhary",
      github: "https://github.com/tannuiscoding",
    }
  },
  {
    id: 2,
    name: "Yash K. Saini",
    role: "Lead Developer",
    image: "https://avatars.githubusercontent.com/u/115717039?v=4",
    socialLinks: {
      linkedin: "https://linkedin.com/in/yash_k_saini",
      twitter: "https://twitter.com/yashksaini",
      github: "https://github.com/yashksaini-coder"
    }
  },
  {
    id: 3,
    name: "Kushagra Singhal",
    role: "Senior Backend Engineer",
    image: "",
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/kushagra21-afk"
    }
  },
];
