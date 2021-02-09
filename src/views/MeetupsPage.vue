<template>
  <meetups-view
    :view.sync="data.view"
    :date.sync="data.date"
    :participation.sync="data.participation"
    :search.sync="data.search"
  />
</template>

<script>
import MeetupsView from "@/components/MeetupsView";

export default {
  name: "MeetupsPage",

  components: {
    MeetupsView
  },

  defaultData: {
    view: "list",
    date: "all",
    participation: "all",
    search: ""
  },

  data() {
    return {
      data: this.initialRouteData()
    };
  },

  watch: {
    $route() {
      this.getRouteValues();
    },
    data: {
      deep: true,
      immediate: true,
      handler(v) {
        this.setRouteValues(v);
      }
    }
  },

  methods: {
    initialRouteData() {
      let query = this.$route.query;
      let defaultData = this.$options.defaultData;

      return {
        view: query.view || defaultData.view,
        date: query.date || defaultData.date,
        participation: query.participation || defaultData.participation,
        search: query.search || defaultData.search
      };
    },
    getRouteValues() {
      let query = this.$route.query;

      this.data.view = query.view || this.data.view;
      this.data.date = query.date || this.data.date;
      this.data.participation = query.participation || this.data.participation;
      this.data.search = query.search || this.data.search;
    },
    clearDefaultParams(q) {
      return Object.keys(q).reduce(
        (acc, i) =>
          q[i] !== this.$options.defaultData[i] ? { ...acc, [i]: q[i] } : acc,
        {}
      );
    },
    setRouteValues(v = {}) {
      let query = this.clearDefaultParams({ ...this.$route.query, ...v });
      this.$router.replace({ query }).catch(err => {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    }
  }
};
</script>
