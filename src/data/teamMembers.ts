
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
    name: "Yash K. Saini",
    role: "Lead Developer, Designer",
    image: "/lovable-uploads/dc74bbc0-3e87-4934-ae1b-bdd652dd3767.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/yash-k-saini",
      twitter: "https://twitter.com/yashksaini",
      github: "https://github.com/yashksaini-coder"
    }
  },
  // Add more team members as needed
];
