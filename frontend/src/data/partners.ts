export interface Partner {
    id: string
    name: string
    logoUrl: string
    websiteUrl: string
    invertColors?: boolean
}

export const partnersData: Partner[] = [
    {
        id: 'tech-floripa',
        name: 'Tech Floripa',
        logoUrl: '/assets/partners/techfloripa.png',
        websiteUrl: 'https://tech.floripa.br',
        invertColors: true
    },
    {
        id: 'hostgator',
        name: 'HostGator',
        logoUrl: '/assets/partners/hostgator.svg',
        websiteUrl: 'https://www.hostgator.com.br',
    },
    {
        id: 'fiap',
        name: 'FIAP',
        logoUrl: '/assets/partners/fiap.svg',
        websiteUrl: 'https://www.fiap.com.br',
    },
]
