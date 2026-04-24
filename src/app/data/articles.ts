export interface RelatedLink {
  link: string;
  labelKey: string;
}

export interface ArticleSection {
  id: string;
  titleKey: string;
  descriptionKey: string;
  prerequisites: string[];
  instructionsKey: string;
  tipsKey: string;
  related: RelatedLink[];
  video?: {
    src: string;
    poster: string;
    captionKey: string;
  };
}

export interface Article {
  id: string;
  title: string;
  category: string;
  content?: string;
  i18nKey?: string;
  sections?: ArticleSection[];
  video?: {
    src: string;
    poster: string;
    captionKey: string;
  };
  related?: Array<{ link: string; label?: string; labelKey?: string }>;
}

export const generateArticleContent = (
  i18nKey: string,
  t: (key: string, opts?: object) => unknown,
): string => {
  type NoteItem = string | { text: string; notes: string[] };

  const renderNoteItem = (item: NoteItem): string => {
    if (typeof item === 'string') return `<li>${item}</li>`;
    const notesHtml = item.notes.map(n => `<li>${n}</li>`).join('');
    return `<li>${item.text}<ul>${notesHtml}</ul></li>`;
  };

  const description = t(`${i18nKey}.description`) as string;
  const prerequisites = t(`${i18nKey}.prerequisites`, {
    returnObjects: true,
  }) as NoteItem[];
  const tips = t(`${i18nKey}.tips`, { returnObjects: true }) as NoteItem[];

  const prerequisitesHtml = prerequisites.map(renderNoteItem).join('');
  const tipsHtml = tips.map(renderNoteItem).join('');

  const headingPrerequisites = t('ui.prerequisites') as string;
  const headingSteps = t('ui.stepByStep') as string;
  const headingTips = t('ui.tipsNotes') as string;

  const instructionGroups = t(`${i18nKey}.instructionGroups`, {
    returnObjects: true,
  });
  let stepsHtml: string;
  if (Array.isArray(instructionGroups) && instructionGroups.length > 0) {
    stepsHtml = (instructionGroups as Array<{ label: string; steps: string[] }>)
      .map(group => {
        const groupSteps = group.steps.map(s => `<li>${s}</li>`).join('');
        return `<h3>${group.label}</h3><ol>${groupSteps}</ol>`;
      })
      .join('');
  } else {
    const steps = t(`${i18nKey}.steps`, { returnObjects: true }) as NoteItem[];
    stepsHtml = `<ol>${steps.map(renderNoteItem).join('')}</ol>`;
  }

  return `
    <p>${description}</p>
    <h2>${headingPrerequisites}</h2>
    <ul>${prerequisitesHtml}</ul>
    <h2>${headingSteps}</h2>
    ${stepsHtml}
    <h2>${headingTips}</h2>
    <ul>${tipsHtml}</ul>
  `;
};

export const categories = [
  'Get Started',
  'Organization Admin',
  'Guide for MPG Admin',
  'Project Settings',
  'Team Management',
  'Managing Decisions',
  'Managing Tasks',
  'Visual Planning',
  'Image Analytics',
  'Project Dashboard',
  'Delivery Plan',
  'File Distribution',
  'Guides & Support',
];

export const categoryI18nKeys: Record<string, string> = {
  'Get Started': 'ui.categoryNames.getStarted',
  'Organization Admin': 'ui.categoryNames.admin',
  'Guide for MPG Admin': 'ui.categoryNames.mpg',
  'Project Settings': 'ui.categoryNames.prjSettings',
  'Team Management': 'ui.categoryNames.team',
  'Managing Decisions': 'ui.categoryNames.decisions',
  'Managing Tasks': 'ui.categoryNames.tasks',
  'Visual Planning': 'ui.categoryNames.visualPlanning',
  'Image Analytics': 'ui.categoryNames.ia',
  'Project Dashboard': 'ui.categoryNames.prjDashboard',
  'Delivery Plan': 'ui.categoryNames.deliveryPlan',
  'File Distribution': 'ui.categoryNames.fileDistribution',
  'Guides & Support': 'ui.categoryNames.guidesSupport',
};

export const articles: Article[] = [
  // Get Started
  {
    id: 'ms-365-login',
    title: 'MS 365 Login',
    category: 'Get Started',
    i18nKey: 'categories.getStarted.msLogin',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/00_Get-Started/MS-365-Login.mp4',
      poster: '/assets/posters/00_Get-Started/MS-365-Login.png',
      captionKey: 'categories.getStarted.msLogin.videoCaption',
    },
    related: [
      {
        link: '/article/my-projects',
        labelKey: 'categories.getStarted.myProjects.title',
      },
    ],
  },
  {
    id: 'my-projects',
    title: 'My Projects',
    category: 'Get Started',
    i18nKey: 'categories.getStarted.myProjects',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/00_Get-Started/My-Projects.mp4',
      poster: '/assets/posters/00_Get-Started/My-Projects.png',
      captionKey: 'categories.getStarted.myProjects.videoCaption',
    },
    related: [
      {
        link: '/article/my-work',
        labelKey: 'categories.getStarted.myWork.title',
      },
      { link: '/article/create-mpg', label: 'Create MPG' },
      { link: '/article/create-project', label: 'Create Project' },
    ],
  },
  {
    id: 'my-work',
    title: 'My Work',
    category: 'Get Started',
    i18nKey: 'categories.getStarted.myWork',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/00_Get-Started/My-Work.mp4',
      poster: '/assets/posters/00_Get-Started/My-Work.png',
      captionKey: 'categories.getStarted.myWork.videoCaption',
    },
    related: [
      { link: '/article/create-task', label: 'Create Task' },
      { link: '/article/create-decision', label: 'Create Decision' },
      { link: '/article/funnels-tasks', label: 'Task Funnels' },
      { link: '/article/funnels-decisions', label: 'Decision Funnels' },
    ],
  },
  {
    id: 'my-profile',
    title: 'My Profile',
    category: 'Get Started',
    i18nKey: 'categories.getStarted.myProfile',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/00_Get-Started/My-Profile.mp4',
      poster: '/assets/posters/00_Get-Started/My-Profile.png',
      captionKey: 'categories.getStarted.myProfile.videoCaption',
    },
    related: [
      {
        link: '/article/notifications',
        labelKey: 'categories.getStarted.notifications.title',
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    category: 'Get Started',
    i18nKey: 'categories.getStarted.notifications',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/00_Get-Started/Notifications.mp4',
      poster: '/assets/posters/00_Get-Started/Notifications.png',
      captionKey: 'categories.getStarted.notifications.videoCaption',
    },
    related: [
      {
        link: '/article/my-profile',
        labelKey: 'categories.getStarted.myProfile.title',
      },
      {
        link: '/article/ms-365-login',
        labelKey: 'categories.getStarted.msLogin.title',
      },
    ],
  },

  // Organization Admin
  {
    id: 'general-settings-org',
    title: 'General Settings',
    category: 'Organization Admin',
    i18nKey: 'categories.admin.general',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/10_Org-Admin/General-Settings.mp4',
      poster: '/assets/posters/10_Org-Admin/General-Settings.png',
      captionKey: 'categories.admin.general.videoCaption',
    },
    related: [
      {
        link: '/article/user-management',
        labelKey: 'categories.admin.userMan.title',
      },
      { link: '/article/create-mpg', labelKey: 'categories.admin.mpg.title' },
    ],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    category: 'Organization Admin',
    i18nKey: 'categories.admin.projMan',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/10_Org-Admin/Project-Management.mp4',
      poster: '/assets/posters/10_Org-Admin/Project-Management.png',
      captionKey: 'categories.admin.projMan.videoCaption',
    },
    related: [
      { link: '/article/create-mpg', labelKey: 'categories.admin.mpg.title' },
      { link: '/article/create-project', label: 'Create Project' },
    ],
  },
  {
    id: 'user-management',
    title: 'User Management',
    category: 'Organization Admin',
    i18nKey: 'categories.admin.userMan',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/10_Org-Admin/User-Management.mp4',
      poster: '/assets/posters/10_Org-Admin/User-Management.png',
      captionKey: 'categories.admin.userMan.videoCaption',
    },
    related: [
      {
        link: '/article/contact-management',
        labelKey: 'categories.admin.contMan.title',
      },
    ],
  },
  {
    id: 'contact-management',
    title: 'Contact Management',
    category: 'Organization Admin',
    i18nKey: 'categories.admin.contMan',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/10_Org-Admin/Contact-Management.mp4',
      poster: '/assets/posters/10_Org-Admin/Contact-Management.png',
      captionKey: 'categories.admin.contMan.videoCaption',
    },
    related: [
      {
        link: '/article/user-management',
        labelKey: 'categories.admin.userMan.title',
      },
    ],
  },
  {
    id: 'create-mpg',
    title: 'Create Project Portfolio',
    category: 'Organization Admin',
    i18nKey: 'categories.admin.mpg',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/10_Org-Admin/Create-MPG.mp4',
      poster: '/assets/posters/10_Org-Admin/Create-MPG.png',
      captionKey: 'categories.admin.mpg.videoCaption',
    },
    related: [
      {
        link: '/article/general-settings-org',
        labelKey: 'categories.admin.general.title',
      },
      { link: '/article/create-project', label: 'Create Project' },
    ],
  },

  // Guide for MPG Admin
  {
    id: 'access-settings',
    title: 'Access MPG Settings',
    category: 'Guide for MPG Admin',
    i18nKey: 'categories.mpg.access',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/20_MGP-Admin/MPG-Access-Settings.mp4',
      poster: '/assets/posters/20_MPG-Admin/Access-Settings.jpg',
      captionKey: 'categories.mpg.access.videoCaption',
    },
    related: [
      {
        link: '/article/mpg-ownership',
        labelKey: 'categories.mpg.ownership.title',
      },
      {
        link: '/article/subscription-ownership',
        labelKey: 'categories.mpg.subscription.title',
      },
      {
        link: '/article/create-project',
        labelKey: 'categories.mpg.createProject.title',
      },
    ],
  },
  {
    id: 'mpg-ownership',
    title: 'MPG Ownership',
    category: 'Guide for MPG Admin',
    i18nKey: 'categories.mpg.ownership',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/20_MGP-Admin/MPG-co-owner.mp4',
      poster: '/assets/posters/20_MPG-Admin/Co-owner.jpg',
      captionKey: 'categories.mpg.ownership.videoCaption',
    },
    related: [
      {
        link: '/article/access-settings',
        labelKey: 'categories.mpg.access.title',
      },
      {
        link: '/article/subscription-ownership',
        labelKey: 'categories.mpg.subscription.title',
      },
    ],
  },
  {
    id: 'subscription-ownership',
    title: 'Subscription Ownership',
    category: 'Guide for MPG Admin',
    i18nKey: 'categories.mpg.subscription',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/20_MGP-Admin/MPG-subscription-ownership.mp4',
      poster: '/assets/posters/20_MPG-Admin/Subscription-ownership.jpg',
      captionKey: 'categories.mpg.subscription.videoCaption',
    },
    related: [
      {
        link: '/article/access-settings',
        labelKey: 'categories.mpg.access.title',
      },
      {
        link: '/article/mpg-ownership',
        labelKey: 'categories.mpg.ownership.title',
      },
      {
        link: '/article/create-project',
        labelKey: 'categories.mpg.createProject.title',
      },
    ],
  },
  {
    id: 'create-project',
    title: 'Create Project',
    category: 'Guide for MPG Admin',
    i18nKey: 'categories.mpg.createProject',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/20_MGP-Admin/MPG-Create-Project.mp4',
      poster: '/assets/posters/20_MPG-Admin/Create-Project.jpg',
      captionKey: 'categories.mpg.createProject.videoCaption',
    },
    related: [
      {
        link: '/article/mpg-ownership',
        labelKey: 'categories.mpg.ownership.title',
      },
      { link: '/article/create-mpg', labelKey: 'categories.admin.mpg.title' },
    ],
  },

  // Project Settings
  {
    id: 'overview-project',
    title: 'Overview',
    category: 'Project Settings',
    i18nKey: 'categories.prjSettings.overview',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/30_Project-Settings/Overview.mp4',
      poster: '/assets/posters/30_Project-Settings/Overview.png',
      captionKey: 'categories.prjSettings.overview.videoCaption',
    },
    related: [
      {
        link: '/article/general-settings-project',
        labelKey: 'categories.prjSettings.general.title',
      },
      {
        link: '/article/team-structure',
        labelKey: 'categories.team.structure.title',
      },
      {
        link: '/article/pricing-plan',
        labelKey: 'categories.prjSettings.pricing.title',
      },
    ],
  },
  {
    id: 'general-settings-project',
    title: 'General Settings',
    category: 'Project Settings',
    i18nKey: 'categories.prjSettings.general',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/30_Project-Settings/General-Settings.mp4',
      poster: '/assets/posters/30_Project-Settings/General-Settings.png',
      captionKey: 'categories.prjSettings.general.videoCaption',
    },
    related: [
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
      {
        link: '/article/pricing-plan',
        labelKey: 'categories.prjSettings.pricing.title',
      },
    ],
  },
  {
    id: 'pricing-plan',
    title: 'Pricing Plan',
    category: 'Project Settings',
    i18nKey: 'categories.prjSettings.pricing',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/30_Project-Settings/Pricing-Plan.mp4',
      poster: '/assets/posters/30_Project-Settings/Pricing-Plan.png',
      captionKey: 'categories.prjSettings.pricing.videoCaption',
    },
    related: [
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
      {
        link: '/article/tags-and-objects',
        labelKey: 'categories.prjSettings.tags.title',
      },
    ],
  },
  {
    id: 'tags-and-objects',
    title: 'Tags and Objects',
    category: 'Project Settings',
    i18nKey: 'categories.prjSettings.tags',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/30_Project-Settings/Tags-and-Objects.mp4',
      poster: '/assets/posters/30_Project-Settings/Tags-and-Objects.png',
      captionKey: 'categories.prjSettings.tags.videoCaption',
    },
    related: [
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
      {
        link: '/article/importance',
        labelKey: 'categories.prjSettings.importance.title',
      },
      {
        link: '/article/upload-images',
        labelKey: 'categories.ia.upload.title',
      },
    ],
  },
  {
    id: 'importance',
    title: 'Importance',
    category: 'Project Settings',
    i18nKey: 'categories.prjSettings.importance',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/30_Project-Settings/Importance.mp4',
      poster: '/assets/posters/30_Project-Settings/Importance.png',
      captionKey: 'categories.prjSettings.importance.videoCaption',
    },
    related: [
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
      {
        link: '/article/tasks-settings',
        labelKey: 'categories.prjSettings.tasksSettings.title',
      },
    ],
  },
  {
    id: 'tasks-settings',
    title: 'Tasks Settings',
    category: 'Project Settings',
    i18nKey: 'categories.prjSettings.tasksSettings',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/30_Project-Settings/Task-Settings.mp4',
      poster: '/assets/posters/30_Project-Settings/Task-Settings.png',
      captionKey: 'categories.prjSettings.tasksSettings.videoCaption',
    },
    related: [
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
      {
        link: '/article/create-task',
        labelKey: 'categories.tasks.create.title',
      },
      {
        link: '/article/decision-settings',
        labelKey: 'categories.prjSettings.decisionsSettings.title',
      },
    ],
  },
  {
    id: 'decision-settings',
    title: 'Decision Settings',
    category: 'Project Settings',
    i18nKey: 'categories.prjSettings.decisionsSettings',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/30_Project-Settings/Decision-Settings.mp4',
      poster: '/assets/posters/30_Project-Settings/Decision-Settings.png',
      captionKey: 'categories.prjSettings.decisionsSettings.videoCaption',
    },
    related: [
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
      {
        link: '/article/create-decision',
        labelKey: 'categories.decisions.create.title',
      },
      {
        link: '/article/tasks-settings',
        labelKey: 'categories.prjSettings.tasksSettings.title',
      },
    ],
  },

  // Team Management
  {
    id: 'team-structure',
    title: 'Team Structure',
    category: 'Team Management',
    i18nKey: 'categories.team.structure',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/40_Team-Management/Team-Structure.mp4',
      poster: '/assets/posters/40_Team-Management/Team-Structure.png',
      captionKey: 'categories.team.structure.videoCaption',
    },
    related: [
      {
        link: '/article/manage-positions',
        labelKey: 'categories.team.positions.title',
      },
      {
        link: '/article/assign-users',
        labelKey: 'categories.team.assign.title',
      },
    ],
  },
  {
    id: 'manage-positions',
    title: 'Manage Positions',
    category: 'Team Management',
    i18nKey: 'categories.team.positions',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/40_Team-Management/Team-Setup.mp4',
      poster: '/assets/posters/40_Team-Management/Team-Setup.png',
      captionKey: 'categories.team.positions.videoCaption',
    },
    related: [
      {
        link: '/article/team-structure',
        labelKey: 'categories.team.structure.title',
      },
      {
        link: '/article/assign-users',
        labelKey: 'categories.team.assign.title',
      },
    ],
  },
  {
    id: 'assign-users',
    title: 'Assign Users',
    category: 'Team Management',
    i18nKey: 'categories.team.assign',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/40_Team-Management/Assign-Members.mp4',
      poster: '/assets/posters/40_Team-Management/Assign-Members.png',
      captionKey: 'categories.team.assign.videoCaption',
    },
    related: [
      {
        link: '/article/manage-positions',
        labelKey: 'categories.team.positions.title',
      },
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
    ],
  },
  {
    id: 'roles-permissions',
    title: 'Roles & Permissions',
    category: 'Team Management',
    i18nKey: 'categories.team.roles',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/40_Team-Management/Role-Assignement.mp4',
      poster: '/assets/posters/40_Team-Management/Role-Assignement.png',
      captionKey: 'categories.team.roles.videoCaption',
    },
    related: [
      {
        link: '/article/maintenance-templates',
        labelKey: 'categories.team.maint.title',
      },
      {
        link: '/article/team-structure',
        labelKey: 'categories.team.structure.title',
      },
    ],
  },
  {
    id: 'maintenance-templates',
    title: 'Maintenance & Templates',
    category: 'Team Management',
    i18nKey: 'categories.team.maint',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/40_Team-Management/Team-Template.mp4',
      poster: '/assets/posters/40_Team-Management/Team-Template.png',
      captionKey: 'categories.team.maint.videoCaption',
    },
    related: [
      {
        link: '/article/team-structure',
        labelKey: 'categories.team.structure.title',
      },
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
    ],
  },

  // Managing Decisions
  {
    id: 'decision-editor',
    title: 'Decision Editor',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.ownership',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Decision-Ownership.mp4',
      poster: '/assets/posters/50_Managing-Decisions/Decision-Ownership.png',
      captionKey: 'categories.decisions.ownership.videoCaption',
    },
    related: [
      {
        link: '/article/decision-maker',
        labelKey: 'categories.decisions.maker.title',
      },
      {
        link: '/article/create-decision',
        labelKey: 'categories.decisions.create.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'decision-maker',
    title: 'Decision Maker',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.maker',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Decision-Maker.mp4',
      poster: '/assets/posters/50_Managing-Decisions/Decision-Maker.png',
      captionKey: 'categories.decisions.maker.videoCaption',
    },
    related: [
      {
        link: '/article/decision-editor',
        labelKey: 'categories.decisions.ownership.title',
      },
      {
        link: '/article/create-decision',
        labelKey: 'categories.decisions.create.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'decision-workflow',
    title: 'Decision Workflow',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.workflow',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Decision-Workflow.mp4',
      poster: '/assets/posters/50_Managing-Decisions/Decision-Workflow.png',
      captionKey: 'categories.decisions.workflow.videoCaption',
    },
    related: [
      {
        link: '/article/create-decision',
        labelKey: 'categories.decisions.create.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'create-decision',
    title: 'Create Decision',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.create',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Create-Decision.mp4',
      poster: '/assets/posters/50_Managing-Decisions/Create-Decision.png',
      captionKey: 'categories.decisions.create.videoCaption',
    },
    related: [
      {
        link: '/article/create-project',
        labelKey: 'categories.mpg.createProject.title',
      },
      {
        link: '/article/dependencies-decisions',
        labelKey: 'categories.decisions.dependencies.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'dependencies-decisions',
    title: 'Dependencies',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.dependencies',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Dependencies.mp4',
      poster: '/assets/posters/50_Managing-Decisions/Dependencies.png',
      captionKey: 'categories.decisions.dependencies.videoCaption',
    },
    related: [
      {
        link: '/article/funnels-decisions',
        labelKey: 'categories.decisions.funnels.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'funnels-decisions',
    title: 'Funnels',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.funnels',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Funnels.mp4',
      poster: '/assets/posters/50_Managing-Decisions/Funnels.png',
      captionKey: 'categories.decisions.funnels.videoCaption',
    },
    related: [
      {
        link: '/article/my-work',
        labelKey: 'categories.getStarted.myWork.title',
      },
      {
        link: '/article/decision-editor',
        labelKey: 'categories.decisions.ownership.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'decision-details-header',
    title: 'Decision Details Header',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.detailsHeader',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Decision-Details-Header.mp4',
      poster:
        '/assets/posters/50_Managing-Decisions/Decision-Details-Header.png',
      captionKey: 'categories.decisions.detailsHeader.videoCaption',
    },
    related: [
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
      {
        link: '/article/create-decision',
        labelKey: 'categories.decisions.create.title',
      },
      {
        link: '/article/decision-workflow',
        labelKey: 'categories.decisions.workflow.title',
      },
      {
        link: '/article/edit-decision-details',
        labelKey: 'categories.decisions.edit.title',
      },
    ],
  },
  {
    id: 'edit-decision-details',
    title: 'Edit Decision Details',
    category: 'Managing Decisions',
    i18nKey: 'categories.decisions.edit',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/50_Managing-Decisions/Edit-Decision-Details.mp4',
      poster: '/assets/posters/50_Managing-Decisions/Edit-Decision-Details.png',
      captionKey: 'categories.decisions.edit.videoCaption',
    },
    related: [
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
      {
        link: '/article/decision-editor',
        labelKey: 'categories.decisions.ownership.title',
      },
      {
        link: '/article/decision-maker',
        labelKey: 'categories.decisions.maker.title',
      },
      {
        link: '/article/dependencies-decisions',
        labelKey: 'categories.decisions.dependencies.title',
      },
      {
        link: '/article/decision-workflow',
        labelKey: 'categories.decisions.workflow.title',
      },
      {
        link: '/article/decision-details-header',
        labelKey: 'categories.decisions.detailsHeader.title',
      },
    ],
  },

  // Managing Tasks
  {
    id: 'task-owner',
    title: 'Task Owner',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.ownership',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Task-Ownership.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Task-Ownership.png',
      captionKey: 'categories.tasks.ownership.videoCaption',
    },
    related: [
      {
        link: '/article/task-assignee',
        labelKey: 'categories.tasks.assignee.title',
      },
      {
        link: '/article/task-workflow',
        labelKey: 'categories.tasks.workflow.title',
      },
    ],
  },
  {
    id: 'task-assignee',
    title: 'Task Assignee',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.assignee',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Task-Assignee.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Task-Assignee.png',
      captionKey: 'categories.tasks.assignee.videoCaption',
    },
    related: [
      {
        link: '/article/task-owner',
        labelKey: 'categories.tasks.ownership.title',
      },
      {
        link: '/article/task-workflow',
        labelKey: 'categories.tasks.workflow.title',
      },
      {
        link: '/article/team-structure',
        labelKey: 'categories.team.structure.title',
      },
    ],
  },
  {
    id: 'task-workflow',
    title: 'Task Workflow',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.workflow',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Task-Workflow.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Task-Workflow.png',
      captionKey: 'categories.tasks.workflow.videoCaption',
    },
    related: [
      {
        link: '/article/create-task',
        labelKey: 'categories.tasks.create.title',
      },
    ],
  },
  {
    id: 'create-task',
    title: 'Create Task',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.create',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Create-Task.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Create-Task.png',
      captionKey: 'categories.tasks.create.videoCaption',
    },
    related: [
      {
        link: '/article/create-project',
        labelKey: 'categories.mpg.createProject.title',
      },
      {
        link: '/article/dependencies-tasks',
        labelKey: 'categories.tasks.dependencies.title',
      },
    ],
  },
  {
    id: 'dependencies-tasks',
    title: 'Dependencies',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.dependencies',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Dependencies.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Dependencies.png',
      captionKey: 'categories.tasks.dependencies.videoCaption',
    },
    related: [
      {
        link: '/article/funnels-tasks',
        labelKey: 'categories.tasks.funnels.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'funnels-tasks',
    title: 'Funnels',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.funnels',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Funnels.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Funnels.png',
      captionKey: 'categories.tasks.funnels.videoCaption',
    },
    related: [
      {
        link: '/article/my-work',
        labelKey: 'categories.getStarted.myWork.title',
      },
      {
        link: '/article/task-owner',
        labelKey: 'categories.tasks.ownership.title',
      },
    ],
  },
  {
    id: 'task-details-header',
    title: 'Task Details Header',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.detailsHeader',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Task-Details-Header.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Task-Details-Header.png',
      captionKey: 'categories.tasks.detailsHeader.videoCaption',
    },
    related: [
      {
        link: '/article/create-task',
        labelKey: 'categories.tasks.create.title',
      },
      {
        link: '/article/task-workflow',
        labelKey: 'categories.tasks.workflow.title',
      },
      {
        link: '/article/edit-task-details',
        labelKey: 'categories.tasks.edit.title',
      },
    ],
  },
  {
    id: 'edit-task-details',
    title: 'Edit Task Details',
    category: 'Managing Tasks',
    i18nKey: 'categories.tasks.edit',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/60_Managing-Tasks/Edit-Task-Details.mp4',
      poster: '/assets/posters/60_Managing-Tasks/Edit-Task-Details.png',
      captionKey: 'categories.tasks.edit.videoCaption',
    },
    related: [
      {
        link: '/article/task-owner',
        labelKey: 'categories.tasks.ownership.title',
      },
      {
        link: '/article/task-assignee',
        labelKey: 'categories.tasks.assignee.title',
      },
      {
        link: '/article/dependencies-tasks',
        labelKey: 'categories.tasks.dependencies.title',
      },
      {
        link: '/article/task-workflow',
        labelKey: 'categories.tasks.workflow.title',
      },
      {
        link: '/article/task-details-header',
        labelKey: 'categories.tasks.detailsHeader.title',
      },
    ],
  },

  // Visual Planning
  {
    id: 'navigation-visual',
    title: 'Navigation',
    category: 'Visual Planning',
    i18nKey: 'categories.visualPlanning.navigation',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/70_Visual-Planning/Navigation.mp4',
      poster: '/assets/posters/70_Visual-Planning/Navigation.png',
      captionKey: 'categories.visualPlanning.navigation.videoCaption',
    },
  },
  {
    id: 'settings-visual',
    title: 'Settings',
    category: 'Visual Planning',
    i18nKey: 'categories.visualPlanning.settings',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/70_Visual-Planning/Settings.mp4',
      poster: '/assets/posters/70_Visual-Planning/Settings.png',
      captionKey: 'categories.visualPlanning.settings.videoCaption',
    },
  },

  // Image Analytics
  {
    id: 'upload-images',
    title: 'Upload Images',
    category: 'Image Analytics',
    i18nKey: 'categories.ia.upload',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/80_Image-Analytics/Upload-Images.mp4',
      poster: '/assets/posters/80_Image-Analytics/Upload-Images.png',
      captionKey: 'categories.ia.upload.videoCaption',
    },
    related: [
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
      {
        link: '/article/funnels-image',
        labelKey: 'categories.ia.funnels.title',
      },
    ],
  },
  {
    id: 'funnels-image',
    title: 'Funnels',
    category: 'Image Analytics',
    i18nKey: 'categories.ia.funnels',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/80_Image-Analytics/Funnels.mp4',
      poster: '/assets/posters/80_Image-Analytics/Funnels.png',
      captionKey: 'categories.ia.funnels.videoCaption',
    },
    related: [
      {
        link: '/article/upload-images',
        labelKey: 'categories.ia.upload.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'bulk-editing',
    title: 'Bulk Editing',
    category: 'Image Analytics',
    i18nKey: 'categories.ia.bulk',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/80_Image-Analytics/Bulk-Editing.mp4',
      poster: '/assets/posters/80_Image-Analytics/Bulk-Editing.png',
      captionKey: 'categories.ia.bulk.videoCaption',
    },
    related: [
      {
        link: '/article/upload-images',
        labelKey: 'categories.ia.upload.title',
      },
      {
        link: '/article/image-editing',
        labelKey: 'categories.ia.editing.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },
  {
    id: 'image-editing',
    title: 'Image Editing',
    category: 'Image Analytics',
    i18nKey: 'categories.ia.editing',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/80_Image-Analytics/Image-Editing.mp4',
      poster: '/assets/posters/80_Image-Analytics/Image-Editing.png',
      captionKey: 'categories.ia.editing.videoCaption',
    },
    related: [
      {
        link: '/article/upload-images',
        labelKey: 'categories.ia.upload.title',
      },
      {
        link: '/article/funnels-image',
        labelKey: 'categories.ia.funnels.title',
      },
      { link: '/article/pricing-plan', label: 'Pricing Plan' },
    ],
  },

  // Project Dashboard
  {
    id: 'customize-dashboard',
    title: 'Customize Dashboard',
    category: 'Project Dashboard',
    i18nKey: 'categories.prjDashboard.customize',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/90_Project-Dashboard/Customize-Project-Dashboard.mp4',
      poster:
        '/assets/posters/90_Project-Dashboard/Customize-Project-Dashboard.png',
      captionKey: 'categories.prjDashboard.customize.videoCaption',
    },
    related: [
      {
        link: '/article/configure-use-widgets',
        labelKey: 'categories.prjDashboard.configure.title',
      },
      {
        link: '/article/create-project',
        labelKey: 'categories.mpg.createProject.title',
      },
    ],
  },
  {
    id: 'configure-use-widgets',
    title: 'Configure & Use Widgets',
    category: 'Project Dashboard',
    i18nKey: 'categories.prjDashboard.configure',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/90_Project-Dashboard/Configure-and-Use-Widgets.mp4',
      poster:
        '/assets/posters/90_Project-Dashboard/Configure-and-Use-Widgets.png',
      captionKey: 'categories.prjDashboard.configure.videoCaption',
    },
    related: [
      {
        link: '/article/customize-dashboard',
        labelKey: 'categories.prjDashboard.customize.title',
      },
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
      {
        link: '/article/subscription-ownership',
        labelKey: 'categories.mpg.subscription.title',
      },
      {
        link: '/article/create-project',
        labelKey: 'categories.mpg.createProject.title',
      },
    ],
  },

  // Delivery Plan
  {
    id: 'delivery-package',
    title: 'Delivery Package',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.deliveryPackage',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Delivery-Package.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Delivery-Package.png',
      captionKey: 'categories.deliveryPlan.deliveryPackage.videoCaption',
    },
    related: [
      {
        link: '/article/create-delivery-package',
        labelKey: 'categories.deliveryPlan.createDeliveryPackage.title',
      },
      {
        link: '/article/entry-types',
        labelKey: 'categories.deliveryPlan.entryTypes.title',
      },
      {
        link: '/article/qa-stages',
        labelKey: 'categories.deliveryPlan.qaStages.title',
      },
    ],
  },
  {
    id: 'create-delivery-package',
    title: 'Create Delivery Package',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.createDeliveryPackage',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Create-Delivery-Package.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Create-Delivery-Package.png',
      captionKey: 'categories.deliveryPlan.createDeliveryPackage.videoCaption',
    },
    related: [
      {
        link: '/article/delivery-package',
        labelKey: 'categories.deliveryPlan.deliveryPackage.title',
      },
      {
        link: '/article/create-entry',
        labelKey: 'categories.deliveryPlan.createEntry.title',
      },
      {
        link: '/article/qa-stages',
        labelKey: 'categories.deliveryPlan.qaStages.title',
      },
    ],
  },
  {
    id: 'entry-types',
    title: 'Entry Types',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.entryTypes',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Entry-Types.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Entry-Types.png',
      captionKey: 'categories.deliveryPlan.entryTypes.videoCaption',
    },
    related: [
      {
        link: '/article/delivery-package',
        labelKey: 'categories.deliveryPlan.deliveryPackage.title',
      },
      {
        link: '/article/create-entry-type',
        labelKey: 'categories.deliveryPlan.createEntryType.title',
      },
      {
        link: '/article/create-entry',
        labelKey: 'categories.deliveryPlan.createEntry.title',
      },
    ],
  },
  {
    id: 'create-entry-type',
    title: 'Create Entry Type',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.createEntryType',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Create-Entry-Type.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Create-Entry-Type.png',
      captionKey: 'categories.deliveryPlan.createEntryType.videoCaption',
    },
    related: [
      {
        link: '/article/entry-types',
        labelKey: 'categories.deliveryPlan.entryTypes.title',
      },
      {
        link: '/article/create-entry',
        labelKey: 'categories.deliveryPlan.createEntry.title',
      },
    ],
  },
  {
    id: 'create-entry',
    title: 'Create Entry',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.createEntry',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Create-Entry.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Create-Entry.png',
      captionKey: 'categories.deliveryPlan.createEntry.videoCaption',
    },
    related: [
      {
        link: '/article/delivery-package',
        labelKey: 'categories.deliveryPlan.deliveryPackage.title',
      },
      {
        link: '/article/entry-types',
        labelKey: 'categories.deliveryPlan.entryTypes.title',
      },
    ],
  },
  {
    id: 'qa-stages',
    title: 'Quality Assurance Stages',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.qaStages',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/QA-Stages.mp4',
      poster: '/assets/posters/100_Delivery-Plan/QA-Stages.png',
      captionKey: 'categories.deliveryPlan.qaStages.videoCaption',
    },
    related: [
      {
        link: '/article/create-qa-stage',
        labelKey: 'categories.deliveryPlan.createQAStage.title',
      },
      {
        link: '/article/delivery-package',
        labelKey: 'categories.deliveryPlan.deliveryPackage.title',
      },
      {
        link: '/article/entry-types',
        labelKey: 'categories.deliveryPlan.entryTypes.title',
      },
    ],
  },
  {
    id: 'create-qa-stage',
    title: 'Create QA Stage',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.createQAStage',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Create-QA-Stage.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Create-QA-Stage.png',
      captionKey: 'categories.deliveryPlan.createQAStage.videoCaption',
    },
    related: [
      {
        link: '/article/qa-stages',
        labelKey: 'categories.deliveryPlan.qaStages.title',
      },
      {
        link: '/article/delivery-package',
        labelKey: 'categories.deliveryPlan.deliveryPackage.title',
      },
      {
        link: '/article/entry-types',
        labelKey: 'categories.deliveryPlan.entryTypes.title',
      },
    ],
  },
  {
    id: 'publish-entry',
    title: 'Publish Entry',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.publish',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Publish-Entry.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Publish-Entry.png',
      captionKey: 'categories.deliveryPlan.publish.videoCaption',
    },
    related: [
      {
        link: '/article/delivery-package',
        labelKey: 'categories.deliveryPlan.deliveryPackage.title',
      },
      {
        link: '/article/entry-types',
        labelKey: 'categories.deliveryPlan.entryTypes.title',
      },
    ],
  },
  {
    id: 'funnels-delivery',
    title: 'Funnels',
    category: 'Delivery Plan',
    i18nKey: 'categories.deliveryPlan.funnels',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/100_Delivery-Plan/Funnels.mp4',
      poster: '/assets/posters/100_Delivery-Plan/Funnels.png',
      captionKey: 'categories.deliveryPlan.funnels.videoCaption',
    },
    related: [
      {
        link: '/article/delivery-package',
        labelKey: 'categories.deliveryPlan.deliveryPackage.title',
      },
      {
        link: '/article/entry-types',
        labelKey: 'categories.deliveryPlan.entryTypes.title',
      },
    ],
  },

  // File Distribution
  {
    id: 'overview-file',
    title: 'Overview',
    category: 'File Distribution',
    i18nKey: 'categories.fileDistribution.overview',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/110_File-Distribution/Overview.mp4',
      poster: '/assets/posters/110_File-Distribution/Overview.png',
      captionKey: 'categories.fileDistribution.overview.videoCaption',
    },
    related: [
      {
        link: '/article/download-revisions',
        labelKey: 'categories.fileDistribution.download.title',
      },
      {
        link: '/article/funnels-file',
        labelKey: 'categories.fileDistribution.funnels.title',
      },
      {
        link: '/article/publish-entry',
        labelKey: 'categories.deliveryPlan.publish.title',
      },
    ],
  },
  {
    id: 'funnels-file',
    title: 'Funnels',
    category: 'File Distribution',
    i18nKey: 'categories.fileDistribution.funnels',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/110_File-Distribution/Funnels.mp4',
      poster: '/assets/posters/110_File-Distribution/Funnels.png',
      captionKey: 'categories.fileDistribution.funnels.videoCaption',
    },
    related: [
      {
        link: '/article/overview-file',
        labelKey: 'categories.fileDistribution.overview.title',
      },
      {
        link: '/article/download-revisions',
        labelKey: 'categories.fileDistribution.download.title',
      },
    ],
  },
  {
    id: 'download-revisions',
    title: 'Download Revisions',
    category: 'File Distribution',
    i18nKey: 'categories.fileDistribution.download',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/110_File-Distribution/Download-Revisions.mp4',
      poster: '/assets/posters/110_File-Distribution/Download-Revisions.png',
      captionKey: 'categories.fileDistribution.download.videoCaption',
    },
    related: [
      {
        link: '/article/request-new-revision',
        labelKey: 'categories.fileDistribution.requestNewRevision.title',
      },
      {
        link: '/article/qa-stages',
        labelKey: 'categories.deliveryPlan.qaStages.title',
      },
    ],
  },
  {
    id: 'request-new-revision',
    title: 'Request New Revision',
    category: 'File Distribution',
    i18nKey: 'categories.fileDistribution.requestNewRevision',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/110_File-Distribution/Request-New-Revision.mp4',
      poster: '/assets/posters/110_File-Distribution/Request-New-Revision.png',
      captionKey: 'categories.fileDistribution.requestNewRevision.videoCaption',
    },
    related: [
      {
        link: '/article/overview-file',
        labelKey: 'categories.fileDistribution.overview.title',
      },
      {
        link: '/article/funnels-file',
        labelKey: 'categories.fileDistribution.funnels.title',
      },
    ],
  },

  // Guides & Support
  {
    id: 'beginner-guides',
    title: 'Beginner Guides',
    category: 'Guides & Support',
    i18nKey: 'categories.guidesSupport.beginner',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/120_Guides-Support/Beginner-Guides.mp4',
      poster: '/assets/posters/120_Guides-Support/Beginner-Guides.png',
      captionKey: 'categories.guidesSupport.beginner.videoCaption',
    },
    related: [
      {
        link: '/article/ms-365-login',
        labelKey: 'categories.getStarted.msLogin.title',
      },
      {
        link: '/article/my-profile',
        labelKey: 'categories.getStarted.myProfile.title',
      },
      {
        link: '/article/my-projects',
        labelKey: 'categories.getStarted.myProjects.title',
      },
      {
        link: '/article/team-structure',
        labelKey: 'categories.team.structure.title',
      },
      {
        link: '/article/roles-permissions',
        labelKey: 'categories.team.roles.title',
      },
    ],
  },
  {
    id: 'give-feedback',
    title: 'Give Feedback',
    category: 'Guides & Support',
    i18nKey: 'categories.guidesSupport.feedback',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/120_Guides-Support/Give-Feedback.mp4',
      poster: '/assets/posters/120_Guides-Support/Give-Feedback.png',
      captionKey: 'categories.guidesSupport.feedback.videoCaption',
    },
    related: [
      {
        link: '/article/ms-365-login',
        labelKey: 'categories.getStarted.msLogin.title',
      },
      {
        link: '/article/request-support',
        labelKey: 'categories.guidesSupport.support.title',
      },
    ],
  },
  {
    id: 'request-support',
    title: 'Request Support',
    category: 'Guides & Support',
    i18nKey: 'categories.guidesSupport.support',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/120_Guides-Support/Request-Support.mp4',
      poster: '/assets/posters/120_Guides-Support/Request-Support.png',
      captionKey: 'categories.guidesSupport.support.videoCaption',
    },
    related: [
      {
        link: '/article/ms-365-login',
        labelKey: 'categories.getStarted.msLogin.title',
      },
      {
        link: '/article/give-feedback',
        labelKey: 'categories.guidesSupport.feedback.title',
      },
    ],
  },
  {
    id: 'policies',
    title: 'Policies',
    category: 'Guides & Support',
    i18nKey: 'categories.guidesSupport.policies',
    video: {
      src: 'https://stq360howto.z16.web.core.windows.net/assets/videos/120_Guides-Support/Policies.mp4',
      poster: '/assets/posters/120_Guides-Support/Policies.png',
      captionKey: 'categories.guidesSupport.policies.videoCaption',
    },
    related: [
      {
        link: '/article/ms-365-login',
        labelKey: 'categories.getStarted.msLogin.title',
      },
    ],
  },
];
