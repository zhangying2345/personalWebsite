<template>
  <div class="hello">
    <a
      href="https://github.com/login/oauth/authorize?client_id=Iv1.38662f7ecc0b2882"
    >
      使用 GitHub 账号登录
    </a>
    <div>用户名：{{ userName }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    userName: function() {
      if (document.cookie) {
        return document.cookie.split(';')[0];
      }
      return 'NULL';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
