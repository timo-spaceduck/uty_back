module.exports = {
  apps: [
    {
      name: 'TimoDevNode',
      port: '3991',
      exec_mode: 'cluster',
      instances: '1',
      autorestart: true,
      watch: false,
      script: 'index.js'
    }
  ]
}
