<template>
  <span class="text-muted-foreground">
    {{ truncatedContent }}
  </span>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'TruncatedContent',
  props: {
    content: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      default: 20
    }
  },
  setup(props) {
    const truncatedContent = computed(() => {
      if (props.content.length <= props.maxLength) {
        return props.content;
      }
      return props.content.slice(0, props.maxLength) + '...';
    });

    return {
      truncatedContent
    };
  }
};
</script>