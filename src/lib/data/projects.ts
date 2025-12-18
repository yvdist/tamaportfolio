export interface Project {
    title: string;
    category: string;
    tech: string[];
    image: string;
    description: string;
    link: string;
}

export const projects: Project[] = [
    {
        title: "E-Commerce Platform",
        category: "Full Stack Development",
        tech: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        description: "Scalable e-commerce solution with real-time inventory management and secure payment processing.",
        link: "#"
    },
    {
        title: "AI Content Generator",
        category: "Machine Learning",
        tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        description: "Neural network-based content generation system with natural language processing capabilities.",
        link: "#"
    },
    {
        title: "Analytics Dashboard",
        category: "Data Visualization",
        tech: ["SvelteKit", "D3.js", "WebSocket", "MongoDB"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        description: "Real-time analytics dashboard with interactive data visualizations for business intelligence.",
        link: "#"
    },
    {
        title: "Mobile Banking App",
        category: "Mobile Development",
        tech: ["React Native", "Node.js", "PostgreSQL", "AWS"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        description: "Secure mobile banking application with biometric authentication and real-time transactions.",
        link: "#"
    },
    {
        title: "DevOps Pipeline",
        category: "Infrastructure",
        tech: ["Kubernetes", "GitLab CI", "Terraform", "Prometheus"],
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
        description: "Automated CI/CD pipeline with container orchestration and monitoring infrastructure.",
        link: "#"
    },
    {
        title: "Social Media Platform",
        category: "Full Stack Development",
        tech: ["SvelteKit", "Prisma", "PostgreSQL", "S3"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        description: "Feature-rich social platform with real-time messaging, content feeds, and media uploads.",
        link: "#"
    }
];