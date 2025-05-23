import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/flights",
      name: "flights",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/FlightResultView.vue"),
    },
    {
      path: "/flight/book",
      name: "flight/book",
      component: () => import("../views/FlightBookingView.vue"),
    },
    {
      path: "/flight/book/:id",
      name: "booking-details",
      component: () => import("../views/BookDetailsView.vue"),
    },
    {
      path: "/tours",
      name: "tour",
      component: () => import("../views/ToursView.vue"),
    },
    {
      path: "/tours/:id/details",
      name: "tour-details",
      component: () => import("../views/TourDetailsView.vue"),
    },

    {
      path: "/visas",
      name: "visa",
      component: () => import("../views/VisasView.vue"),
    },
    {
      path: "/visas/:id/details",
      name: "visa-details",
      component: () => import("../views/VisaDetailsView.vue"),
    },

    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },

    {
      path: "/hotel-info",
      name: "hotel-info",
      component: () => import("../views/HotelInfoView.vue"),
    },
    {
      path: "/flight-booking",
      name: "flight-booking",
      component: () => import("../views/FlightBookingView.vue"),
    },

    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUpView.vue"),
    },

    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

router.afterEach((to, from) => {
  // Scroll to top after navigation
  window.scrollTo(0, 0);
});

export default router;
