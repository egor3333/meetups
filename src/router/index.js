import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function scrollBehavior(to) {
  if (to.hash) {
    return {
      selector: to.hash,
      behavior: "smooth"
    };
  }
}

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/MeetupsPage")
  },
  {
    path: "/meetups",
    name: "meetups",
    component: () => import("@/views/MeetupsPage")
  },
  {
    path: "/meetups/:meetupId(\\d+)",
    redirect: to => ({ name: "meetup-description", params: to.params }),
    name: "meetup",
    props: to => ({
      meetupId: Number(to.meetupId)
    }),
    meta: {
      showReturnToMeetups: true
    },
    component: () => import("@/views/MeetupPage"),
    children: [
      {
        path: "",
        alias: "description",
        name: "meetup-description",
        props: true,
        component: () => import("@/views/MeetupDescriptionPage")
      },
      {
        path: "agenda",
        name: "meetup-agenda",
        props: true,
        component: () => import("@/views/MeetupAgendaPage")
      }
    ]
  },
  {
    path: "/meetups/:meetupId(\\d+)/edit",
    name: "edit-meetup",
    component: () => import("@/views/EditMeetup")
  },
  {
    path: "/meetups/create",
    name: "create-meetup",
    component: () => import("@/views/CreateMeetup")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterPage")
  },
  {
    path: "*",
    component: () => import("@/views/NotFoundPage")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes
});

export default router;
