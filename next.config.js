module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://teste.reobote.tec.br/api/:path*', // Proxy to Backend
        },
      ]
    },
  }