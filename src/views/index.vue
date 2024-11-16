<template>
  <div class="app-container home">
    <div v-for="menu in menus">
		<h2>{{menu.menuName}}</h2>
		<div v-for="child in menu.children" class="menu-list">
			<a :href="child.path"  @click.prevent="gotoMenu(child.path)">
				{{child.menuName}}
			</a>
			<br/>
		</div>
		
		<el-divider />
	</div>
      
    
    
  </div>
</template>

<script setup name="Index">
import { onMounted, ref } from 'vue';
import { getMenus } from '@/api/menu'

const version = ref('3.8.8')
const { proxy } = getCurrentInstance();
let menus = ref([])
function goTarget(url) {
  window.open(url, '__blank')
}
onMounted(()=> {
	getMenus().then(res =>{
		console.log(res)
		menus.value = res.data;
	})
})
function gotoMenu(url) {
	proxy.$tab.openPage(url)
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
.menu-list {
	margin-bottom: 20px;
}
</style>

