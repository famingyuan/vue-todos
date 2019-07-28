<template>
  <div>
    <Tabs
      :value="tabIndex"
      @change="handleTabChange"
    >
      <Tab
        label="first"
        index="0"
      >
        <div class="content">
          this is content
        </div>
      </Tab>
      <Tab index="1">
        <template v-slot:label>
          <span>second</span>
        </template>
        <div class="content">
          this is content
        </div>
      </Tab>
      <Tab
        index="2"
      >
        <span slot="label">third</span>
        <div class="content">
          this is content
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
export default {
    data () {
        return {
            tabIndex: 1
        };
    },
    methods: {
        handleTabChange (index) {
            console.log('---handleTabChange---');
            this.tabIndex = index;
        }
    }
};
</script>
