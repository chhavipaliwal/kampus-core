import { type SidebarItem } from './sidebar';

export const sectionItems: SidebarItem[] = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'home',
        href: '/',
        icon: 'solar:home-2-bold-duotone',
        title: 'Home'
      },
      {
        key: 'students',
        href: '/dashboard/students',
        icon: 'solar:user-bold-duotone',
        title: 'Students'
      },
      {
        key: 'users',
        href: '/dashboard/users',
        icon: 'solar:users-group-two-rounded-bold-duotone',
        title: 'Users'
      }
    ]
  }
];

export const sectionItemsWithTeams: SidebarItem[] = [...sectionItems];
