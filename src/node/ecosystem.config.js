module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'My_APP',
      script    : 'express.js',
      env: {
        COMMON_VARIABLE: true
      },
      env_production : {
        NODE_ENV: 'production'
      },
      output: 'out.log',
      error: 'error.log',
      log_date_format: "YYYY-MM-DD HH:mm Z",
      merge_logs: true,
      watch: '.'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'hongchuanwang',
      host : 'localhost',
      ref  : 'origin/master',
      repo : 'git@github.com:1016990109/front_end_practice.git',
      path : '/Users/hongchuanwang/github/test',
      'post-deploy' : 'pm2 reload src/node/ecosystem.config.js --env production'
    },
    dev : {
      user : 'hongchuanwang',
      host : 'localhost',
      ref  : 'origin/master',
      repo : 'git@github.com:1016990109/front_end_practice.git',
      path : '/Users/hongchuanwang/github/test',
      'post-deploy' : 'pm2 reload src/node/ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
