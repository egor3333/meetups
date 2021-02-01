import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else if (to.hash) {
    return {
      selector: to.hash,
    };
  } else if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
    return false;
  }

  return { x: 0, y: 0 };
}

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/MeetupsPage"),
  },
  {
    path: "/meetups",
    name: "meetups",
    component: () => import("@/views/MeetupsPage"),
  },
  {
    path: "/meetups/:meetupId(\\d+)",
    redirect: (to) => ({ name: "meetup-description", params: to.params }),
    name: "meetup",
    props: true,
    meta: {
      showReturnToMeetups: true,
    },
    component: () => import("@/views/MeetupPage"),
    children: [
      {
        path: "",
        alias: "description",
        name: "meetup-description",
        props: true,
        component: () => import("@/views/MeetupDescriptionPage"),
      },
      {
        path: "agenda",
        name: "meetup-agenda",
        props: true,
        component: () => import("@/views/MeetupAgendaPage"),
      },
    ],
  },
  {
    path: "/meetups/:meetupId(\\d+)/edit",
    name: "edit-meetup",
    component: () => import("@/views/EditMeetup"),
  },
  {
    path: "/meetups/create",
    name: "create-meetup",
    component: () => import("@/views/CreateMeetup"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/SignIn"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/SignUp"),
  },
  {
    path: "*",
    component: () => import("@/views/NotFoundPage"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes,
});

export default router;
