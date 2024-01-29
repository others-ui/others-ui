---
layout: page
sidebar: false
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yanyunwu.png',
    name: 'yanyunwu',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yanyunwu' },
      { icon: 'twitter', link: '#' }
    ]
  },
  {
    avatar: 'https://www.github.com/rib2333.png',
    name: 'rib2333',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/rib2333' },
      { icon: 'twitter', link: '#' }
    ]
  },
  {
    avatar: 'https://www.github.com/Bluex-xx.png',
    name: 'Bluex-xx',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Bluex-xx' },
      { icon: 'twitter', link: '#' }
    ]
  },
  {
    avatar: 'https://www.github.com/Kyrie711.png',
    name: 'Kyrie711',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Kyrie711' },
      { icon: 'twitter', link: '#' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of OthersUI is guided by an energetic
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    size="small"
    :members="members"
  />
</VPTeamPage>
