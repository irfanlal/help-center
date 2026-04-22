export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
}

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
  'Guides & Support'
];

const generateContent = (title: string, category: string): string => {
  return `
    <p>This guide will help you understand and use the ${title} feature in Quantum 360.</p>

    <h2>Prerequisites</h2>
    <ul>
      <li>Access to your Quantum 360 account</li>
      <li>Appropriate permissions for your role</li>
      <li>Completed the initial setup process</li>
      <li>Reviewed the relevant training materials</li>
    </ul>

    <h2>Step-by-step Instructions</h2>
    <h3>Part 1</h3>
    <ol>
      <li>Navigate to the appropriate section in your Quantum 360 dashboard</li>
      <li>Review the available options and settings</li>
      <li>Configure according to your project needs</li>
      <li>Save your changes and test the functionality</li>
    </ol>

    <h3>Part 2</h3>
    <ol>
      <li>Review the results and ensure everything is working correctly</li>
      <li>Make any necessary adjustments to your configuration</li>
      <li>Document your setup for future reference</li>
      <li>Share relevant information with your team members</li>
    </ol>

    <h2>Tips and Notes</h2>
    <ul>
      <li>Regularly review and update your settings for optimal performance
        <ul>
          <li>Check for updates at least once a month</li>
          <li>Review performance metrics after major changes</li>
        </ul>
      </li>
      <li>Coordinate with your team members to ensure consistency
        <ul>
          <li>Schedule regular sync meetings</li>
          <li>Share important updates in team channels</li>
        </ul>
      </li>
      <li>Follow established workflows and best practices</li>
      <li>Utilize available templates when appropriate</li>
      <li>Contact support if you have questions or need assistance</li>
    </ul>
  `;
};

export const articles: Article[] = [
  // Get Started
  {
    id: 'ms-365-login',
    title: 'MS 365 Login',
    category: 'Get Started',
    content: generateContent('MS 365 Login', 'Get Started')
  },
  {
    id: 'my-projects',
    title: 'My Projects',
    category: 'Get Started',
    content: generateContent('My Projects', 'Get Started')
  },
  {
    id: 'my-work',
    title: 'My Work',
    category: 'Get Started',
    content: generateContent('My Work', 'Get Started')
  },
  {
    id: 'my-profile',
    title: 'My Profile',
    category: 'Get Started',
    content: generateContent('My Profile', 'Get Started')
  },
  {
    id: 'notifications',
    title: 'Notifications',
    category: 'Get Started',
    content: generateContent('Notifications', 'Get Started')
  },

  // Organization Admin
  {
    id: 'general-settings-org',
    title: 'General Settings',
    category: 'Organization Admin',
    content: generateContent('General Settings', 'Organization Admin')
  },
  {
    id: 'project-management',
    title: 'Project Management',
    category: 'Organization Admin',
    content: generateContent('Project Management', 'Organization Admin')
  },
  {
    id: 'user-management',
    title: 'User Management',
    category: 'Organization Admin',
    content: generateContent('User Management', 'Organization Admin')
  },
  {
    id: 'contact-management',
    title: 'Contact Management',
    category: 'Organization Admin',
    content: generateContent('Contact Management', 'Organization Admin')
  },
  {
    id: 'create-mpg',
    title: 'Create MPG',
    category: 'Organization Admin',
    content: generateContent('Create MPG', 'Organization Admin')
  },

  // Guide for MPG Admin
  {
    id: 'access-settings',
    title: 'Access Settings',
    category: 'Guide for MPG Admin',
    content: generateContent('Access Settings', 'Guide for MPG Admin')
  },
  {
    id: 'mpg-ownership',
    title: 'MPG Ownership',
    category: 'Guide for MPG Admin',
    content: generateContent('MPG Ownership', 'Guide for MPG Admin')
  },
  {
    id: 'subscription-ownership',
    title: 'Subscription Ownership',
    category: 'Guide for MPG Admin',
    content: generateContent('Subscription Ownership', 'Guide for MPG Admin')
  },
  {
    id: 'create-project',
    title: 'Create Project',
    category: 'Guide for MPG Admin',
    content: generateContent('Create Project', 'Guide for MPG Admin')
  },

  // Project Settings
  {
    id: 'overview-project',
    title: 'Overview',
    category: 'Project Settings',
    content: generateContent('Overview', 'Project Settings')
  },
  {
    id: 'general-settings-project',
    title: 'General Settings',
    category: 'Project Settings',
    content: generateContent('General Settings', 'Project Settings')
  },
  {
    id: 'pricing-plan',
    title: 'Pricing Plan',
    category: 'Project Settings',
    content: generateContent('Pricing Plan', 'Project Settings')
  },
  {
    id: 'tags-and-objects',
    title: 'Tags and Objects',
    category: 'Project Settings',
    content: generateContent('Tags and Objects', 'Project Settings')
  },
  {
    id: 'importance',
    title: 'Importance',
    category: 'Project Settings',
    content: generateContent('Importance', 'Project Settings')
  },
  {
    id: 'tasks-settings',
    title: 'Tasks Settings',
    category: 'Project Settings',
    content: generateContent('Tasks Settings', 'Project Settings')
  },
  {
    id: 'decision-settings',
    title: 'Decision Settings',
    category: 'Project Settings',
    content: generateContent('Decision Settings', 'Project Settings')
  },

  // Team Management
  {
    id: 'maintenance-templates',
    title: 'Maintenance & Templates',
    category: 'Team Management',
    content: generateContent('Maintenance & Templates', 'Team Management')
  },
  {
    id: 'team-structure',
    title: 'Team Structure',
    category: 'Team Management',
    content: generateContent('Team Structure', 'Team Management')
  },
  {
    id: 'manage-positions',
    title: 'Manage Positions',
    category: 'Team Management',
    content: generateContent('Manage Positions', 'Team Management')
  },
  {
    id: 'assign-users',
    title: 'Assign Users',
    category: 'Team Management',
    content: generateContent('Assign Users', 'Team Management')
  },
  {
    id: 'roles-permissions',
    title: 'Roles & Permissions',
    category: 'Team Management',
    content: generateContent('Roles & Permissions', 'Team Management')
  },

  // Managing Decisions
  {
    id: 'decision-editor',
    title: 'Decision Editor',
    category: 'Managing Decisions',
    content: generateContent('Decision Editor', 'Managing Decisions')
  },
  {
    id: 'decision-maker',
    title: 'Decision Maker',
    category: 'Managing Decisions',
    content: generateContent('Decision Maker', 'Managing Decisions')
  },
  {
    id: 'decision-workflow',
    title: 'Decision Workflow',
    category: 'Managing Decisions',
    content: generateContent('Decision Workflow', 'Managing Decisions')
  },
  {
    id: 'create-decision',
    title: 'Create Decision',
    category: 'Managing Decisions',
    content: generateContent('Create Decision', 'Managing Decisions')
  },
  {
    id: 'dependencies-decisions',
    title: 'Dependencies',
    category: 'Managing Decisions',
    content: generateContent('Dependencies', 'Managing Decisions')
  },
  {
    id: 'funnels-decisions',
    title: 'Funnels',
    category: 'Managing Decisions',
    content: generateContent('Funnels', 'Managing Decisions')
  },
  {
    id: 'decision-details-header',
    title: 'Decision Details Header',
    category: 'Managing Decisions',
    content: generateContent('Decision Details Header', 'Managing Decisions')
  },
  {
    id: 'edit-decision-details',
    title: 'Edit Decision Details',
    category: 'Managing Decisions',
    content: generateContent('Edit Decision Details', 'Managing Decisions')
  },

  // Managing Tasks
  {
    id: 'task-owner',
    title: 'Task Owner',
    category: 'Managing Tasks',
    content: generateContent('Task Owner', 'Managing Tasks')
  },
  {
    id: 'task-assignee',
    title: 'Task Assignee',
    category: 'Managing Tasks',
    content: generateContent('Task Assignee', 'Managing Tasks')
  },
  {
    id: 'task-workflow',
    title: 'Task Workflow',
    category: 'Managing Tasks',
    content: generateContent('Task Workflow', 'Managing Tasks')
  },
  {
    id: 'create-task',
    title: 'Create Task',
    category: 'Managing Tasks',
    content: generateContent('Create Task', 'Managing Tasks')
  },
  {
    id: 'dependencies-tasks',
    title: 'Dependencies',
    category: 'Managing Tasks',
    content: generateContent('Dependencies', 'Managing Tasks')
  },
  {
    id: 'funnels-tasks',
    title: 'Funnels',
    category: 'Managing Tasks',
    content: generateContent('Funnels', 'Managing Tasks')
  },
  {
    id: 'task-details-header',
    title: 'Task Details Header',
    category: 'Managing Tasks',
    content: generateContent('Task Details Header', 'Managing Tasks')
  },
  {
    id: 'edit-task-details',
    title: 'Edit Task Details',
    category: 'Managing Tasks',
    content: generateContent('Edit Task Details', 'Managing Tasks')
  },

  // Visual Planning
  {
    id: 'navigation-visual',
    title: 'Navigation',
    category: 'Visual Planning',
    content: generateContent('Navigation', 'Visual Planning')
  },
  {
    id: 'settings-visual',
    title: 'Settings',
    category: 'Visual Planning',
    content: generateContent('Settings', 'Visual Planning')
  },

  // Image Analytics
  {
    id: 'upload-images',
    title: 'Upload Images',
    category: 'Image Analytics',
    content: generateContent('Upload Images', 'Image Analytics')
  },
  {
    id: 'funnels-image',
    title: 'Funnels',
    category: 'Image Analytics',
    content: generateContent('Funnels', 'Image Analytics')
  },
  {
    id: 'bulk-editing',
    title: 'Bulk Editing',
    category: 'Image Analytics',
    content: generateContent('Bulk Editing', 'Image Analytics')
  },
  {
    id: 'image-editing',
    title: 'Image Editing',
    category: 'Image Analytics',
    content: generateContent('Image Editing', 'Image Analytics')
  },

  // Project Dashboard
  {
    id: 'customize-dashboard',
    title: 'Customize Dashboard',
    category: 'Project Dashboard',
    content: generateContent('Customize Dashboard', 'Project Dashboard')
  },
  {
    id: 'configure-use-widgets',
    title: 'Configure & Use Widgets',
    category: 'Project Dashboard',
    content: generateContent('Configure & Use Widgets', 'Project Dashboard')
  },

  // Delivery Plan
  {
    id: 'delivery-package',
    title: 'Delivery Package',
    category: 'Delivery Plan',
    content: generateContent('Delivery Package', 'Delivery Plan')
  },
  {
    id: 'create-delivery-package',
    title: 'Create Delivery Package',
    category: 'Delivery Plan',
    content: generateContent('Create Delivery Package', 'Delivery Plan')
  },
  {
    id: 'entry-types',
    title: 'Entry Types',
    category: 'Delivery Plan',
    content: generateContent('Entry Types', 'Delivery Plan')
  },
  {
    id: 'create-entry-type',
    title: 'Create Entry Type',
    category: 'Delivery Plan',
    content: generateContent('Create Entry Type', 'Delivery Plan')
  },
  {
    id: 'create-entry',
    title: 'Create Entry',
    category: 'Delivery Plan',
    content: generateContent('Create Entry', 'Delivery Plan')
  },
  {
    id: 'qa-stages',
    title: 'QA Stages',
    category: 'Delivery Plan',
    content: generateContent('QA Stages', 'Delivery Plan')
  },
  {
    id: 'create-qa-stage',
    title: 'Create QA Stage',
    category: 'Delivery Plan',
    content: generateContent('Create QA Stage', 'Delivery Plan')
  },
  {
    id: 'publish-entry',
    title: 'Publish Entry',
    category: 'Delivery Plan',
    content: generateContent('Publish Entry', 'Delivery Plan')
  },
  {
    id: 'funnels-delivery',
    title: 'Funnels',
    category: 'Delivery Plan',
    content: generateContent('Funnels', 'Delivery Plan')
  },

  // File Distribution
  {
    id: 'overview-file',
    title: 'Overview',
    category: 'File Distribution',
    content: generateContent('Overview', 'File Distribution')
  },
  {
    id: 'funnels-file',
    title: 'Funnels',
    category: 'File Distribution',
    content: generateContent('Funnels', 'File Distribution')
  },
  {
    id: 'download-revisions',
    title: 'Download Revisions',
    category: 'File Distribution',
    content: generateContent('Download Revisions', 'File Distribution')
  },
  {
    id: 'request-new-revision',
    title: 'Request New Revision',
    category: 'File Distribution',
    content: generateContent('Request New Revision', 'File Distribution')
  },

  // Guides & Support
  {
    id: 'beginner-guides',
    title: 'Beginner Guides',
    category: 'Guides & Support',
    content: generateContent('Beginner Guides', 'Guides & Support')
  },
  {
    id: 'give-feedback',
    title: 'Give Feedback',
    category: 'Guides & Support',
    content: generateContent('Give Feedback', 'Guides & Support')
  },
  {
    id: 'request-support',
    title: 'Request Support',
    category: 'Guides & Support',
    content: generateContent('Request Support', 'Guides & Support')
  },
  {
    id: 'policies',
    title: 'Policies',
    category: 'Guides & Support',
    content: generateContent('Policies', 'Guides & Support')
  }
];
