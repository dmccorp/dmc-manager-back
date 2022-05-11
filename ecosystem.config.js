module.exports = {
  apps: [
    {
      name: 'dmc-manage-nest',
      script: 'npm run start:dev',
      watch: '.',
    },
  ],
  deploy: {
    development: {
      user: 'basith',
      host: '34.100.183.103',
      ref: 'origin/master',
      repo: 'git@github.com:dmccorp/dmc-manager-back',
      path: '/home/basith/dmc-manage-nest',
      'post-deploy': 'npm install',
    },
    dev: {
      user: 'roshanhanjas',
      host: '34.100.183.103',
      ref: 'origin/master',
      repo: 'git@github.com:dmccorp/dmc-manager-back',
      path: '/home/basith/dmc-manage-nest',
      'post-deploy': 'npm install',
    },
  },
};
