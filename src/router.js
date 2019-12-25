import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import find from './views/find.vue'
import HomeRelease from './views/HomeRelease.vue'
import Login from './views/Login.vue'
import MyHome from './views/MyHome.vue'
import plate from './views/plate.vue'
import associationHome from './views/associationHome.vue'
import associationDetails from './views/associationDetails.vue'
import AssUserHome from './views/AssUserHome.vue'
import addPlate from './views/addPlate.vue'
import Lovewall from './views/Lovewall.vue'
import lovewallRelease from './views/lovewallRelease.vue'
import checkPlate from './views/checkPlate.vue'
import plateHome from './views/plateHome.vue'
import about from './views/about.vue'
import MyCollection from './views/MyCollection.vue'
import MyComment from './views/MyComment.vue'
import MyRelease from './views/MyRelease.vue'
import MySetPwd from './views/MySetPwd.vue'
import MySet from './views/MySet.vue'
import null1 from './views/null1.vue'
import null2 from './views/null2.vue'
import MySet1 from './views/MySet1.vue'
import MySet2 from './views/MySet2.vue'
import MySet3 from './views/MySet3.vue'

Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
		{
		  path: '/null2',
		  name: 'null2',
		  component: null2
		},
    {
      path: '/MySet1',
      name: 'MySet1',
      component: MySet1
    },
    {
      path: '/MySet3',
      name: 'MySet3',
      component: MySet3
    },
    {
      path: '/MySet2',
      name: 'MySet2',
      component: MySet2
    },
    {
      path: '/null1',
      name: 'null1',
      component: null1
    },
    {
      path: '/plateHome',
      name: 'plateHome',
      component: plateHome
    },
    {
      path: '/checkPlate',
      name: 'checkPlate',
      component: checkPlate
    },
    {
      path: '/lovewallRelease',
      name: 'lovewallRelease',
      component: lovewallRelease
    },
    {
      path: '/Lovewall',
      name: 'Lovewall',
      component: Lovewall
    },
    {
      path: '/addPlate',
      name: 'addPlate',
      component: addPlate
    },
    {
      path: '/AssUserHome',
      name: 'AssUserHome',
      component: AssUserHome
    },
    {
      path: '/associationDetails',
      name: 'associationDetails',
      component: associationDetails
    },
    {
      path: '/associationHome',
      name: 'associationHome',
      component: associationHome
    },
    {
      path: '/find',
      name: 'find',
      component: find
    },

    {
      path: '/HomeRelease',
      name: 'HomeRelease',
      component: HomeRelease
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/plate',
      name: 'plate',
      component: plate
    },
    {
      path: '/MyHome',
      name: 'MyHome',
      component: MyHome
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/MyCollection',
      name: 'MyCollection',
      component: MyCollection
    },
    {
      path: '/MyComment',
      name: 'MyComment',
      component: MyComment
    },
    {
      path: '/MyRelease',
      name: 'MyRelease',
      component: MyRelease
    },
    {
      path: '/MySetPwd',
      name: 'MySetPwd',
      component: MySetPwd
    },
    {
      path: '/MySet',
      name: 'MySet',
      component: MySet
    }
  ]
})
