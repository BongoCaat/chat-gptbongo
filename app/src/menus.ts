export interface MenuItem {
    label: string;
    link: string;
    icon?: string;
}

export const primaryMenu: MenuItem[] = [
    {
        label: "APIs",
        link: "https://pastebin.com/63F20PyN",
    },
    {
        label: "GPT Prompts",
        link: "https://github.com/f/awesome-chatgpt-prompts",
        icon: "external-link-alt",
    },
    {
        label: "ChatGPT",
        link: "https://ai.com",
        icon: "external-link-alt",
    },
];

export const secondaryMenu: MenuItem[] = [
    /*{
        label: "Discord",
        link: "https://discord.gg/mS5QvKykvv",
        icon: "discord fab",
    },*/
    {
        label: "GitHub",
        link: "https://github.com/BongoCaat/chat-gptbongo",
        icon: "github fab",
    },
];