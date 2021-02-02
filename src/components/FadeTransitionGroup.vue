<script>
function cloneVNode(vnode) {
  const VNode = vnode.__proto__.constructor
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  return cloned
}

export default {
  name: 'FadeTransitionGroup',

  computed: {
    slots_() {
      return this.$slots.default.map(
        nodeItem => {
          let nodeItem_ = cloneVNode(nodeItem)
          nodeItem_.data.class = {
            ...nodeItem_.data.class,
            'fade-list-item': true
          }

          return nodeItem_
        }
      )
    }
  },

  render(h) {
    return h(
      'transition-group',
      {
        props: {
          name: 'fade-list'
        },
        class: {
          'fade-list': true
        },
        attrs: {
          ...this.$attrs
        }
      },
      this.slots_
    )
  }
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
