const Mock = require('mockjs')
const data = require('./data')

Mock.mock('/api/sellers', { errno: 0, body: data.sellers })
Mock.mock('/api/goods', { errno: 0, body: data.goods })
Mock.mock('/api/ratings', { errno: 0, body: data.ratings })
